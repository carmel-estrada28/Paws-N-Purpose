import { BrowserRouter as Router, Routes, Route, Navigate, data } from "react-router-dom";
import { useState, useEffect, use } from "react";
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AccountSetupPage from './pages/AccountSetupPage/AccountSetupPage'
import LandingPage from './pages/LandingPage/LandingPage';
import Dashboard from './pages/Dashboard/Dashboard';
import ViewCampaign from './pages/ViewCampaign/ViewCampaign';
import CampaignList from "./pages/CampaignListPage/CampaignList";
import MyProjects from "./pages/MyProjects/MyProjects";
import CreateDonationBox from "./pages/CreateDonationBox/CreateDonationBox";
import CreateCampaign from "./pages/CreateCampaign/CreateCampaign";
import ProtectedRoute from './components/Routes/ProtectedRoute'
import PublicRoute from './components/Routes/PublicRoute'
import {AuthProvider} from "./components/Routes/AuthContext";
import './App.css';
import './styles/ButtonThemes.css';
import BasePageTemplate from "./pages/BasePageTemplate/BasePageTemplate";
import ProfilePage from "./pages/ProfilePage/ProfilePage";


function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>

          <Route path="*" element={<Navigate to="/landing" />} />

          <Route path="/base" element={
            <PublicRoute><BasePageTemplate /></PublicRoute>
          } />

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

          // App.js - Update these routes:

          {/* Public ViewCampaign route for non-logged-in users */}
          <Route path="/campaign/:campaignId" element={
            <ViewCampaign />
          } />

          {/* Protected ViewCampaign route for logged-in users */}
          <Route path="/user/campaign/:campaignId" element={
            <ProtectedRoute requireProfile={true}><ViewCampaign /></ProtectedRoute>
          } />

          <Route path="/campaign-list" element={
            <ProtectedRoute requireProfile={true}><CampaignList /></ProtectedRoute>
          } />
          

          <Route path="/my-projects" element={
            <ProtectedRoute requireProfile={true}><MyProjects /></ProtectedRoute>
          } />

          <Route path="/create-donation-box" element={
            <ProtectedRoute requireProfile={true}><CreateDonationBox /></ProtectedRoute>
          } />

          <Route path="/create-campaign" element={
            <ProtectedRoute requireProfile={true}><CreateCampaign /></ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute requireProfile={true}><ProfilePage /></ProtectedRoute>
          } />

        </Routes>
      </Router>
    </AuthProvider>
  );
  
}

export default App;
