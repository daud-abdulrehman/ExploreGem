import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Container,
  Typography,
  Box,
  useMediaQuery,
  Card,
  CardContent,
} from "@mui/material";
import { AgentNavbar } from "../AgentNavBar/AgentNavbar";
import { FetchPlan } from "../../API/api";
import "./AgentDashboard.scss";
import { useAuth } from "../../AuthContext/AuthContext";
import Footer from "../../Footer/Footer";
import DeleteIcon from "@mui/icons-material/Delete";

export const AgentDashboard = () => {
  // Fetch data from the database
  const [data, setData] = React.useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");
  const { loginType } = useAuth();

  React.useEffect(() => {
    // Fetch the data when the component mounts
    FetchPlan(loginType)
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, [loginType]);

  return (
    <>
      <AgentNavbar />
      <div className="agentDashboard">
        <h1>Added Travel Plans</h1>
        {isMobile ? (
          // Display card for mobile view
          data.map((row) => (
            <Card key={row.id} className="mobile-card">
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Departure City: {row.departurecity}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Destination City: {row.destinationcity}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Date: {new Date(row.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Trip Length: {row.triplength} Days
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Visit Places: {row.visitplaces}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Trip Cost: {row.tripcost}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Food: {row.food}
                </Typography>
                <div className="icon-container">
                <Button variant="contained" color="secondary" className="button-icon">
                  <DeleteIcon fontSize="very small" /> 
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
                <TableCell className="tableValues">Departure City</TableCell>
                <TableCell className="tableValues">Destination City</TableCell>
                <TableCell className="tableValues">Date</TableCell>
                <TableCell className="tableValues">Trip Length</TableCell>
                <TableCell className="tableValues">Visit Places</TableCell>
                <TableCell className="tableValues">Trip Cost</TableCell>
                <TableCell className="tableValues">Food</TableCell>
                <TableCell className="tableValues">
                  Activities Planned
                </TableCell>
                <TableCell className="tableValues">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(data) &&
                data.map((row, index) => (
                  <TableRow key={`${index}-${row.id}`}>
                    <TableCell>{row.departurecity}</TableCell>
                    <TableCell>{row.destinationcity}</TableCell>
                    <TableCell>
                      {new Date(row.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{row.triplength} Days</TableCell>
                    <TableCell>{row.visitplaces}</TableCell>
                    <TableCell>{row.tripcost}</TableCell>
                    <TableCell>{row.food}</TableCell>
                    <TableCell>{row.plannedactivities}</TableCell>
                    <div className="icon-container">
                      <Button
                        variant="contained"
                        color="secondary"
                        className="button-icon"
                      >
                        <DeleteIcon fontSize="very small" />
                      </Button>
                    </div>
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
