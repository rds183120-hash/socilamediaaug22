import { useMemo, useState } from 'react';
import clientData from '../data/clients.json';

function ClientsPage() {
  const [query, setQuery] = useState('');

  const filteredClients = useMemo(() => {
    return clientData.filter((client) => {
      const haystack = `${client.name} ${client.platform} ${client.email}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
  }, [query]);

  return (
    <div className="page">
      <div className="topbar">
        <h1 className="page-title">Clients / Brands</h1>
      </div>

      <div className="panel card">
        <input
          className="search-box"
          type="search"
          placeholder="Search clients or platforms..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Platform Focus</th>
                <th>Follower Count</th>
                <th>Contact Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.email}>
                  <td>{client.name}</td>
                  <td>{client.platform}</td>
                  <td>{client.followers}</td>
                  <td>{client.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ClientsPage;
