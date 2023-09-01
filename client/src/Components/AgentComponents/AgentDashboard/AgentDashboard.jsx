import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { AgentNavbar } from "../AgentNavBar/AgentNavbar";
import { useMediaQuery } from "@mui/material";
import { fetchTravelPlans } from "../../API/api";
import "./AgentDashboard.scss";
import Footer from "../../Footer/Footer";

export const AgentDashboard = () => {
  // Fetch data from the database
  const [data, setData] = React.useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  React.useEffect(() => {
    fetchTravelPlans()
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <AgentNavbar />
      <div className="agentDashboard">
        <h1>Added Travel Plans</h1>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {!isMobile ? (
                <>
                  <TableCell className="tableValues">Departure City</TableCell>
                  <TableCell className="tableValues">Date</TableCell>
                  <TableCell className="tableValues">Trip Length</TableCell>
                  <TableCell className="tableValues">Visit Places</TableCell>
                  <TableCell className="tableValues">Trip Cost</TableCell>
                  <TableCell className="tableValues">Food</TableCell>
                  <TableCell className="tableValues">
                    Activities Planned
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell className="tableValues">Departure City</TableCell>
                  <TableCell className="tableValues">Date</TableCell>
                  <TableCell className="tableValues">Trip Length</TableCell>
                  <TableCell className="tableValues">Trip Cost</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          {!isMobile ? (
            <>
              {Array.isArray(data) &&
                data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.departure}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.tripLength}</TableCell>
                    <TableCell>{row.visitPlaces}</TableCell>
                    <TableCell>{row.tripCost}</TableCell>
                    <TableCell>{row.food}</TableCell>
                    <TableCell>{row.activitiesPlanned}</TableCell>
                  </TableRow>
                ))}
            </>
          ) : (
            <>
              <TableBody>
                {Array.isArray(data) &&
                  data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.departure}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.tripLength}</TableCell>
                      <TableCell>{row.tripCost}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </>
          )}
        </Table>
      </div>
      <Footer/>
    </>
  );
};
