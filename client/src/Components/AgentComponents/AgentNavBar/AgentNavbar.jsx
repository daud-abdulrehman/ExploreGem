import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import "./AgentNavbar.scss";
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
//import { AddPlans } from "../AddPlans/AddPlans";
import { Link, useLocation } from "react-router-dom";

export const AgentNavbar = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const location = useLocation();

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
                      <Link to="/agent-dashboard" className="navbar-link">
                        {" "}
                        Home{" "}
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link to="/agent/add-plans" className="navbar-link">
                        {" "}
                        Add Plans{" "}
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      Signed Up Customers
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <h6
                    className={
                      location.pathname === "/agent-dashboard"
                        ? "active-tab"
                        : ""
                    }
                  >
                    <Link to="/agent-dashboard" className="navbar-link">
                      {" "}
                      Home{" "}
                    </Link>
                  </h6>
                  <h6
                    className={
                      location.pathname === "/agent/add-plans"
                        ? "active-tab"
                        : ""
                    }
                  >
                    <Link to="/agent/add-plans" className="navbar-link">
                      {" "}
                      Add Plans{" "}
                    </Link>
                  </h6>
                  <h6>Signed Up Customers</h6>
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
