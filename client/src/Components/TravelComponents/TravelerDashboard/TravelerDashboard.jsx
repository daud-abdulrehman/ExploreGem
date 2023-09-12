import React, { useState } from "react";
import "./TravelerDashboard.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid, useMediaQuery, TextField, Button,Box,Container,Paper } from "@mui/material";
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
  const [results, setResults] = useState(null);
  const { loginType } = useAuth();

  return (
    <>
      <TravelerNavBar />
      {!results ? (
        <>
          <h1 className="main-heading">Enter Your Travel Plan</h1>
        </>
      ) : (
        <>
          <h1 className="main-heading">Desired Results</h1>
        </>
      )}

      <Grid item xs={isMobile ? 12 : 4}>
        <div className="travelerplan-container">
          {!results && (
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
                  setResults(data.buses);
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
          {results && (
            <>
              {isMobile ? (
                <Paper component={Container}>
                  <Box sx={{ overflowX: "auto" }}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell className="tableLabels">
                            Departure City
                          </TableCell>
                          <TableCell className="tableLabels">
                            Departure Date
                          </TableCell>
                          <TableCell className="tableLabels">
                            Deaparture Time
                          </TableCell>
                          <TableCell className="tableLabels">
                            Arrival City
                          </TableCell>
                          <TableCell className="tableLabels">
                            Ticekt Price
                          </TableCell>
                          <TableCell className="tableLabels">
                            Available Seats
                          </TableCell>
                          <TableCell className="tableLabels">
                            Booked Seats
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {Array.isArray(results.departureBuses) &&
                      results.departureBuses.map((row, index) => (
                    <TableRow key={`${index}-${row.id}`}>
                            <TableCell
                              className="tableValues"
                              component="th"
                              scope="row"
                            >
                              {row.departurecity}
                            </TableCell>
                            <TableCell className="tableValues">
                              {row.departuredate}
                            </TableCell>
                            <TableCell className="tableValues">
                              {row.departuretime}
                            </TableCell>
                            <TableCell className="tableValues">
                              {row.destinationcity}
                            </TableCell>
                            <TableCell className="tableValues">
                              {row.ticketprice}
                            </TableCell>
                            <TableCell className="tableValues">
                              {row.seats}
                            </TableCell>
                            <TableCell className="tableValues">
                              {row.bookedseats}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Paper>
              ) : (
                // Render the table without Paper for larger screens
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="tableLabels">
                        Departure City
                      </TableCell>
                      <TableCell className="tableLabels">
                        Departure Date
                      </TableCell>
                      <TableCell className="tableLabels">
                        Deaparture Time
                      </TableCell>
                      <TableCell className="tableLabels">
                        Arrival City
                      </TableCell>
                      <TableCell className="tableLabels">
                        Ticekt Price
                      </TableCell>
                      <TableCell className="tableLabels">
                        Available Seats
                      </TableCell>
                      <TableCell className="tableLabels">
                        Booked Seats
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {Array.isArray(results.departureBuses) &&
                      results.departureBuses.map((row, index) => (
                    <TableRow key={`${index}-${row.id}`}>
                        <TableCell
                          className="tableValues"
                          component="th"
                          scope="row"
                        >
                          {row.departurecity}
                        </TableCell>
                        <TableCell className="tableValues">
                          {row.departuredate}
                        </TableCell>
                        <TableCell className="tableValues">
                          {row.departuretime}
                        </TableCell>
                        <TableCell className="tableValues">
                          {row.destinationcity}
                        </TableCell>
                        <TableCell className="tableValues">
                          {row.ticketprice}
                        </TableCell>
                        <TableCell className="tableValues">
                          {row.seats}
                        </TableCell>
                        <TableCell className="tableValues">
                          {row.bookedseats}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </>
          )}
        </div>
      </Grid>
      <Footer />
    </>
  );
};
