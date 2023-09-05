import React from "react";
import "./TravelerDashboard.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid, useMediaQuery, TextField, Button } from "@mui/material";
import "./TravelerDashboard.scss";
import Footer from "../../Footer/Footer";
import TravelerNavBar from "../TravelerNavBar/TravelerNavBar";

export const TravelerDashboard = () => {
  const travelerdashboardSchema = Yup.object().shape({
    depaturecity: Yup.string().required("Required"),
    destinationcity: Yup.string().required("Required"),
    depaturedate: Yup.date().required("Required"),
    returndate: Yup.date().required("Required"),
    nooftravelers: Yup.number().required("Required"),
    travelbudget: Yup.number().required("Required"),
  });
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <TravelerNavBar />
      <h1 className="main-heading">Enter Your Travel Plan</h1>

      <Grid item xs={isMobile ? 12 : 4}>
        <div className="travelerplan-container">
          <div className="form-container">
            <Formik
              initialValues={{
                depaturecity: "",
                destinationcity: "",
                depaturedate: "",
                returndate: "",
                nooftravelers: "",
                travelbudget: "",
              }}
              validationSchema={travelerdashboardSchema}
              onSubmit={async (values) => {}}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form className="form">
                  <div className="form-row">
                    <TextField
                      id="depaturecity"
                      name="depaturecity"
                      label="Enter your Departure City"
                      variant="outlined"
                      error={Boolean(
                        errors.depaturecity && touched.depaturecity
                      )}
                      helperText={
                        errors.depaturecity &&
                        touched.depaturecity &&
                        String(errors.depaturecity)
                      }
                      onChange={(event) => {
                        setFieldValue("departurecity", event.target.value);
                      }}
                    />
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
                        setFieldValue("destinationcity", event.target.value);
                      }}
                    />

                    <TextField
                      id="departuredate"
                      name="departuredate"
                      label="Enter your Departure Date"
                      variant="outlined"
                      error={Boolean(
                        errors.depaturedate && touched.depaturedate
                      )}
                      helperText={
                        errors.depaturedate &&
                        touched.depaturedate &&
                        String(errors.depaturedate)
                      }
                      onChange={(event) => {
                        setFieldValue("depaturedate", event.target.value);
                      }}
                    />
                  </div>
                  <div className="form-row">
                    <TextField
                      id="returndate"
                      name="returndate"
                      label="Enter your Return Date"
                      variant="outlined"
                      error={Boolean(errors.returndate && touched.returndate)}
                      helperText={
                        errors.returndate &&
                        touched.returndate &&
                        String(errors.returndate)
                      }
                      onChange={(event) => {
                        setFieldValue("returndate", event.target.value);
                      }}
                    />

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
                  <Button variant="contained" type="submit" color="success">
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Grid>
      <Footer />
    </>
  );
};
