import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Grid,
  useMediaQuery,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import BookmarkAddSharpIcon from "@mui/icons-material/BookmarkAddSharp";
import "./TravelerAccomadation.scss";
import Footer from "../../Footer/Footer";
import TravelerNavBar from "../TravelerNavBar/TravelerNavBar";
import { TravellerAccomadation } from "../../API/api";
import { useAuth } from "../../AuthContext/AuthContext";
import { RoomBook } from "../../API/api";

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
              <Grid container spacing={2} className="card-grid">
                {results.map((room) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={room._id}
                    className="card-border"
                  >
                    <Card className="card-item">
                      <CardMedia
                        component="img"
                        alt=""
                        height="200"
                        className="card-image"
                        image={room.image}
                      />
                      <CardContent className="card-content">
                        <div>
                          <Typography
                            variant="h6"
                            component="div"
                            className="card-text"
                          >
                            {room.description}
                          </Typography>
                          <Typography variant="body2" className="card-text">
                            Bed Type: {room.bedtype}
                          </Typography>
                          <Typography variant="body2" className="card-text">
                            Price: Rs.{room.price}
                          </Typography>
                        </div>
                        <div>
                          <IconButton
                            aria-label="Book Room"
                            className="bookroom-icon"
                            onClick={() =>
                              handleBookmarkClick(room._id, loginType)
                            }
                          >
                            <BookmarkAddSharpIcon />
                          </IconButton>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </div>
      </Grid>
      <Footer />
    </>
  );
};
const handleBookmarkClick = async (roomId, loginType) => {
  try {
    // Call your API function here
    const response = await RoomBook(roomId, loginType);
    if (response.error) {
      console.error("Error:", response.error);
    } else {
      // Do something with the response
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
