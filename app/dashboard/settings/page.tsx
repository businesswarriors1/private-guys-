'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface SettingsData {
  email: string;
  displayName: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  twoFactorEnabled: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsData>({
    email: 'alex@example.com',
    displayName: 'Alex',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    smsNotifications: true,
    marketingEmails: false,
    twoFactorEnabled: false,
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSaveProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleChangePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!settings.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!settings.newPassword) newErrors.newPassword = 'New password is required';
    if (!settings.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (settings.newPassword !== settings.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setMessage('Password changed successfully!');
      setSettings((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Settings</h1>
        <p className="text-text-secondary">Manage your account and preferences</p>
      </div>

      {message && (
        <div className="glass-card-gold p-4 rounded-lg border border-accent-gold text-accent-gold text-sm flex items-center gap-2">
          <span>✓</span> {message}
        </div>
      )}

      {/* Profile Settings */}
      <form onSubmit={handleSaveProfile} className="glass-card p-8 rounded-lg border border-border-default">
        <h2 className="text-xl font-semibold text-text-primary mb-6 pb-4 border-b border-border-default">
          Profile Settings
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border-default text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Display Name
            </label>
            <input
              type="text"
              name="displayName"
              value={settings.displayName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border-default text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-accent-gold text-background hover:bg-accent-gold-light transition-colors font-medium"
          >
            Save Profile
          </button>
        </div>
      </form>

      {/* Change Password */}
      <form onSubmit={handleChangePassword} className="glass-card p-8 rounded-lg border border-border-default">
        <h2 className="text-xl font-semibold text-text-primary mb-6 pb-4 border-b border-border-default">
          Change Password
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={settings.currentPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border-default text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
            />
            {errors.currentPassword && (
              <p className="text-red-400 text-sm mt-1">{errors.currentPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={settings.newPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border-default text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
            />
            {errors.newPassword && (
              <p className="text-red-400 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={settings.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border-default text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-accent-gold text-background hover:bg-accent-gold-light transition-colors font-medium"
          >
            Change Password
          </button>
        </div>
      </form>

      {/* Notification Settings */}
      <div className="glass-card p-8 rounded-lg border border-border-default">
        <h2 className="text-xl font-semibold text-text-primary mb-6 pb-4 border-b border-border-default">
          Notification Preferences
        </h2>

        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer p-4 rounded-lg hover:bg-background-elevated transition-colors">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleInputChange}
              className="w-4 h-4"
            />
            <div className="flex-1">
              <p className="font-medium text-text-primary">Email Notifications</p>
              <p className="text-text-secondary text-sm">
                Receive updates about messages and bookings
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-4 rounded-lg hover:bg-background-elevated transition-colors">
            <input
              type="checkbox"
              name="smsNotifications"
              checked={settings.smsNotifications}
              onChange={handleInputChange}
              className="w-4 h-4"
            />
            <div className="flex-1">
              <p className="font-medium text-text-primary">SMS Notifications</p>
              <p className="text-text-secondary text-sm">
                Receive urgent updates via text message
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-4 rounded-lg hover:bg-background-elevated transition-colors">
            <input
              type="checkbox"
              name="marketingEmails"
              checked={settings.marketingEmails}
              onChange={handleInputChange}
              className="w-4 h-4"
            />
            <div className="flex-1">
              <p className="font-medium text-text-primary">Marketing Emails</p>
              <p className="text-text-secondary text-sm">
                Receive tips and promotional offers
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Security Settings */}
      <div className="glass-card p-8 rounded-lg border border-border-default">
        <h2 className="text-xl font-semibold text-text-primary mb-6 pb-4 border-b border-border-default">
          Security
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-background">
            <div>
              <p className="font-medium text-text-primary">Two-Factor Authentication</p>
              <p className="text-text-secondary text-sm">
                Add an extra layer of security to your account
              </p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="twoFactorEnabled"
                checked={settings.twoFactorEnabled}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
            </label>
          </div>

          <button className="w-full px-6 py-3 rounded-lg border border-red-600/30 text-red-400 hover:bg-red-600/10 transition-colors font-medium">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
