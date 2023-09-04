import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Grid, Button, TextField } from "@mui/material";
import { AddBuses } from "../../API/api";
import { useAuth } from "../../AuthContext/AuthContext";
import "./AddBus.scss";
import { BusNavbar } from "../BusNavBar/BusNavbar";
import Footer from "../../Footer/Footer";

export const AddBus = () => {
  const { loginType } = useAuth();
  const addBusSchema = Yup.object().shape({
    lisceneplate: Yup.string().required("Required"),
    departurecity: Yup.string().required("Required"),
    destinationcity: Yup.string().required("Required"),
    seats: Yup.number().required("Required"),
    catagory: Yup.string().required("Required"),
    ticketprice: Yup.number().required("Required"),
    departuretime: Yup.string().required("Required"),
    departuredate: Yup.date().required("Required"),
  });
  return (
    <>
      <Grid container className="add-bus-page">
        <BusNavbar />
        <div className="addBus">
          <h1>Add Bus</h1>
          <Formik
            initialValues={{
              lisceneplate: "",
              departurecity: "",
              destinationcity: "",
              seats: null,
              catagory: "",
              ticketprice: null,
              departuretime: "",
              departuredate: null,
            }}
            validationSchema={addBusSchema}
            onSubmit={async (values) => {
              const response = await AddBuses(values, loginType); // Pass loginType to AddPlan
              console.log(response);
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <div className="form-container">
                <Form>
                  <Grid container className="grid-container">
                    <Grid item xs={12} md={4}>
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
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className="form-field">
                        <p>Arrival City</p>
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
                    </Grid>
                    <Grid item xs={12} md={4}>
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
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className="form-field">
                        <p>Departure Time</p>
                        <TextField
                          id="departuretime"
                          name="departuretime"
                          //label="Enter your Departure Time"
                          variant="outlined"
                          type="time"
                          error={Boolean(
                            errors.departuretime && touched.departuretime
                          )}
                          helperText={
                            errors.departuretime &&
                            touched.departuretime &&
                            String(errors.departuretime)
                          }
                          onChange={(event) => {
                            setFieldValue("departuretime", event.target.value);
                          }}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <div className="form-field">
                        <p>Liscence No</p>
                        <TextField
                          id="liscenceno"
                          name="liscenceno"
                          label="Enter your Liscence No"
                          variant="outlined"
                          error={Boolean(
                            errors.liscenceno && touched.liscenceno
                          )}
                          helperText={
                            errors.liscenceno &&
                            touched.liscenceno &&
                            String(errors.liscenceno)
                          }
                          onChange={(event) => {
                            setFieldValue("liscenceno", event.target.value);
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className="form-field">
                        <p>Trip Cost</p>
                        <TextField
                          id="ticketprice"
                          name="ticketprice"
                          label="Enter your Ticket Price"
                          variant="outlined"
                          type="number"
                          error={Boolean(
                            errors.ticketprice && touched.ticketprice
                          )}
                          helperText={
                            errors.ticketprice &&
                            touched.ticketprice &&
                            String(errors.ticketprice)
                          }
                          onChange={(event) => {
                            setFieldValue("ticketprice", event.target.value);
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className="form-field">
                        <p>Number of Seats</p>
                        <TextField
                          id="seats"
                          name="seats"
                          label="Enter No Of Seats"
                          variant="outlined"
                          type="number"
                          error={Boolean(errors.seats && touched.seats)}
                          helperText={
                            errors.seats &&
                            touched.seats &&
                            String(errors.seats)
                          }
                          onChange={(event) => {
                            setFieldValue("seats", event.target.value);
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className="form-field">
                        <p>Category</p>
                        <TextField
                          id="catagory"
                          name="catagory"
                          label="Enter your Destination City"
                          variant="outlined"
                          error={Boolean(errors.catagory && touched.catagory)}
                          helperText={
                            errors.catagory &&
                            touched.catagory &&
                            String(errors.catagory)
                          }
                          onChange={(event) => {
                            setFieldValue("catagory", event.target.value);
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid>

                  <div className="button-container">
                    <Button variant="contained" type="submit" color="success">
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </Grid>
      <Footer />
    </>
  );
};
