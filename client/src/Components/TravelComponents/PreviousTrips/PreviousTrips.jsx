import React from "react";
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
import Paper from "@mui/material/Paper"; // Import Paper here
import TravelerNavBar from "../TravelerNavBar/TravelerNavBar";
import Footer from "../../Footer/Footer";
import "./PreviousTrips.scss";
import { useAuth } from "../../AuthContext/AuthContext";

export const PreviousTrips = ({ data }) => {
  // Sample data
  const sampleData = [
    {
      id: 1,
      from: "Location 1",
      to: "Location 2",
      startDate: "Date 1",
      endDate: "Date 2",
      totalCost: "$100",
      hotelsVisited: ["Hotel A", "Hotel B", "Hotel C"],
    },
    {
      id: 2,
      from: "Location 2",
      to: "Location 3",
      startDate: "Date 2",
      endDate: "Date 3",
      totalCost: "$150",
      hotelsVisited: ["Hotel X", "Hotel Y"],
    },
    {
      id: 3,
      from: "Location 3",
      to: "Location 4",
      startDate: "Date 3",
      endDate: "Date 4",
      totalCost: "$120",
      hotelsVisited: ["Hotel M", "Hotel N", "Hotel O"],
    },
  ];

  const { loginType } = useAuth();

  const isMobileView = useMediaQuery("(max-width:600px)");

  return (
    <>
      <TravelerNavBar />
      <div className="previous-trips-page">
        <h1>Previous Trips</h1>
        {isMobileView ? (
          sampleData.map((row) => (
            <Card key={row.id} className="mobile-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {row.from} to {row.to}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Start Date: {row.startDate}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  End Date: {row.endDate}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Cost: {row.totalCost}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Hotels Visited: {row.hotelsVisited.join(", ")}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          // Render the table for larger screens
          <Paper component={Container}>
            <Box sx={{ overflowX: "auto" }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableLabels">From</TableCell>
                    <TableCell className="tableLabels">To</TableCell>
                    <TableCell className="tableLabels">Start Date</TableCell>
                    <TableCell className="tableLabels">End Date</TableCell>
                    <TableCell className="tableLabels">Total Cost</TableCell>
                    <TableCell className="tableLabels">
                      Hotels Visited
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sampleData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell
                        className="tableValues"
                        component="th"
                        scope="row"
                      >
                        {row.from}
                      </TableCell>
                      <TableCell className="tableValues">{row.to}</TableCell>
                      <TableCell className="tableValues">
                        {row.startDate}
                      </TableCell>
                      <TableCell className="tableValues">
                        {row.endDate}
                      </TableCell>
                      <TableCell className="tableValues">
                        {row.totalCost}
                      </TableCell>
                      <TableCell className="tableValues">
                        {row.hotelsVisited.join(", ")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Paper>
        )}
      </div>
      <Footer />
    </>
  );
};
