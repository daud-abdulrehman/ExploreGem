import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import TravelerNavBar from "../TravelerNavBar/TravelerNavBar";
import Footer from "../../Footer/Footer";
import "./TravelerBooking.scss";
import { useAuth } from "../../AuthContext/AuthContext";

export const TravelerBooking = ({ data }) => {
  // Sample data for each table
  const busBookingsData = [
    {
      id: 1,
      from: "Location 1",
      to: "Location 2",
      date: "Date 1",
      time: "Time 1",
      ticketCost: "$100",
      noOfTickets: 2,
    },
    // Add more bus bookings data as needed
  ];

  const hotelBookingsData = [
    {
      id: 1,
      hotelName: "Hotel A",
      location: "Location A",
      roomDescription: "Room A",
      bedType: "Bed Type A",
      cost: "$150",
    },
    // Add more hotel bookings data as needed
  ];

  const agentBookingsData = [
    {
      id: 1,
      from: "Location 1",
      to: "Location 2",
      startDate: "Date 1",
      endDate: "Date 2",
      totalCost: "$200",
      activities: "Activity A, Activity B",
      food: "Food A, Food B",
    },
    // Add more agent bookings data as needed
  ];

  const { loginType } = useAuth();

  const isMobileView = useMediaQuery("(max-width:600px)");

  return (
    <>
      <TravelerNavBar />
      <div className="bookings-page">
        {isMobileView ? (
          <>
            <h1>Bus Bookings</h1>
            {busBookingsData.map((row) => (
              <Card key={row.id} className="mobile-card">
                <CardContent>
                  <Typography variant="h6" component="div">
                    {row.from} - {row.to}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {row.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Time: {row.time}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ticket Cost: {row.ticketCost}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    No Of Tickets: {row.noOfTickets}
                  </Typography>
                </CardContent>
              </Card>
            ))}

            <h1>Hotel Bookings</h1>
            {hotelBookingsData.map((row) => (
              <Card key={row.id} className="mobile-card">
                <CardContent>
                  <Typography variant="h6" component="div">
                    {row.hotelName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {row.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Room Description: {row.roomDescription}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bed Type: {row.bedType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cost: {row.cost}
                  </Typography>
                </CardContent>
              </Card>
            ))}

            <h1>Agent Bookings</h1>
            {agentBookingsData.map((row) => (
              <Card key={row.id} className="mobile-card">
                <CardContent>
                  <Typography variant="h6" component="div">
                    {row.from} - {row.to}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Start Date: {row.startDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    End Date: {row.endDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Cost: {row.totalCost}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Activities: {row.activities}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Food: {row.food}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            <h1>Bus Bookings</h1>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableLabels">From</TableCell>
                  <TableCell className="tableLabels">To</TableCell>
                  <TableCell className="tableLabels">Date</TableCell>
                  <TableCell className="tableLabels">Time</TableCell>
                  <TableCell className="tableLabels">Ticket Cost</TableCell>
                  <TableCell className="tableLabels">No Of Tickets</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {busBookingsData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell
                      className="tableValues"
                      component="th"
                      scope="row"
                    >
                      {row.from}
                    </TableCell>
                    <TableCell className="tableValues">{row.to}</TableCell>
                    <TableCell className="tableValues">{row.date}</TableCell>
                    <TableCell className="tableValues">{row.time}</TableCell>
                    <TableCell className="tableValues">
                      {row.ticketCost}
                    </TableCell>
                    <TableCell className="tableValues">
                      {row.noOfTickets}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <h1>Hotel Bookings</h1>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableLabels">Hotel Name</TableCell>
                  <TableCell className="tableLabels">Location</TableCell>
                  <TableCell className="tableLabels">
                    Room Description
                  </TableCell>
                  <TableCell className="tableLabels">Bed Type</TableCell>
                  <TableCell className="tableLabels">Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hotelBookingsData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell
                      className="tableValues"
                      component="th"
                      scope="row"
                    >
                      {row.hotelName}
                    </TableCell>
                    <TableCell className="tableValues">{row.location}</TableCell>
                    <TableCell className="tableValues">
                      {row.roomDescription}
                    </TableCell>
                    <TableCell className="tableValues">{row.bedType}</TableCell>
                    <TableCell className="tableValues">{row.cost}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <h1>Agent Bookings</h1>

            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableLabels">From</TableCell>
                  <TableCell className="tableLabels">To</TableCell>
                  <TableCell className="tableLabels">Start Date</TableCell>
                  <TableCell className="tableLabels">End Date</TableCell>
                  <TableCell className="tableLabels">Total Cost</TableCell>
                  <TableCell className="tableLabels">Activities</TableCell>
                  <TableCell className="tableLabels">Food</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {agentBookingsData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell
                      className="tableValues"
                      component="th"
                      scope="row"
                    >
                      {row.from}
                    </TableCell>
                    <TableCell className="tableValues">{row.to}</TableCell>
                    <TableCell className="tableValues">{row.startDate}</TableCell>
                    <TableCell className="tableValues">{row.endDate}</TableCell>
                    <TableCell className="tableValues">{row.totalCost}</TableCell>
                    <TableCell className="tableValues">{row.activities}</TableCell>
                    <TableCell className="tableValues">{row.food}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};
