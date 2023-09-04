import React, { useState } from "react";
import { AgentNavbar } from "../AgentNavBar/AgentNavbar";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Grid, Button, TextField } from "@mui/material";
import { AddPlan } from "../../API/api";
import { useAuth } from "../../AuthContext/AuthContext";
import "./AddPlans.scss";
import Footer from "../../Footer/Footer";

export const AddPlansForm = () => {
  const { loginType } = useAuth();
  const [imageFile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImageFile(URL.createObjectURL(file));
      console.log(imageFile);
    }
  };
  // const { loginType } = useAuth();
  const addPlansSchema = Yup.object().shape({
    departurecity: Yup.string().required("Required"),
    destinationcity: Yup.string().required("Required"),
    date: Yup.date().required("Required"),
    triplength: Yup.number().required("Required"),
    visitplaces: Yup.string().required("required"),
    tripcost: Yup.number().required("Required"),
    food: Yup.string().required("Required"),
    plannedactivities: Yup.string().required("Required"),
    image: Yup.mixed().required("Required"),
  });
  return (
    <>
      <AgentNavbar />
      <Grid container>
        <div className="addPlans">
          <h1>Add Plans</h1>
          <Formik
            initialValues={{
              departurecity: "",
              destinationcity: "",
              date: null,
              triplength: null,
              visitplaces: "",
              tripcost: null,
              food: "",
              plannedactivities: "",
              image: null,
            }}
            validationSchema={addPlansSchema}
            onSubmit={async (values) => {
              const formData = new FormData();
              formData.append("departurecity", values.departurecity);
              formData.append("destinationcity", values.destinationcity);
              formData.append("date", values.date);
              formData.append("triplength", values.triplength);
              formData.append("visitplaces", values.visitplaces);
              formData.append("tripcost", values.tripcost);
              formData.append("food", values.food);
              formData.append("plannedactivities", values.plannedactivities);
              formData.append("image", imageFile);
              if (imageFile) {
                formData.append("image", imageFile);
              }
              console.log("Image", imageFile);
              const response = await AddPlan(values, imageFile, loginType);
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
                        <p>Date</p>
                        <TextField
                          id="date"
                          name="date"
                          label="Enter your Date"
                          variant="outlined"
                          type="date"
                          error={Boolean(errors.date && touched.date)}
                          helperText={
                            errors.date && touched.date && String(errors.date)
                          }
                          onChange={(event) => {
                            setFieldValue("date", event.target.value);
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className="form-field">
                        <p>Trip Length</p>
                        <TextField
                          id="triplength"
                          name="triplength"
                          label="Enter your Trip Length"
                          variant="outlined"
                          type="number"
                          error={Boolean(
                            errors.triplength && touched.triplength
                          )}
                          helperText={
                            errors.triplength &&
                            touched.triplength &&
                            String(errors.triplength)
                          }
                          onChange={(event) => {
                            setFieldValue("triplength", event.target.value);
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className="form-field">
                        <p>Visit Places</p>
                        <TextField
                          id="visitplaces"
                          name="visitplaces"
                          label="Enter your Visit Places"
                          variant="outlined"
                          error={Boolean(
                            errors.visitplaces && touched.visitplaces
                          )}
                          helperText={
                            errors.visitplaces &&
                            touched.visitplaces &&
                            String(errors.visitplaces)
                          }
                          onChange={(event) => {
                            setFieldValue("visitplaces", event.target.value);
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className="form-field">
                        <p>Trip Cost</p>
                        <TextField
                          id="tripcost"
                          name="tripcost"
                          label="Enter your Trip Cost"
                          variant="outlined"
                          type="number"
                          error={Boolean(errors.tripcost && touched.tripcost)}
                          helperText={
                            errors.tripcost &&
                            touched.tripcost &&
                            String(errors.tripcost)
                          }
                          onChange={(event) => {
                            setFieldValue("tripcost", event.target.value);
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className="form-field">
                        <p>Food</p>
                        <TextField
                          id="food"
                          name="food"
                          label="Enter your Food Preferences"
                          variant="outlined"
                          error={Boolean(errors.food && touched.food)}
                          helperText={
                            errors.food && touched.food && String(errors.food)
                          }
                          onChange={(event) => {
                            setFieldValue("food", event.target.value);
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className="form-field">
                        <p>Image</p>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }} // hide the default file input
                          onChange={(event) => {
                            setFieldValue(
                              "image",
                              event.currentTarget.files[0]
                            );
                            handleImageChange(event);
                          }}
                        />
                        <div className="image-button">
                          <Button
                            variant="text"
                            color="primary"
                            onClick={() => {
                              document.getElementById("image").click(); // trigger the file input when the button is clicked
                            }}
                          >
                            Upload Image
                          </Button>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <div className="centered">
                    <div className="form-field">
                      <p>Planned Activities</p>
                      <TextField
                        id="plannedactivities"
                        name="plannedactivities"
                        label="Enter your Planned Activities"
                        variant="outlined"
                        multiline
                        maxRows={4}
                        error={Boolean(
                          errors.plannedactivities && touched.plannedactivities
                        )}
                        helperText={
                          errors.plannedactivities &&
                          touched.plannedactivities &&
                          String(errors.plannedactivities)
                        }
                        onChange={(event) => {
                          setFieldValue(
                            "plannedactivities",
                            event.target.value
                          );
                        }}
                      />
                    </div>
                  </div>
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
