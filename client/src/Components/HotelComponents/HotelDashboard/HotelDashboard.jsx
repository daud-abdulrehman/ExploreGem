import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { HotelNavbar } from "../HotelNavBar/HotelNavbar";
import { useMediaQuery } from "@mui/material";
import { FetchRooms } from "../../API/api";
import "./HotelDashboard.scss";
import Footer from "../../Footer/Footer";
import { useAuth } from "../../AuthContext/AuthContext";

export const HotelDashboard = () => {
  // Fetch data from the database
  const [data, setData] = React.useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");
  const { loginType } = useAuth();

  React.useEffect(() => {
    FetchRooms(loginType)
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, [loginType]);

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
                  <TableCell className="tableValues">Description</TableCell>
                  <TableCell className="tableValues">Bed Type</TableCell>
                  <TableCell className="tableValues">Price</TableCell>
                </>
              ) : (
                <>
                  <TableCell className="tableValues">Description</TableCell>
                  <TableCell className="tableValues">Bed Type</TableCell>
                  <TableCell className="tableValues">Price</TableCell>
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
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.bedtype}</TableCell>
                      <TableCell>{row.price}</TableCell>
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
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.bedtype}</TableCell>
                      <TableCell>{row.price}</TableCell>
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
