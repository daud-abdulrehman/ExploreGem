import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import "./BusDetail.scss";
import { Grid, useMediaQuery } from "@mui/material";
import BusDetails from "../../../Picture/Detail.jpg";
import { addBusCompany } from "../../API/api";
import { useNavigate } from "react-router-dom";

export const BusDetail = () => {
  const buscompanySchema = Yup.object().shape({
    companyname: Yup.string().required("Required"),
    contact: Yup.number().required("Required"),
    liscenceno: Yup.number().required("Required"),
  });
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  return (
    <Grid container>
      {!isMobile && (
        <Grid item xs={8}>
          <div
            style={{
              backgroundImage: `url(${BusDetails})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh",
            }}
          />
        </Grid>
      )}
      <Grid item xs={isMobile ? 12 : 4}>
        <div className="bus-details-container">
          <div className="form-container">
            <h1>Bus Company Details</h1>
            <Formik
              initialValues={{
                companyname: "",
                contact: null,
                liscenceno: null,
              }}
              validationSchema={buscompanySchema}
              onSubmit={async (values) => {
                const response = await addBusCompany(values);
                if (response) {
                  navigate("/bus-dashboard");
                }
              }}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <p>Company Name</p>
                  <TextField
                    id="companyname"
                    name="companyname"
                    label="Enter your company name"
                    variant="outlined"
                    error={Boolean(errors.companyname && touched.companyname)}
                    helperText={
                      errors.companyname &&
                      touched.companyname &&
                      String(errors.companyname)
                    }
                    onChange={(event) => {
                      setFieldValue("companyname", event.target.value);
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
                  <p>License Number</p>
                  <TextField
                    id="liscenceno"
                    name="liscenceno"
                    label="Enter your License Number"
                    type="liscenceno"
                    variant="outlined"
                    error={Boolean(errors.liscenceno && touched.liscenceno)}
                    helperText={
                      errors.liscenceno &&
                      touched.liscenceno &&
                      Number(errors.liscenceno)
                    }
                    onChange={(event) => {
                      setFieldValue("liscenceno", event.target.value);
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
