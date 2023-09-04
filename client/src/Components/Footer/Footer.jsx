import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GoogleIcon from "@mui/icons-material/Google";
import Divider from "@mui/material/Divider";

import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Stack direction="row" justifyContent="center">
          <IconButton className="icon-button" href="#" role="button">
            <FacebookIcon />
          </IconButton>
          <IconButton className="icon-button" href="#" role="button">
            <TwitterIcon />
          </IconButton>
          <IconButton className="icon-button" href="#" role="button">
            <GoogleIcon />
          </IconButton>
          <IconButton className="icon-button" href="#" role="button">
            <InstagramIcon />
          </IconButton>
          <IconButton className="icon-button" href="#" role="button">
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Container>

      <Divider sx={{ my: 3 }} />

      <div className="copyright">
        <Typography variant="h6" color="textSecondary">
          ExploreGem © 2023 Copyright:
        </Typography>
      </div>
    </footer>
  );
}
