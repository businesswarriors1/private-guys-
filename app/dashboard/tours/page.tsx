'use client';

import { useState, FormEvent } from 'react';
import { australianLocations } from '@/app/types';

interface Tour {
  id: string;
  city: string;
  startDate: string;
  endDate: string;
}

export default function TourCalendarPage() {
  const [tours, setTours] = useState<Tour[]>([
    {
      id: '1',
      city: 'Melbourne',
      startDate: '2024-07-15',
      endDate: '2024-07-22',
    },
    {
      id: '2',
      city: 'Brisbane',
      startDate: '2024-08-01',
      endDate: '2024-08-10',
    },
  ]);

  const [formData, setFormData] = useState({
    city: 'Sydney',
    startDate: '',
    endDate: '',
  });

  const [message, setMessage] = useState('');
  const cities = australianLocations.flatMap((loc) => loc.cities).sort();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTour = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.city || !formData.startDate || !formData.endDate) {
      setMessage('Please fill in all fields');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setMessage('End date must be after start date');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const newTour: Tour = {
      id: Date.now().toString(),
      city: formData.city,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };

    setTours((prev) => [...prev, newTour]);
    setFormData({ city: 'Sydney', startDate: '', endDate: '' });
    setMessage('Tour added successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const deleteTour = (id: string) => {
    setTours((prev) => prev.filter((tour) => tour.id !== id));
    setMessage('Tour deleted');
    setTimeout(() => setMessage(''), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysRemaining = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Tour Calendar</h1>
        <p className="text-text-secondary">Schedule your touring dates across Australia</p>
      </div>

      {message && (
        <div className="glass-card-gold p-4 rounded-lg border border-accent-gold text-accent-gold text-sm flex items-center gap-2">
          <span>✓</span> {message}
        </div>
      )}

      {/* Add Tour Form */}
      <div className="glass-card p-8 rounded-lg border border-border-default">
        <h2 className="text-xl font-semibold text-text-primary mb-6 pb-4 border-b border-border-default">
          Add New Tour
        </h2>

        <form onSubmit={handleAddTour} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border-default text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border-default text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg bg-accent-gold text-background hover:bg-accent-gold-light transition-colors duration-200 font-medium"
          >
            Add Tour
          </button>
        </form>
      </div>

      {/* Tours List */}
      {tours.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">Upcoming Tours</h2>
          <div className="space-y-3">
            {tours.map((tour) => {
              const daysLeft = getDaysRemaining(tour.endDate);
              const isActive = daysLeft > 0;

              return (
                <div
                  key={tour.id}
                  className="glass-card p-6 rounded-lg border border-border-default hover-lift transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-text-primary">
                          📍 {tour.city}
                        </h3>
                        {isActive ? (
                          <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                        ) : (
                          <span className="inline-block w-2 h-2 rounded-full bg-gray-500"></span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <p className="text-text-secondary text-sm">
                          📅 {formatDate(tour.startDate)} → {formatDate(tour.endDate)}
                        </p>
                        <p className="text-text-secondary text-sm">
                          {isActive ? (
                            <>
                              🕐 <span className="text-accent-gold font-medium">{daysLeft} days remaining</span>
                            </>
                          ) : (
                            <>🕐 <span className="text-gray-400">Tour ended</span></>
                          )}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteTour(tour.id)}
                      className="px-4 py-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/40 transition-colors border border-red-600/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tours.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary text-lg">No tours scheduled yet</p>
          <p className="text-text-secondary text-sm mt-2">Add a tour to let clients know when you're visiting their city</p>
        </div>
      )}
    </div>
  );
}
