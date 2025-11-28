import { BrowserRouter as Router, Routes, Route, Navigate, data } from "react-router-dom";
import { useState, useEffect, use } from "react";
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AccountSetupPage from './pages/AccountSetupPage/AccountSetupPage'
import LandingPage from './pages/LandingPage/LandingPage';
import Dashboard from './pages/Dashboard/Dashboard';
import StartCampaign from './pages/StartCampaign/StartCampaign';
import ViewCampaign from './pages/ViewCampaign/ViewCampaign';
import ProtectedRoute from './components/Routes/ProtectedRoute'
import PublicRoute from './components/Routes/PublicRoute'

import './App.css';
import './styles/ButtonThemes.css';

function App() {

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/me", {
          method: "GET",
          credentials: "include"
        })

        const data = await response.json();

        console.log("%cAPI /api/users/me fetched done", "color: green; font-size: 1rem; font-weight: bold;");
        console.log("API response:", data);

        if (data.authenticated) {
          setUser(data.user);
          setProfile(data.user.profile || null);
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (err) {
        console.log("Error: ", err);
        
        setUser(null)
        setProfile(null)
      } finally {
        setLoading(false)
      }
    }

    fetchMe()
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="*" element={
          <PublicRoute user={user}>
            <Navigate to="/landing" />
          </PublicRoute>  
        } />
        <Route path="/landing" element={
          <PublicRoute user={user}>
            <LandingPage />
          </PublicRoute>  
        } />
        <Route path="/login" element={
          <PublicRoute user={user}>
            <LoginPage />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute user={user}>  
            <RegisterPage />
          </PublicRoute>
        } />

        <Route path="/account-setup" element={
          <ProtectedRoute user={user} profile={profile} loading={loading}>
            <AccountSetupPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute user={user} profile={profile} loading={loading}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/start-campaign" element={
          <ProtectedRoute user={user} profile={profile} loading={loading}>
            <StartCampaign />
          </ProtectedRoute>
        } />
        <Route path="/campaign/:campaignId" element={
          <ProtectedRoute user={user} profile={profile} loading={loading}>
            <ViewCampaign />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
  
}

export default App;
