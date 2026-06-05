import ProfileClient from './ProfileClient';
import { mockListings } from '@/app/data/mockListings';

export function generateStaticParams() {
  return mockListings.map((listing) => ({
    slug: listing.slug,
  }));
}

export default function ProfilePage({ params }: { params: { slug: string } }) {
  return <ProfileClient slug={params.slug} />;
}
