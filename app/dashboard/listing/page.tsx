'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { australianLocations, attributes } from '@/app/types';

interface FormData {
  displayName: string;
  state: string;
  city: string;
  ageRange: string;
  height: string;
  build: string;
  ethnicity: string;
  hairColor: string;
  eyeColor: string;
  bio: string;
  ratesNote: string;
  phoneNumber: string;
  incallOutcall: 'incall' | 'outcall' | 'both';
  services: string[];
}

const serviceOptions = [
  'Dinner dates',
  'Travel companion',
  'Event dates',
  'Adventure companion',
  'Conversation',
  'Socialising',
  'Other',
];

export default function ListingEditPage() {
  const [formData, setFormData] = useState<FormData>({
    displayName: 'Alex',
    state: 'New South Wales',
    city: 'Sydney',
    ageRange: '26-30',
    height: '6\'0" - 6\'2"',
    build: 'Athletic',
    ethnicity: 'Caucasian',
    hairColor: 'Brown',
    eyeColor: 'Blue',
    bio: 'Professional companion with a passion for great conversation and memorable experiences.',
    ratesNote: 'Standard rates apply. Inquire for custom arrangements.',
    phoneNumber: '+61 2 XXXX XXXX',
    incallOutcall: 'both',
    services: ['Dinner dates', 'Travel companion'],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const cities = australianLocations.find((loc) => loc.state === formData.state)?.cities || [];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleServiceChange = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.displayName.trim()) newErrors.displayName = 'Display name is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
    if (formData.services.length === 0) newErrors.services = 'Select at least one service';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveListing = (asDraft: boolean = false) => {
    if (!asDraft && !validateForm()) return;

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveListing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Edit Your Listing</h1>
        <p className="text-text-secondary">Update your profile information and preferences</p>
      </div>

      {saved && (
        <div className="glass-card-gold p-4 rounded-lg border border-accent-gold text-accent-gold text-sm flex items-center gap-2">
          <span>✓</span> Changes saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info Section */}
        <section className="glass-card p-8 rounded-lg border border-border-default">
          <h2 className="text-xl font-semibold text-text-primary mb-6 pb-4 border-b border-border-default">
            Basic Information
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Display Name
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border-default text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-gold transition-colors"
              />
              {errors.displayName && (
                <p className="text-red-400 text-sm mt-1">{errors.displayName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border-default text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
                >
                  {australianLocations.map((loc) => (
                    <option key={loc.state} value={loc.state}>
                      {loc.state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  City
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border-default text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Physical Attributes Section */}
        <section className="glass-card p-8 rounded-lg border border-border-default">
          <h2 className="text-xl font-semibold text-text-primary mb-6 pb-4 border-b border-border-default">
            Physical Attributes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Age Range', name: 'ageRange', options: attributes.ageRange },
              { label: 'Height', name: 'height', options: attributes.height },
              { label: 'Build', name: 'build', options: attributes.build },
              { label: 'Ethnicity', name: 'ethnicity', options: attributes.ethnicity },
              { label: 'Hair Color', name: 'hairColor', options: attributes.hairColor },
              { label: 'Eye Color', name: 'eyeColor', options: attributes.eyeColor },
            ].map(({ label, name, options }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {label}
                </label>
                <select
                  name={name}
                  value={formData[name as keyof FormData]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border-default text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
                >
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </section>

        {/* Bio & Rates Section */}
        <section className="glass-card p-8 rounded-lg border border-border-default">
          <h2 className="text-xl font-semibold text-text-primary mb-6 pb-4 border-b border-border-default">
            Bio & Rates
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Bio / About You
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                maxLength={500}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border-default text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-gold transition-colors resize-none"
                placeholder="Tell potential clients about yourself..."
              />
              <p className="text-text-secondary text-sm mt-1">
                {formData.bio.length}/500 characters
              </p>
              {errors.bio && <p className="text-red-400 text-sm mt-1">{errors.bio}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Rates Note
              </label>
              <textarea
                name="ratesNote"
                value={formData.ratesNote}
                onChange={handleInputChange}
                rows={3}
                maxLength={300}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border-default text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-gold transition-colors resize-none"
                placeholder="Include your rates and any special arrangements..."
              />
              <p className="text-text-secondary text-sm mt-1">
                {formData.ratesNote.length}/300 characters
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="glass-card p-8 rounded-lg border border-border-default">
          <h2 className="text-xl font-semibold text-text-primary mb-6 pb-4 border-b border-border-default">
            Contact Information
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border-default text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-gold transition-colors"
              />
              {errors.phoneNumber && (
                <p className="text-red-400 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Availability
              </label>
              <div className="space-y-3">
                {(['incall', 'outcall', 'both'] as const).map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="incallOutcall"
                      value={option}
                      checked={formData.incallOutcall === option}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-text-primary capitalize">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="glass-card p-8 rounded-lg border border-border-default">
          <h2 className="text-xl font-semibold text-text-primary mb-6 pb-4 border-b border-border-default">
            Services Offered
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceOptions.map((service) => (
              <label key={service} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.services.includes(service)}
                  onChange={() => handleServiceChange(service)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-text-primary">{service}</span>
              </label>
            ))}
          </div>
          {errors.services && <p className="text-red-400 text-sm mt-4">{errors.services}</p>}
        </section>

        {/* Form Actions */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => saveListing(true)}
            className="flex-1 px-6 py-3 rounded-lg border border-border-default text-text-primary hover:border-accent-gold hover:text-accent-gold transition-colors duration-200 font-medium"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 rounded-lg bg-accent-gold text-background hover:bg-accent-gold-light transition-colors duration-200 font-medium"
          >
            Submit for Approval
          </button>
        </div>
      </form>
    </div>
  );
}
