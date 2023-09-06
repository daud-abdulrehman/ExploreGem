import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Grid, Button, TextField, MenuItem } from "@mui/material";
import { AddRooms } from "../../API/api";
import { useAuth } from "../../AuthContext/AuthContext";
import "./AddRoom.scss";
import { HotelNavbar } from "../HotelNavBar/HotelNavbar";
import Footer from "../../Footer/Footer";

export const AddRoom = () => {
  const { loginType } = useAuth();
  const [imageFile, setImageFile] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(URL.createObjectURL(file));
    }
  };
  const addRoomSchema = Yup.object().shape({
    description: Yup.string().required("Required"),
    bedtype: Yup.string().required("Required"),
    price: Yup.number().required("Required"),
    image: Yup.mixed().required("Required"),
  });
  return (
    <>
      <Grid container className="add-room-page">
        <HotelNavbar />
        <div className="addRoom">
          <h1>Add Room</h1>
          <Formik
            initialValues={{
              description: "",
              bedtype: "",
              price: null,
              image: null,
            }}
            validationSchema={addRoomSchema}
            onSubmit={async (values) => {
              await AddRooms(values, imageFile, loginType);
            }}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <div className="form-container">
                <Form>
                  <Grid container className="grid-container">
                    <Grid item xs={12} md={4}>
                      <div className="form-field">
                        <p>Description</p>
                        <TextField
                          id="description"
                          name="description"
                          label="Enter Room Description"
                          variant="outlined"
                          multiline
                          maxRows={4}
                          error={Boolean(
                            errors.description && touched.description
                          )}
                          helperText={
                            errors.description &&
                            touched.description &&
                            String(errors.description)
                          }
                          onChange={(event) => {
                            setFieldValue("description", event.target.value);
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className="form-field">
                        <p>Bed Type</p>
                        <TextField
                          id="bedtype"
                          name="bedtype"
                          label="Bed Type"
                          select
                          variant="outlined"
                          fullWidth
                          value={values.bedtype} // Use values.bedtype
                          error={Boolean(errors.bedtype && touched.bedtype)}
                          helperText={
                            errors.bedtype &&
                            touched.bedtype &&
                            String(errors.bedtype)
                          }
                          onChange={(event) => {
                            setFieldValue("bedtype", event.target.value);
                          }}
                        >
                          <MenuItem value={"single"}>Single Bed</MenuItem>
                          <MenuItem value={"double"}>Double Bed</MenuItem>
                        </TextField>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className="form-field">
                        <p>Price Per Night</p>
                        <TextField
                          id="price"
                          name="price"
                          label="Enter Room Price"
                          variant="outlined"
                          error={Boolean(errors.price && touched.price)}
                          helperText={
                            errors.price &&
                            touched.price &&
                            String(errors.price)
                          }
                          onChange={(event) => {
                            setFieldValue("price", event.target.value);
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
