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
import {AuthProvider} from "./components/Routes/AuthContext";

import './App.css';
import './styles/ButtonThemes.css';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>

          <Route path="*" element={<Navigate to="/landing" />} />

          <Route path="/landing" element={
            <PublicRoute><LandingPage /></PublicRoute>
          } />

          <Route path="/login" element={
            <PublicRoute><LoginPage /></PublicRoute>
          } />

          <Route path="/register" element={
            <PublicRoute><RegisterPage /></PublicRoute>
          } />

          <Route path="/account-setup" element={
            <ProtectedRoute requireProfile={false}><AccountSetupPage /></ProtectedRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute requireProfile={true}><Dashboard /></ProtectedRoute>
          } />

          <Route path="/start-campaign" element={
            <ProtectedRoute requireProfile={true}><StartCampaign /></ProtectedRoute>
          } />

          <Route path="/campaign/:campaignId" element={
            <ProtectedRoute requireProfile={true}><ViewCampaign /></ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
  
}

export default App;
