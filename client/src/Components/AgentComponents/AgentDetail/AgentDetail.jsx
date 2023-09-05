import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import "./AgentDetail.scss";
import { Grid, useMediaQuery } from "@mui/material";
import AgentDetails from "../../../Picture/Detail.jpg";
import { addAgent } from "../../API/api";
import { useNavigate } from "react-router-dom";

export const AgentDetail = () => {
  const agentSchema = Yup.object().shape({
    agencyname: Yup.string().required("Required"),
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
              backgroundImage: `url(${AgentDetails})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh",
            }}
          />
        </Grid>
      )}
      <Grid item xs={isMobile ? 12 : 4}>
        <div className="agent-details-container">
          <div className="form-container">
            <h1>Agent Details</h1>
            <Formik
              initialValues={{
                agencyname: "",
                contact: null,
                liscenceno: null,
              }}
              validationSchema={agentSchema}
              onSubmit={async (values) => {
                const response = await addAgent(values);
                if (response) {
                  navigate("/agent-dashboard");
                }
              }}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <p>Name</p>
                  <TextField
                    id="agencyname"
                    name="agencyname"
                    label="Enter your agency name"
                    variant="outlined"
                    error={Boolean(errors.agencyname && touched.agencyname)}
                    helperText={
                      errors.agencyname &&
                      touched.agencyname &&
                      String(errors.agencyname)
                    }
                    onChange={(event) => {
                      setFieldValue("agencyname", event.target.value);
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
                    error={Boolean(errors.licenseno && touched.licenseno)}
                    helperText={
                      errors.licenseno &&
                      touched.licenseno &&
                      Number(errors.licenseno)
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
