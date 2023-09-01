import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { HomePage } from "./Components/HomePage/HomePage";
import { SigninPage } from "./Components/SigninPage/SigninPage";
import { SignupPage } from "./Components/SignupPage/SignupPage";
import { TravellerDetail } from "./Components/TravelDetail/TravellerDetail";
import { AgentDetail } from "./Components/AgentComponents/AgentDetail/AgentDetail";
import { HotelDetail } from "./Components/HotelComponents/HotelDetail/HotelDetail";
import { BusDetail } from "./Components/BusComponents/BusDetail/BusDetail";
import { AgentDashboard } from "./Components/AgentComponents/AgentDashboard/AgentDashboard";
import { HotelDashboard } from "./Components/HotelComponents/HotelDashboard/HotelDashboard";
import { BusDashboard } from "./Components/BusComponents/BusDashboard/BusDashboard";
import { AddPlans } from "./Components/AgentComponents/AddPlans/AddPlans";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/traveller-details" element={<TravellerDetail />} />
          <Route path="/agent-details" element={<AgentDetail />} />
          <Route path="/hotel-details" element={<HotelDetail />} />
          <Route path="/bus-details" element={<BusDetail />} />
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
          <Route path="/hotel-dashboard" element={<HotelDashboard />} />
          <Route path="/bus-dashboard" element={<BusDashboard />} />
          <Route path="/agent/add-plans" element={<AddPlans />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;