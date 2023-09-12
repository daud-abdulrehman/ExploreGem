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
import { AgentDetail } from "./Components/AgentComponents/AgentDetail/AgentDetail";
import { HotelDetail } from "./Components/HotelComponents/HotelDetail/HotelDetail";
import { BusDetail } from "./Components/BusComponents/BusDetail/BusDetail";
import { AgentDashboard } from "./Components/AgentComponents/AgentDashboard/AgentDashboard";
import { HotelDashboard } from "./Components/HotelComponents/HotelDashboard/HotelDashboard";
import { BusDashboard } from "./Components/BusComponents/BusDashboard/BusDashboard";
import { AddRoom } from "./Components/HotelComponents/AddRoom/AddRoom";
import { AddBus } from "./Components/BusComponents/AddBus/AddBus";
import { AgentNavbar } from "./Components/AgentComponents/AgentNavBar/AgentNavbar";
import { AddPlansForm } from "./Components/AgentComponents/AddPlans/AddPlans";
import { TravelerDashboard } from "./Components/TravelComponents/TravelerDashboard/TravelerDashboard";
import { TravellerDetail } from "./Components/TravelComponents/TravelDetail/TravellerDetail";
import { TravelerAccomadation } from "./Components/TravelComponents/TravelerAccomadation/TravelerAccomadation";
import { PreviousTrips } from "./Components/TravelComponents/PreviousTrips/PreviousTrips";
import { TravelerBooking } from "./Components/TravelComponents/TravelerBookings/TravelerBooking";
import { RoomBookings } from "./Components/HotelComponents/RoomBookings/RoomBookings";

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
          <Route path="/agent/add-plans" element={<AddPlansForm />} />
          <Route path="/hotel/add-rooms" element={<AddRoom />} />
          <Route path="/traveler-dashboard" element={<TravelerDashboard />} />
          <Route path="/bus/add-buses" element={<AddBus />} />
          <Route path="/agent-navbar" element={<AgentNavbar />} />
          <Route path = "/traveler/accomadations" element= {<TravelerAccomadation/>}/>
          <Route path = "/traveler/previoustrips" element = {<PreviousTrips/>}/>
          <Route path = "/traveler/bookings" element = {<TravelerBooking/>}/>
          <Route path = "/hotel/room-bookings" element = {<RoomBookings/>}/>


        </Routes>
      </div>
    </Router>
  );
}

export default App;
