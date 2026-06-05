import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// In a real app, this would check against a database
// For demo purposes, we'll use a hardcoded admin
const DEMO_ADMIN = {
  email: 'admin@example.com',
  password: 'password123', // In production, this should be hashed!
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate credentials
    if (email !== DEMO_ADMIN.email || password !== DEMO_ADMIN.password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Generate a simple token (in production, use JWT or session management)
    const token = crypto.randomBytes(32).toString('hex');

    // In a real app, you'd store this token in a database with an expiration time
    // For now, we'll just return it

    return NextResponse.json({
      token,
      email,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
