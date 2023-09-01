import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import "./HotelDetail.scss";
import { Grid, useMediaQuery } from "@mui/material";
import HotelDetails from "../../../Picture/Detail.jpg";
import { addHotel } from "../../API/api";

export const HotelDetail = () => {
  const hotelSchema = Yup.object().shape({
    hotelname: Yup.string().required("Required"),
    contact: Yup.number().required("Required"),
    registrationno: Yup.number().required("Required"),
    location: Yup.string().required("Required"),
  });
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Grid container>
      {!isMobile && (
        <Grid item xs={8}>
          <div
            style={{
              backgroundImage: `url(${HotelDetails})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh",
            }}
          />
        </Grid>
      )}
      <Grid item xs={isMobile ? 12 : 4}>
        <div className="hotel-details-container">
          <div className="form-container">
            <h1>Hotel Details</h1>
            <Formik
              initialValues={{
                hotelname: "",
                registrationno: null,
                contact: null,
                location: "",
              }}
              validationSchema={hotelSchema}
              onSubmit={async (values) => {
                await addHotel(values);
              }}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <p>Hotel Name</p>
                  <TextField
                    id="hotelname"
                    name="hotelname"
                    label="Enter your Hotel Name"
                    variant="outlined"
                    error={Boolean(errors.hotelname && touched.hotelname)}
                    helperText={
                      errors.hotelname &&
                      touched.hotelname &&
                      String(errors.hotelname)
                    }
                    onChange={(event) => {
                      setFieldValue("hotelname", event.target.value);
                    }}
                  />
                  <p>Registration Number</p>
                  <TextField
                    id="registrationno"
                    name="registrationno"
                    label="Enter your Registration Number"
                    type="registrationno"
                    variant="outlined"
                    error={Boolean(
                      errors.registrationno && touched.registrationno
                    )}
                    helperText={
                      errors.registrationno &&
                      touched.registrationno &&
                      Number(errors.registrationno)
                    }
                    onChange={(event) => {
                      setFieldValue("registrationno", event.target.value);
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
                  <p>Location</p>
                  <TextField
                    id="location"
                    name="location"
                    label="Enter your location"
                    variant="outlined"
                    error={Boolean(errors.location && touched.location)}
                    helperText={
                      errors.location &&
                      touched.location &&
                      String(errors.location)
                    }
                    onChange={(event) => {
                      setFieldValue("location", event.target.value);
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
