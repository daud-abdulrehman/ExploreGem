import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./SignupPage.scss";
import {
  Grid,
  useMediaQuery,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
  Radio,
} from "@mui/material";
import SignupBackground from "../../Picture/Sign.jpg";
import { AddUser } from "../API/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

export const SignupPage = () => {
  const { setIsLoggedIn, setLoginType } = useAuth();
  const [value] = React.useState("");
  const signupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
    type: Yup.string().required("Please select an account type"),
  });
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  return (
    <Grid container>
      {!isMobile && (
        <Grid item xs={8}>
          <div
            style={{
              backgroundImage: `url(${SignupBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh",
            }}
          />
        </Grid>
      )}
      <Grid item xs={isMobile ? 12 : 4}>
        <div className="signup-container">
          <div className="form-container">
            <h1>Sign up</h1>
            <Formik
              initialValues={{
                email: "",
                password: "",
                type: "",
              }}
              validationSchema={signupSchema}
              onSubmit={async (values) => {
                const response = await AddUser(values);
                const type = response.type;
                setIsLoggedIn(true);
                setLoginType(type);
                if (type === "traveller") {
                  navigate("/traveller-details");
                } else if (type === "agent") {
                  navigate("/agent-details");
                }
                if (type === "hotel") {
                  navigate("/hotel-details");
                }
                if (type === "bus") {
                  navigate("/bus-details");
                }
                //console.log("Signup Successful");
              }}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <p>Email Address</p>
                  <TextField
                    id="email"
                    name="email"
                    label="Enter your email"
                    variant="outlined"
                    error={Boolean(errors.email && touched.email)}
                    helperText={
                      errors.email && touched.email && String(errors.email)
                    }
                    onChange={(event) => {
                      setFieldValue("email", event.target.value);
                    }}
                  />
                  <p>Password </p>
                  <TextField
                    id="password"
                    name="password"
                    label="Enter your password"
                    type="password"
                    variant="outlined"
                    error={Boolean(errors.password && touched.password)}
                    helperText={
                      errors.password &&
                      touched.password &&
                      String(errors.password)
                    }
                    onChange={(event) => {
                      setFieldValue("password", event.target.value);
                    }}
                  />
                  <Grid container spacing={2}>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={value.type}
                      onChange={(event) => {
                        setFieldValue("type", event.target.value);
                      }}
                      style={{ marginLeft: "20px" }}
                    >
                      <Grid item style={{ justifyContent: "space-between" }}>
                        <FormControlLabel
                          value="traveller"
                          control={<Radio />}
                          label="Traveller"
                          style={{ minWidth: "100px" }}
                        />
                        <FormControlLabel
                          value="agent"
                          control={<Radio />}
                          label="Agent"
                          style={{ minWidth: "100px" }}
                        />
                      </Grid>
                      <Grid item style={{ justifyContent: "space-between" }}>
                        <FormControlLabel
                          value="hotel"
                          control={<Radio />}
                          label="Hotel"
                          style={{ minWidth: "100px" }}
                        />
                        <FormControlLabel
                          value="bus"
                          control={<Radio />}
                          label="Bus"
                          style={{ minWidth: "100px" }}
                        />
                      </Grid>
                    </RadioGroup>
                  </Grid>
                  {errors.type && touched.type && (
                    <div style={{ color: "red" }}>{errors.type}</div>
                  )}

                  <Button variant="contained" type="submit" color="success">
                    Submit
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
