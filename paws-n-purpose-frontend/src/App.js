import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LandingPage from './pages/LandingPage/LandingPage';
import Dashboard from './pages/Dashboard/Dashboard';
import StartCampaign from './pages/StartCampaign/StartCampaign';
import ViewCampaign from './pages/ViewCampaign/ViewCampaign';
import './App.css';
import './styles/ButtonThemes.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/start-campaign" element={<StartCampaign />} />
        <Route path="/campaign/:campaignId" element={<ViewCampaign />} />
        <Route path="*" element={<Navigate to="/landing" />} />
      </Routes>
    </Router>
  );
  
}

export default App;
