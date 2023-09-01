import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { HotelNavbar } from "../HotelNavBar/HotelNavbar";
import { useMediaQuery } from "@mui/material";
import { fetchHotelRooms } from "../../API/api";
import "./HotelDashboard.scss";
import Footer from "../../Footer/Footer";

export const HotelDashboard = () => {
  // Fetch data from the database
  const [data, setData] = React.useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  React.useEffect(() => {
    fetchHotelRooms()
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <HotelNavbar />
      <div className="hotelDashboard">
        <h1>Added Hotel Room Details</h1>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {!isMobile ? (
                <>
                  <TableCell>Bed</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Cost</TableCell>
                </>
              ) : (
                <>
                  <TableCell className="tableValues">Bed</TableCell>
                  <TableCell className="tableValues">Description</TableCell>
                  <TableCell className="tableValues">Room</TableCell>
                  <TableCell className="tableValues">Cost</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!isMobile ? (
              <>
                {Array.isArray(data) &&
                  data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.bed}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.room}</TableCell>
                      <TableCell>{row.cost}</TableCell>
                    </TableRow>
                  ))}
              </>
            ) : (
              <>
                {Array.isArray(data) &&
                  data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.bed}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.room}</TableCell>
                      <TableCell>{row.cost}</TableCell>
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <Footer/>
    </>
  );
};
