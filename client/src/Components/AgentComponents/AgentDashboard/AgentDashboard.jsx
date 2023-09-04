import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { AgentNavbar } from "../AgentNavBar/AgentNavbar";
import { useMediaQuery } from "@mui/material";
import { FetchPlan } from "../../API/api";
import "./AgentDashboard.scss";
import { useAuth } from "../../AuthContext/AuthContext";
import Footer from "../../Footer/Footer";

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
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {!isMobile ? (
                <>
                  <TableCell className="tableValues">Departure City</TableCell>
                  <TableCell className="tableValues">
                    Destination City
                  </TableCell>
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
                      <TableCell>
                        {new Date(row.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{row.triplength} Days</TableCell>
                      <TableCell>{row.tripcost}</TableCell>
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
