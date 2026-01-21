
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import OrderEntry from './screens/OrderEntry';
import SimplifiedCollection from './screens/SimplifiedCollection';
import ReceiptTicket from './screens/ReceiptTicket';
import SalesHistory from './screens/SalesHistory';
import RoutePlanning from './screens/RoutePlanning';
import NavigationMap from './screens/NavigationMap';
import ClientCreation from './screens/ClientCreation';
import ProductCreation from './screens/ProductCreation';
import Profile from './screens/Profile';

const App: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleOffline = () => setIsOffline(prev => !prev);

  return (
    <Router>
      <div className="flex flex-col min-h-screen max-w-lg mx-auto bg-background-light dark:bg-background-dark shadow-2xl">
        <Routes>
          <Route path="/" element={<Dashboard isOffline={isOffline} toggleOffline={toggleOffline} />} />
          <Route path="/order-entry" element={<OrderEntry isOffline={isOffline} />} />
          <Route path="/simplified-collection" element={<SimplifiedCollection isOffline={isOffline} />} />
          <Route path="/receipt-ticket" element={<ReceiptTicket isOffline={isOffline} />} />
          <Route path="/sales-history" element={<SalesHistory isOffline={isOffline} />} />
          <Route path="/route-planning" element={<RoutePlanning isOffline={isOffline} />} />
          <Route path="/navigation-map" element={<NavigationMap />} />
          <Route path="/client-creation" element={<ClientCreation isOffline={isOffline} />} />
          <Route path="/product-creation" element={<ProductCreation isOffline={isOffline} />} />
          <Route path="/profile" element={<Profile isOffline={isOffline} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
