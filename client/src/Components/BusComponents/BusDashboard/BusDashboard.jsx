import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { BusNavbar } from "../BusNavBar/BusNavbar";
import { useMediaQuery } from "@mui/material";
import { FetchBuses } from "../../API/api";
import "./BusDashboard.scss";
import Footer from "../../Footer/Footer";
import { useAuth } from "../../AuthContext/AuthContext";

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
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {!isMobile ? (
                <>
                  <TableCell className="tableValues">License Number</TableCell>
                  <TableCell className="tableValues">Source</TableCell>
                  <TableCell className="tableValues">Destination</TableCell>
                  <TableCell className="tableValues">Seats</TableCell>
                  <TableCell className="tableValues">Booked Seats</TableCell>
                  <TableCell className="tableValues">Category</TableCell>
                  <TableCell className="tableValues">Ticket Price</TableCell>
                  <TableCell className="tableValues">Departure Time</TableCell>
                  <TableCell className="tableValues">Departure Date</TableCell>
                </>
              ) : (
                <>
                  <TableCell className="tableValues">Source</TableCell>
                  <TableCell className="tableValues">Destination</TableCell>
                  <TableCell className="tableValues">Cost</TableCell>
                  <TableCell className="tableValues">Departure Date</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>

          {!isMobile ? (
            <>
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
                    </TableRow>
                  ))}
              </TableBody>
            </>
          ) : (
            <>
              <TableBody>
                {Array.isArray(data) &&
                  data.map((row, index) => (
                    <TableRow key={`${index}-${row.id}`}>
                      <TableCell>{row.departurecity}</TableCell>
                      <TableCell>{row.destinationcity}</TableCell>
                      <TableCell>{row.ticketprice}</TableCell>
                      <TableCell>
                        {new Date(row.departuredate).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </>
          )}
        </Table>
      </div>
      <Footer />
    </>
  );
};
