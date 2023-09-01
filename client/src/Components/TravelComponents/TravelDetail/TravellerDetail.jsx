import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import "./TravellerDetail.scss";
import { Grid, useMediaQuery } from "@mui/material";
import TravelerBackground from "../../../Picture/Detail.jpg";
import { addTravellerDetails } from "../../API/api";

export const TravellerDetail = () => {
  const travelerSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    contact: Yup.number().required("Required"),
    cnic: Yup.number().required("Required"),
  });
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Grid container>
      {!isMobile && (
        <Grid item xs={8}>
          <div
            style={{
              backgroundImage: `url(${TravelerBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh",
            }}
          />
        </Grid>
      )}
      <Grid item xs={isMobile ? 12 : 4}>
        <div className="travller-details-container">
          <div className="form-container">
            <h1>Traveller Details</h1>
            <Formik
              initialValues={{
                username: "",
                contact: null,
                cnic: null,
              }}
              validationSchema={travelerSchema}
              onSubmit={async (values) => {
                await addTravellerDetails(values);
              }}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <p>User Name</p>
                  <TextField
                    id="username"
                    name="username"
                    label="Enter your user name"
                    variant="outlined"
                    error={Boolean(errors.username && touched.username)}
                    helperText={
                      errors.username &&
                      touched.username &&
                      String(errors.username)
                    }
                    onChange={(event) => {
                      setFieldValue("username", event.target.value);
                    }}
                  />
                  <p>Contact Number</p>
                  <TextField
                    id="contact"
                    name="contact"
                    label="Enter your Contact Number"
                    type="contact"
                    variant="outlined"
                    error={Boolean(errors.contact && touched.contact)}
                    helperText={
                      errors.contact &&
                      touched.contact &&
                      Number(errors.contact)
                    }
                    onChange={(event) => {
                      setFieldValue("contact", event.target.value);
                    }}
                  />
                  <p>CNIC</p>
                  <TextField
                    id="cnic"
                    name="cnic"
                    label="Enter your CNIC"
                    type="cnic"
                    variant="outlined"
                    error={Boolean(errors.cnic && touched.cnic)}
                    helperText={
                      errors.cnic && touched.cnic && Number(errors.cnic)
                    }
                    onChange={(event) => {
                      setFieldValue("cnic", event.target.value);
                    }}
                  />
                  <Button variant="contained" type="submit" color="success">
                    Signup
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
