import { useState } from 'react';
import calendarData from '../data/calendar.json';

function ContentCalendarPage() {
  const [schedule, setSchedule] = useState({
    platform: 'Instagram',
    date: '2026-08-30',
    caption: 'A simple 3-step workflow to make content creation easier.',
    hashtags: '#contentstrategy #brandgrowth #socialtips',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setSchedule({ ...schedule, [event.target.name]: event.target.value });
  };

  return (
    <div className="page">
      <div className="topbar">
        <h1 className="page-title">Content Calendar</h1>
      </div>

      <div className="grid-2">
        <div className="panel card">
          <h3>Scheduled Posts</h3>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Platform</th>
                  <th>Caption Preview</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {calendarData.map((post) => (
                  <tr key={`${post.date}-${post.platform}`}>
                    <td>{post.date}</td>
                    <td>{post.platform}</td>
                    <td>{post.caption}</td>
                    <td>{post.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel card">
          <h3>Schedule Post</h3>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="platform">Platform</label>
              <select id="platform" name="platform" value={schedule.platform} onChange={handleChange}>
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Pinterest">Pinterest</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="date">Date</label>
              <input id="date" name="date" type="date" value={schedule.date} onChange={handleChange} />
            </div>

            <div className="field">
              <label htmlFor="caption">Caption</label>
              <textarea id="caption" name="caption" value={schedule.caption} onChange={handleChange} />
            </div>

            <div className="field">
              <label htmlFor="hashtags">Hashtags</label>
              <input id="hashtags" name="hashtags" type="text" value={schedule.hashtags} onChange={handleChange} />
            </div>

            <button className="primary-button" type="button">Schedule Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentCalendarPage;
