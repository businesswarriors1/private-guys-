'use client';

export default function AnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Analytics</h1>
        <p className="text-text-secondary">Track your listing performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Views', value: '1,234', icon: '👁️', trend: '+12%' },
          { label: 'Profile Clicks', value: '456', icon: '🔗', trend: '+8%' },
          { label: 'Messages', value: '89', icon: '💬', trend: '+15%' },
          { label: 'Contact Requests', value: '23', icon: '📞', trend: '+5%' },
        ].map((card) => (
          <div
            key={card.label}
            className="glass-card p-6 rounded-lg border border-border-default hover-lift"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-3xl">{card.icon}</span>
              <span className="text-sm text-green-400 font-medium">{card.trend}</span>
            </div>
            <p className="text-text-secondary text-sm mb-1">{card.label}</p>
            <p className="text-2xl font-bold text-text-primary">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 rounded-lg border border-border-default">
        <h2 className="text-xl font-semibold text-text-primary mb-6">
          Performance Chart (Coming Soon)
        </h2>
        <div className="h-64 flex items-center justify-center bg-background rounded-lg border border-border-default">
          <p className="text-text-secondary">Chart visualization coming in v2.0</p>
        </div>
      </div>

      <div className="glass-card p-8 rounded-lg border border-border-default">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Top Performing Days</h2>
        <div className="space-y-3">
          {['Monday - 156 views', 'Wednesday - 143 views', 'Friday - 128 views'].map((item) => (
            <div key={item} className="flex items-center justify-between p-4 bg-background rounded-lg">
              <span className="text-text-primary">{item}</span>
              <div className="h-2 w-32 bg-background-elevated rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-gold"
                  style={{
                    width: `${Math.random() * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
