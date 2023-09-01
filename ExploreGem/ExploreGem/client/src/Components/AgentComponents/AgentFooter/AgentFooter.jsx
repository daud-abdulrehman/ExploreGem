import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import "./AgentFooter.scss";

export const AgentFooter = () => (
  <Box sx={{ flexGrow: 1 }}>
    <div className="page-content">{/* Your page content here */}</div>
    <AppBar position="static" className="mui-navbar"></AppBar>
  </Box>
);
