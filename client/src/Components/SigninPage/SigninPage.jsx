import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./SigninPage.scss";
import { Grid, useMediaQuery } from "@mui/material";
import SigninBackground from "../../Picture/Sign.jpg";
import { GetUser } from "../API/api";
import { useAuth } from "../AuthContext/AuthContext";

export const SigninPage = () => {
  const { loginType, setIsLoggedIn, setLoginType } = useAuth();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  return (
    <Grid container>
      {!isMobile && (
        <Grid item xs={8}>
          <div
            style={{
              backgroundImage: `url(${SigninBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh",
            }}
          />
        </Grid>
      )}
      <Grid item xs={isMobile ? 12 : 4}>
        <div className="signin-container">
          <div className="form-container">
            <h1>Sign in</h1>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={async (values) => {
                const response = await GetUser(values);
                const type = response.type;
                setIsLoggedIn(true);
                setLoginType(type);
                console.log(loginType);
                if (type === "traveller") {
                  navigate("/traveller-dashboard");
                } else if (type === "agent") {
                  navigate("/agent-dashboard");
                }
                if (type === "hotel") {
                  navigate("/hotel-dashboard");
                }
                if (type === "bus") {
                  navigate("/bus-dashboard");
                }
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
                  <Button variant="contained" type="submit" color="success">
                    Login
                  </Button>
                  <p>
                    Are you new here?{" "}
                    <Link to="/signup" className="signup-link">
                      {" "}
                      Sign up{" "}
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
