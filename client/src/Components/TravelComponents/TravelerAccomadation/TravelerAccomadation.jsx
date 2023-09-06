import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Grid,
  useMediaQuery,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import "./TravelerAccomadation.scss";
import Footer from "../../Footer/Footer";
import TravelerNavBar from "../TravelerNavBar/TravelerNavBar";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { TravellerAccomadation } from "../../API/api";
import { useAuth } from "../../AuthContext/AuthContext";

export const TravelerAccomadation = () => {
  const [results, setResults] = useState(null);
  const { loginType } = useAuth();
  const traveleraccomadationSchema = Yup.object().shape({
    destinationcity: Yup.string().required("Required"),
    staybudget: Yup.number().required("Required"),
    bedtype: Yup.string(),
  });
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <TravelerNavBar />
      {!results ? (
        <>
          <h1 className="main-heading">Enter Your Accomadation Plan</h1>
        </>
      ) : (
        <>
          <h1 className="main-heading">Desired Results</h1>
        </>
      )}

      <Grid item xs={isMobile ? 12 : 4}>
        <div className="traveler-accomadation-container">
          {!results && (
            <div className="form-container">
              <Formik
                initialValues={{
                  destinationcity: "",
                  staybudget: "",
                  bedtype: "both",
                }}
                validationSchema={traveleraccomadationSchema}
                onSubmit={async (values) => {
                  const data = await TravellerAccomadation(loginType, values);
                  setResults(data.rooms);
                }}
              >
                {({ errors, touched, setFieldValue, values }) => (
                  <Form className="form">
                    <div className="form-row">
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
                        id="staybudget"
                        name="staybudget"
                        label="Enter your Stay Budget"
                        variant="outlined"
                        error={Boolean(errors.staybudget && touched.staybudget)}
                        helperText={
                          errors.staybudget &&
                          touched.staybudget &&
                          String(errors.staybudget)
                        }
                        onChange={(event) => {
                          setFieldValue("staybudget", event.target.value);
                        }}
                      />
                      <FormControl variant="outlined">
                        <InputLabel id="bedtype-label" htmlFor="bedtype">
                          Bed Type
                        </InputLabel>
                        <Select
                          labelId="bedtype-label"
                          id="bedtype"
                          name="bedtype"
                          label="Bed Type"
                          value={values.bedtype}
                          onChange={(event) => {
                            setFieldValue("bedtype", event.target.value);
                          }}
                        >
                          <MenuItem value={"single"}>Single Bed</MenuItem>
                          <MenuItem value={"double"}>Double Bed</MenuItem>
                        </Select>
                      </FormControl>
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
              <h2>Available Rooms:</h2>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Bed Type</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Image</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((room) => (
                    <TableRow key={room._id}>
                      <TableCell>{room.description}</TableCell>
                      <TableCell>{room.bedtype}</TableCell>
                      <TableCell>Rs.{room.price}</TableCell>
                      <TableCell>
                        <img src={room.image} alt="" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </div>
      </Grid>
      <Footer />
    </>
  );
};
