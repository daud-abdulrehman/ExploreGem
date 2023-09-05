import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import "./HotelNavbar.scss";
import {
  Button,
  Grid,
  useMediaQuery,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, Link } from "react-router-dom";

export const HotelNavbar = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();

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
          <AppBar position="static" className="mui-navbar">
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
                      <Link to="/hotel-dashboard" className="navbar-link">
                        {" "}
                        Home{" "}
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link to="/hotel/add-rooms" className="navbar-link">
                        {" "}
                        Add Rooms{" "}
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Booked Rooms</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <h6
                    className={
                      location.pathname === "/hotel-dashboard"
                        ? "active-tab"
                        : ""
                    }
                  >
                    <Link to="/hotel-dashboard" className="navbar-link">
                      {" "}
                      Home{" "}
                    </Link>
                  </h6>
                  <h6
                    className={
                      location.pathname === "/hotel/add-rooms"
                        ? "active-tab"
                        : ""
                    }
                  >
                    <Link to="/hotel/add-rooms" className="navbar-link">
                      {" "}
                      Add Rooms{" "}
                    </Link>
                  </h6>
                  <h6>Room Bookings</h6>
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
};
