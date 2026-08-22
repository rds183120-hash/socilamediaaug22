import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import ContentCalendarPage from './pages/ContentCalendarPage';
import ClientsPage from './pages/ClientsPage';
import PlaybookPage from './pages/PlaybookPage';
import ChatPopup from './components/ChatPopup';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="calendar" element={<ContentCalendarPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="playbook" element={<PlaybookPage />} />
        </Route>
      </Routes>
      <ChatPopup />
    </>
  );
}

export default App;
