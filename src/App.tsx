import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Productions from './pages/Productions';
import CheckOut from './pages/CheckOut';
import CheckIn from './pages/CheckIn';
import Reports from './pages/Reports';
import Assets from './pages/Assets';
import Users from './pages/Users';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/productions" element={<Productions />} />
          <Route path="/check-out" element={<CheckOut />} />
          <Route path="/check-in" element={<CheckIn />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" />
    </Router>
  );
};

export default App;