import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import "./TravelerNavBar.scss";
import {
  Button,
  Grid,
  useMediaQuery,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuIcon from "@mui/icons-material/Menu";

export default function TravelerNavBar() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" className="traveler-mui-navbar">
            <Toolbar variant="dense">
              <h5>ExploreGem</h5>
              {isMobile ? (
                <>
                  <IconButton
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link to="/traveler-dashboard" className="navbar-link">
                        {" "}
                        Home{" "}
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link to="/traveler/accomodation" className="navbar-link">
                        {" "}
                        Accomodation{" "}
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link to="/traveler/bookings" className="navbar-link">
                        {" "}
                        Bookings{" "}
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link
                        to="/traveler/previoustrips"
                        className="navbar-link"
                      >
                        {" "}
                        Previous Trips{" "}
                      </Link>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <h6
                    className={
                      location.pathname === "/traveler-dashboard"
                        ? "active-tab"
                        : ""
                    }
                  >
                    <Link to="/traveler-dashboard" className="navbar-link">
                      {" "}
                      Home{" "}
                    </Link>
                  </h6>
                  <h6
                    className={
                      location.pathname === "/traveler/accomadations"
                        ? "active-tab"
                        : ""
                    }
                  >
                    <Link to="/traveler/accomadations" className="navbar-link">
                      {" "}
                      Accomadations{" "}
                    </Link>
                  </h6>
                  <h6
                    className={
                      location.pathname === "/traveler/bookings"
                        ? "active-tab"
                        : ""
                    }
                  >
                    <Link to="/traveler/bookings" className="navbar-link">
                      {" "}
                      Bookings{" "}
                    </Link>
                  </h6>
                  <h6
                    className={
                      location.pathname === "/traveler/previoustrips"
                        ? "active-tab"
                        : ""
                    }
                  >
                    <Link to="/traveler/previoustrips" className="navbar-link">
                      {" "}
                      Previous Trips{" "}
                    </Link>
                  </h6>{" "}
                </>
              )}
              <Button
                variant="standard"
                className="mui-icon"
                startIcon={<PersonOutlineIcon />}
                disableRipple
              ></Button>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
    </Grid>
  );
}
