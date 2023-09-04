import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import "./BusNavbar.scss";
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
import { Link, useLocation } from "react-router-dom";

export const BusNavbar = () => {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [anchorEl, setAnchorEl] = React.useState(null);
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
                      <Link to="/bus-dashboard" className="navbar-link">
                        {" "}
                        Home{" "}
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      {" "}
                      <Link to="/bus/add-buses" className="navbar-link">
                        {" "}
                        Add Buses{" "}
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Bus Bookings</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <h6
                    className={
                      location.pathname === "/bus-dashboard" ? "active-tab" : ""
                    }
                  >
                    <Link to="/bus-dashboard" className="navbar-link">
                      {" "}
                      Home{" "}
                    </Link>
                  </h6>
                  <h6
                    className={
                      location.pathname === "/bus/add-buses" ? "active-tab" : ""
                    }
                  >
                    <Link to="/bus/add-buses" className="navbar-link">
                      {" "}
                      Add Buses{" "}
                    </Link>
                  </h6>
                  <h6>Bus Bookings</h6>
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
