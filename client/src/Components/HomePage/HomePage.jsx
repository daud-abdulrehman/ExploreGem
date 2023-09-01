import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./HomePage.scss";
import HomePageBackground from "./HomePageBackground.jpg";

export const HomePage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${HomePageBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="WebsiteName">
        <h1>Explore Gem</h1>
      </div>
      <div className="parent">
        <div className="CenterText">
          <h2>Your Imagination is Your Own Limit</h2>
        </div>
      </div>
      <div className="AboutText">
        <p>
          ExploreGem is a travel companion that offers tailored bus and hotel
          booking solutions to match your budget preferences. With a simple and
          intuitive interface, you can explore a wide range of options and find
          the perfect fit for your travel needs. Whether you’re traveling solo,
          with family, or for business, ExploreGem aims to make your travel
          dreams a reality with seamless booking experiences and value-driven
          choices. Your journey, your budget - let’s make it memorable together.
        </p>
      </div>
      <div className="button-parent">
        <Button
          variant="contained"
          color="success"
          component={Link}
          to="/login"
        >
          Login
        </Button>
      </div>
    </div>
  );
};
