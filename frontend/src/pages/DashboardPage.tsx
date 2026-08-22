import dashboardData from '../data/dashboard.json';

function DashboardPage() {
  return (
    <div className="page">
      <div className="topbar">
        <h1 className="page-title">Dashboard</h1>
      </div>

      <div className="greeting-card card">
        <h2>Welcome back, strategist.</h2>
        <p>Your content engine is moving well this week. Keep momentum with a short creator-first content sprint.</p>
      </div>

      <div className="stats-grid">
        {dashboardData.stats.map((stat) => (
          <div key={stat.label} className="stat-tile card">
            <h4>{stat.label}</h4>
            <strong>{stat.value}</strong>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="panel card">
          <h3>Recent Activity</h3>
          <div className="list">
            {dashboardData.activity.map((item) => (
              <div key={item.title} className="activity-item">
                <div>
                  <strong>{item.title}</strong>
                  <div className="meta-row">
                    <span>{item.metric}</span>
                    <span className="badge">{item.tag}</span>
                  </div>
                  <div>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel card">
          <h3>Quick Notes</h3>
          <ul>
            <li>Reels with personal storytelling are converting best.</li>
            <li>LinkedIn posts with a strong first sentence are getting more comments.</li>
            <li>Brand keywords are driving better saves on Pinterest.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
