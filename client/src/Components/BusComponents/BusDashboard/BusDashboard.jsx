import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { BusNavbar } from "../BusNavBar/BusNavbar";
import { useMediaQuery } from "@mui/material";
import { FetchBuses } from "../../API/api";
import "./BusDashboard.scss";
import Footer from "../../Footer/Footer";
import { useAuth } from "../../AuthContext/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";

export const BusDashboard = () => {
  // Fetch data from the database
  const [data, setData] = React.useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");
  const { loginType } = useAuth();

  React.useEffect(() => {
    FetchBuses(loginType)
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, [loginType]);

  return (
    <>
      <BusNavbar />
      <div className="busDashboard">
        <h1>Added Buses Details</h1>
        {isMobile ? (
          // Display card for mobile view
          data.map((row) => (
            <Card key={row.id} className="mobile-card">
              <CardContent>
                <Typography gutterBottom variant="h6">
                  License Number: {row.lisceneplate}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Source: {row.departurecity}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Destination: {row.destinationcity}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Seats: {row.seats}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Booked Seats: {row.bookedseats}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Category: {row.catagory}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Ticket Price: {row.ticketprice}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Departure Time: {row.departuretime}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Departure Date:{" "}
                  {new Date(row.departuredate).toLocaleDateString()}
                </Typography>
                <div className="icon-container">
                  <Button
                    variant="contained"
                    color="secondary"
                    className="button-icon"
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          // Display table for desktop view
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableValues">License Number</TableCell>
                <TableCell className="tableValues">Source</TableCell>
                <TableCell className="tableValues">Destination</TableCell>
                <TableCell className="tableValues">Seats</TableCell>
                <TableCell className="tableValues">Booked Seats</TableCell>
                <TableCell className="tableValues">Category</TableCell>
                <TableCell className="tableValues">Ticket Price</TableCell>
                <TableCell className="tableValues">Departure Time</TableCell>
                <TableCell className="tableValues">Departure Date</TableCell>
                <TableCell className="tableValues">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(data) &&
                data.map((row, index) => (
                  <TableRow key={`${index}-${row.id}`}>
                    <TableCell>{row.lisceneplate}</TableCell>
                    <TableCell>{row.departurecity}</TableCell>
                    <TableCell>{row.destinationcity}</TableCell>
                    <TableCell>{row.seats}</TableCell>
                    <TableCell>{row.bookedseats}</TableCell>
                    <TableCell>{row.catagory}</TableCell>
                    <TableCell>{row.ticketprice}</TableCell>
                    <TableCell>{row.departuretime}</TableCell>
                    <TableCell>
                      {new Date(row.departuredate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="tableValues">
                      <Button
                        variant="contained"
                        color="secondary"
                        className="button-icon"
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </div>
      <Footer />
    </>
  );
};
