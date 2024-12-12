import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './styles/print.css';

// Initialize Firebase and seed database
import { seedDatabase } from './lib/services/firebase/seed';

// Seed the database with initial data
seedDatabase().then(() => {
  console.log('Database initialization complete');
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);