'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockListings } from '@/app/data/mockListings';

export default function ProfileClient({ slug }: { slug: string }) {
  const listing = mockListings.find((l) => l.slug === slug) || mockListings[0];
  const mockRelatedListings = mockListings.slice(3, 6);
  
  const [reportMessage, setReportMessage] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleReport = () => {
    setReportMessage('Thank you for reporting. We will review this listing shortly.');
    setTimeout(() => setReportMessage(''), 4000);
  };

  const handleContact = () => {
    setContactMessage('Contact request sent! Check your email for next steps.');
    setTimeout(() => setContactMessage(''), 3000);
  };

  const imageUrl =
    listing.primaryImage ||
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop';

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Hero Gallery Section */}
      <div className="relative w-full h-96 md:h-screen max-h-96 md:max-h-none overflow-hidden">
        <img
          src={imageUrl}
          alt={listing.displayName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
        {listing.isVerified && (
          <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold">
            ✓ Verified
          </div>
        )}
        {listing.isNew && (
          <div className="absolute top-4 left-4 bg-accent-gold text-background px-4 py-2 rounded-lg flex items-center gap-2 font-semibold">
            🆕 New
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 -mt-32 md:-mt-48 px-4 md:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header Card */}
          <div className="glass-card-gold p-8 rounded-lg border border-border-gold mb-8">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-2">
                {listing.displayName}
              </h1>
              <p className="text-lg text-text-secondary">
                📍 {listing.city}, {listing.state}
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-border-gold">
              {[
                { label: 'Age Range', value: listing.ageRange || 'Not specified' },
                { label: 'Height', value: listing.height || 'Not specified' },
                { label: 'Build', value: listing.build || 'Not specified' },
                { label: 'Ethnicity', value: listing.ethnicity || 'Not specified' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-text-secondary text-sm mb-1">{stat.label}</p>
                  <p className="font-semibold text-text-primary">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* More Attributes */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Hair', value: listing.hairColor },
                { label: 'Eyes', value: listing.eyeColor },
                {
                  label: 'Available',
                  value: listing.incallOutcall ? listing.incallOutcall.charAt(0).toUpperCase() + listing.incallOutcall.slice(1) : 'Not specified',
                },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-text-secondary text-sm">{stat.label}</p>
                  <p className="font-medium text-text-primary">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="glass-card p-8 rounded-lg border border-border-default mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">About</h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              {listing.bio}
            </p>
            {listing.ratesText && (
              <>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Rates</h3>
                <p className="text-text-secondary">{listing.ratesText}</p>
              </>
            )}
          </div>

          {/* Services Section */}
          {listing.services && listing.services.length > 0 && (
            <div className="glass-card p-8 rounded-lg border border-border-default mb-8">
              <h2 className="text-2xl font-semibold text-text-primary mb-4">Services</h2>
              <div className="flex flex-wrap gap-2">
                {listing.services.map((service) => (
                  <span
                    key={service}
                    className="inline-block px-4 py-2 rounded-full bg-background-elevated border border-border-gold text-text-primary text-sm font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact Section */}
          <div className="glass-card-gold p-8 rounded-lg border border-border-gold mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">Get In Touch</h2>
            {contactMessage && (
              <div className="bg-green-600/20 border border-green-600/50 text-green-400 p-4 rounded-lg mb-6 text-sm">
                {contactMessage}
              </div>
            )}
            <div className="mb-6 p-4 bg-background rounded-lg border border-border-default">
              <p className="text-text-secondary text-sm mb-2">Phone Number</p>
              {listing.tier === 'free' || listing.tier === 'standard' ? (
                <p className="text-text-primary font-medium">
                  📞 Upgrade to Premium to see phone number
                </p>
              ) : (
                <p className="text-text-primary font-mono text-lg font-bold">
                  {listing.phoneNumber}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleContact}
                className="w-full px-6 py-3 bg-accent-gold text-background rounded-lg hover:bg-accent-gold-light transition-colors font-semibold"
              >
                Send Message
              </button>
              <button
                onClick={handleContact}
                className="w-full px-6 py-3 border-2 border-accent-gold text-accent-gold rounded-lg hover:bg-accent-gold/10 transition-colors font-semibold"
              >
                Request Booking
              </button>
            </div>
          </div>

          {/* Tour Dates Section */}
          <div className="glass-card p-8 rounded-lg border border-border-default mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">📍 Tour Dates</h2>
            <div className="space-y-3">
              <p className="text-text-secondary">Melbourne: July 15-22</p>
              <p className="text-text-secondary">Brisbane: August 1-10</p>
              <p className="text-text-secondary">Contact for more details</p>
            </div>
          </div>

          {/* Report Section */}
          <div className="mb-8">
            {reportMessage && (
              <div className="bg-green-600/20 border border-green-600/50 text-green-400 p-4 rounded-lg mb-4 text-sm">
                {reportMessage}
              </div>
            )}
            <button
              onClick={handleReport}
              className="w-full px-6 py-3 rounded-lg border border-red-600/30 text-red-400 hover:bg-red-600/10 transition-colors font-medium"
            >
              Report This Listing
            </button>
          </div>

          {/* Related Listings Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">Similar Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockRelatedListings.map((relatedListing) => (
                <Link
                  key={relatedListing.id}
                  href={`/profile/${relatedListing.slug}`}
                  className="glass-card rounded-lg overflow-hidden border border-border-default hover:border-accent-gold transition-all hover-lift group"
                >
                  <div className="relative h-40 overflow-hidden bg-background-elevated">
                    <img
                      src={relatedListing.primaryImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'}
                      alt={relatedListing.displayName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {relatedListing.isVerified && (
                      <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        ✓ Verified
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-text-primary mb-1 group-hover:text-accent-gold transition-colors">
                      {relatedListing.displayName}
                    </h3>
                    <p className="text-text-secondary text-sm mb-3">
                      📍 {relatedListing.city}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {relatedListing.services.slice(0, 2).map((service) => (
                        <span
                          key={service}
                          className="text-xs px-2 py-1 rounded bg-background-elevated text-text-secondary"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
