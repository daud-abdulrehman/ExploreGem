import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { BusNavbar } from "../BusNavBar/BusNavbar";
import { useMediaQuery } from "@mui/material";
import { fetchBuses } from "../../API/api";
import "./BusDashboard.scss";

export const BusDashboard = () => {
  // Fetch data from the database
  const [data, setData] = React.useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  React.useEffect(() => {
    fetchBuses()
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

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
                  <TableCell>License Number</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Seats</TableCell>
                  <TableCell>Cost</TableCell>
                </>
              ) : (
                <>
                  <TableCell className="tableValues">License Number</TableCell>
                  <TableCell className="tableValues">Source</TableCell>
                  <TableCell className="tableValues">Destination</TableCell>
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
                      <TableCell>{row.licenseNumber}</TableCell>
                      <TableCell>{row.source}</TableCell>
                      <TableCell>{row.destination}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.seats}</TableCell>
                      <TableCell>{row.cost}</TableCell>
                    </TableRow>
                  ))}
              </>
            ) : (
              <>
                {Array.isArray(data) &&
                  data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.licenseNumber}</TableCell>
                      <TableCell>{row.source}</TableCell>
                      <TableCell>{row.destination}</TableCell>
                      <TableCell>{row.cost}</TableCell>
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
