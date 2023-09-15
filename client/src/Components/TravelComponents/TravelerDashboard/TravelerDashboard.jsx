import React, { useState } from "react";
import "./TravelerDashboard.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Grid,
  useMediaQuery,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import "./TravelerDashboard.scss";
import Footer from "../../Footer/Footer";
import TravelerNavBar from "../TravelerNavBar/TravelerNavBar";
import { BusTraveler } from "../../API/api";
import { useAuth } from "../../AuthContext/AuthContext";
import BookmarkAddSharpIcon from "@mui/icons-material/BookmarkAddSharp";

export const TravelerDashboard = () => {
  const travelerdashboardSchema = Yup.object().shape({
    departurecity: Yup.string().required("Required"),
    destinationcity: Yup.string().required("Required"),
    departuredate: Yup.date().required("Required"),
    returndate: Yup.date().required("Required"),
    nooftravelers: Yup.number().required("Required"),
    travelbudget: Yup.number().required("Required"),
  });
  const isMobile = useMediaQuery("(max-width:600px)");
  const [departureResults, setdepartureResults] = useState(null);
  const [destinationResults, setdestinationResults] = useState(null);
  console.log(destinationResults);
  const { loginType } = useAuth();

  return (
    <>
      <TravelerNavBar />
      {!departureResults ? (
        <>
          <h1 className="main-heading">Enter Your Travel Plan</h1>
        </>
      ) : (
        <></>
      )}

      <Grid item xs={isMobile ? 12 : 4}>
        <div className="travelerplan-container">
          {!departureResults && (
            <div className="form-container">
              <Formik
                initialValues={{
                  departurecity: "",
                  destinationcity: "",
                  departuredate: "",
                  returndate: "",
                  nooftravelers: "",
                  travelbudget: "",
                }}
                validationSchema={travelerdashboardSchema}
                onSubmit={async (values) => {
                  const data = await BusTraveler(loginType, values);
                  setdepartureResults(data.departureBuses);
                  setdestinationResults(data.returnBuses);
                }}
              >
                {({ errors, touched, setFieldValue }) => (
                  <Form className="form">
                    <div className="form-row">
                      <div className="form-field">
                        <p>Departure City</p>
                        <TextField
                          id="departurecity"
                          name="departurecity"
                          label="Enter your Departure City"
                          variant="outlined"
                          error={Boolean(
                            errors.departurecity && touched.departurecity
                          )}
                          helperText={
                            errors.departurecity &&
                            touched.departurecity &&
                            String(errors.departurecity)
                          }
                          onChange={(event) => {
                            setFieldValue("departurecity", event.target.value);
                          }}
                        />
                      </div>
                      <div className="form-field">
                        <p>Destination City</p>
                        <TextField
                          id="destinationcity"
                          name="destinationcity"
                          label="Enter your Destination City"
                          variant="outlined"
                          error={Boolean(
                            errors.destinationcity && touched.destinationcity
                          )}
                          helperText={
                            errors.destinationcity &&
                            touched.destinationcity &&
                            String(errors.destinationcity)
                          }
                          onChange={(event) => {
                            setFieldValue(
                              "destinationcity",
                              event.target.value
                            );
                          }}
                        />
                      </div>
                      <div className="form-field">
                        <p>Departure Date</p>
                        <TextField
                          id="departuredate"
                          name="departuredate"
                          //label="Enter your Departure Date"
                          variant="outlined"
                          type="date"
                          error={Boolean(
                            errors.departuredate && touched.departuredate
                          )}
                          helperText={
                            errors.departuredate &&
                            touched.departuredate &&
                            String(errors.departuredate)
                          }
                          onChange={(event) => {
                            setFieldValue("departuredate", event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-field">
                        <p>Return Date</p>
                        <TextField
                          id="returndate"
                          name="returndate"
                          variant="outlined"
                          type="date"
                          error={Boolean(
                            errors.returndate && touched.returndate
                          )}
                          helperText={
                            errors.returndate &&
                            touched.returndate &&
                            String(errors.returndate)
                          }
                          onChange={(event) => {
                            setFieldValue("returndate", event.target.value);
                          }}
                        />
                      </div>
                      <div className="form-field">
                        <p>No of Travelers</p>
                        <TextField
                          id="`nooftravelers`"
                          name="nooftravelers"
                          label="Enter your No Of Travelers"
                          variant="outlined"
                          error={Boolean(
                            errors.nooftravelers && touched.nooftravelers
                          )}
                          helperText={
                            errors.nooftravelers &&
                            touched.nooftravelers &&
                            String(errors.nooftravelers)
                          }
                          onChange={(event) => {
                            setFieldValue("nooftravelers", event.target.value);
                          }}
                        />
                      </div>
                      <div className="form-field">
                        <p>Travel Budget</p>
                        <TextField
                          id="travelbudget"
                          name="travelbudget"
                          label="Enter your Travel Budget"
                          variant="outlined"
                          error={Boolean(
                            errors.travelbudget && touched.travelbudget
                          )}
                          helperText={
                            errors.travelbudget &&
                            touched.travelbudget &&
                            String(errors.travelbudget)
                          }
                          onChange={(event) => {
                            setFieldValue("travelbudget", event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <Button variant="contained" type="submit" color="success">
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          )}
          {departureResults && (
            <>
              <div className="businfo-container">
                <h1>Departure Buses</h1>
                {renderTable(departureResults, isMobile)}
              </div>
            </>
          )}
          {destinationResults && (
            <>
              <div className="businfo-container">
                <h1>Return Buses</h1>
                {renderTable(destinationResults, isMobile)}
              </div>
            </>
          )}
        </div>
      </Grid>
      <Footer />
    </>
  );
};

function renderTable(data, isMobile) {
  if (isMobile) {
    // Render as a card for mobile view
    return (
      <Card className="mobile-card">
        <CardContent>
          {Array.isArray(data) &&
            data.map((row, index) => (
              <div key={`${index}-${row.id}`}>
                <Typography variant="h6">
                  Departure City: {row.departurecity}
                </Typography>
                <Typography>
                  Departure Date: {formatDate(row.departuredate)}
                </Typography>
                <Typography>Departure Time: {row.departuretime}</Typography>
                <Typography>Arrival City: {row.destinationcity}</Typography>
                <Typography>Ticket Price: {row.ticketprice}</Typography>
                <Typography>Available Seats: {row.seats}</Typography>
                <Typography>Booked Seats: {row.bookedseats}</Typography>
                <Button variant="contained" type="submit" color="success">
                    Book
                </Button>
              </div>
            ))}
        </CardContent>
      </Card>
    );
  } else {
    // Render as a table for non-mobile view
    return (
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableLabels">Departure City</TableCell>
            <TableCell className="tableLabels">Departure Date</TableCell>
            <TableCell className="tableLabels">Departure Time</TableCell>
            <TableCell className="tableLabels">Arrival City</TableCell>
            <TableCell className="tableLabels">Ticket Price</TableCell>
            <TableCell className="tableLabels">Available Seats</TableCell>
            <TableCell className="tableLabels">Booked Seats</TableCell>
            <TableCell className="tableLabels">Book</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) &&
            data.map((row, index) => (
              <TableRow key={`${index}-${row.id}`}>
                <TableCell className="tableValues" component="th" scope="row">
                  {row.departurecity}
                </TableCell>
                <TableCell className="tableValues">
                  {formatDate(row.departuredate)}
                </TableCell>
                <TableCell className="tableValues">
                  {row.departuretime}
                </TableCell>
                <TableCell className="tableValues">
                  {row.destinationcity}
                </TableCell>
                <TableCell className="tableValues">{row.ticketprice}</TableCell>
                <TableCell className="tableValues">{row.seats}</TableCell>
                <TableCell className="tableValues">
                  {row.bookedseats}
                </TableCell>{" "}
                <TableCell className="tableValues">
                <Button variant="contained" type="submit" color="success">
                    Book
                </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  }
}
function formatDate(isoString) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JS
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
