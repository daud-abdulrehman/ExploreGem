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
  useMediaQuery,
  Button
} from "@mui/material";
import { HotelNavbar } from "../HotelNavBar/HotelNavbar";
import { FetchRooms } from "../../API/api";
import "./HotelDashboard.scss";
import Footer from "../../Footer/Footer";
import { useAuth } from "../../AuthContext/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";


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
        {isMobile ? (
          // Display card for mobile view
          data.map((row) => (
            <Card key={row.id} className="mobile-card">
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Description: {row.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Bed Type: {row.bedtype}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: {row.price}
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
                <TableCell className="tableLabels">Description</TableCell>
                <TableCell className="tableLabels">Bed Type</TableCell>
                <TableCell className="tableLabels">Price</TableCell>
                <TableCell className="tableLabels">Delete</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(data) &&
                data.map((row, index) => (
                  <TableRow key={`${index}-${row.id}`}>
                    <TableCell className="tableValues">{row.description}</TableCell>
                    <TableCell className="tableValues">{row.bedtype}</TableCell>
                    <TableCell className="tableValues">{row.price}</TableCell>
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
