import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { supabaseAdmin } from '@/lib/supabase'

// POST upload verification documents
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const idDocument = formData.get('id_document') as File | null
    const selfie = formData.get('selfie') as File | null

    if (!idDocument && !selfie) {
      return NextResponse.json(
        { error: 'At least one document is required' },
        { status: 400 }
      )
    }

    const fileUploadPromises = []

    // Upload ID document
    if (idDocument) {
      const fileName = `verifications/${session.user.id}/id-${Date.now()}`
      fileUploadPromises.push(
        supabaseAdmin.storage
          .from('verifications')
          .upload(fileName, idDocument)
          .then(({ data, error }) => {
            if (error) throw error
            return { 
              type: 'id_document', 
              path: data?.path,
              url: supabaseAdmin.storage
                .from('verifications')
                .getPublicUrl(data?.path || '').data.publicUrl
            }
          })
      )
    }

    // Upload selfie
    if (selfie) {
      const fileName = `verifications/${session.user.id}/selfie-${Date.now()}`
      fileUploadPromises.push(
        supabaseAdmin.storage
          .from('verifications')
          .upload(fileName, selfie)
          .then(({ data, error }) => {
            if (error) throw error
            return {
              type: 'selfie',
              path: data?.path,
              url: supabaseAdmin.storage
                .from('verifications')
                .getPublicUrl(data?.path || '').data.publicUrl
            }
          })
      )
    }

    const uploadResults = await Promise.all(fileUploadPromises)

    // Prepare verification data
    const verificationData: any = {
      user_id: session.user.id,
      status: 'pending',
    }

    uploadResults.forEach((result) => {
      if (result.type === 'id_document') {
        verificationData.id_document_url = result.url
      } else if (result.type === 'selfie') {
        verificationData.selfie_url = result.url
      }
    })

    // Check if verification record exists
    const { data: existingVerification } = await supabaseAdmin
      .from('verifications')
      .select('id')
      .eq('user_id', session.user.id)
      .single()

    let verification

    if (existingVerification) {
      // Update existing
      const { data, error } = await supabaseAdmin
        .from('verifications')
        .update(verificationData)
        .eq('user_id', session.user.id)
        .select()
        .single()

      if (error) {
        throw error
      }
      verification = data
    } else {
      // Create new
      const { data, error } = await supabaseAdmin
        .from('verifications')
        .insert(verificationData)
        .select()
        .single()

      if (error) {
        throw error
      }
      verification = data
    }

    return NextResponse.json(
      {
        success: true,
        data: verification,
        message: 'Verification documents uploaded successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Verification upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload verification documents' },
      { status: 500 }
    )
  }
}
