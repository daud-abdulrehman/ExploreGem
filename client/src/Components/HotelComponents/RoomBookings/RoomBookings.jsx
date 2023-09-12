import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  useMediaQuery,
  Table,TableBody,TableRow,TableCell,TableHead
} from "@mui/material";
import Paper from "@mui/material/Paper"; // Import Paper here
import Footer from "../../Footer/Footer";
import "./RoomBookings.scss";
import { useAuth } from "../../AuthContext/AuthContext";
import { HotelNavbar } from "../HotelNavBar/HotelNavbar";

export const RoomBookings = ({ data }) => {
  const { loginType } = useAuth();

  const isMobileView = useMediaQuery("(max-width:600px)");

  data = [
    {
      id: 1,
      customerName: "John Doe",
      email: "john.doe@example.com",
      roomId: "101",
      description: "Standard Room",
      bedType: "Double Bed",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      email: "jane.smith@example.com",
      roomId: "102",
      description: "Suite",
      bedType: "King Bed",
    },
    {
      id: 3,
      customerName: "Alice Johnson",
      email: "alice.johnson@example.com",
      roomId: "103",
      description: "Deluxe Room",
      bedType: "Twin Beds",
    },
  ];
  return (
    <>
      <HotelNavbar />
      <div className="roombookings-page">
        <h1>Room Bookings</h1>
        {isMobileView ? (
          <Container maxWidth="sm">
            {data.map((row) => (
              <Card key={row.id} className="mobile-card">
                <CardContent>
                  <Typography variant="h6" component="div">
                    Customer: {row.customerName}
                  </Typography>
                  <Typography>Email: {row.email}</Typography>
                  <Typography>Room ID: {row.roomId}</Typography>
                  <Typography>Description: {row.description}</Typography>
                  <Typography>Bed Type: {row.bedType}</Typography>
                </CardContent>
              </Card>
            ))}
          </Container>
        ) : (
            <div className="table-container">
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableLabels">Customer</TableCell>
                    <TableCell className="tableLabels">Email</TableCell>
                    <TableCell className="tableLabels">Room ID</TableCell>
                    <TableCell className="tableLabels">Description</TableCell>
                    <TableCell className="tableLabels">Bed Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell
                        className="tableValues"
                        component="th"
                        scope="row"
                      >
                        {row.customerName}
                      </TableCell>
                      <TableCell className="tableValues">{row.email}</TableCell>
                      <TableCell className="tableValues">{row.roomId}</TableCell>
                      <TableCell className="tableValues">
                        {row.description}
                      </TableCell>
                      <TableCell className="tableValues">{row.bedType}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
        )}
      </div>
      <Footer />
    </>
  );
};
