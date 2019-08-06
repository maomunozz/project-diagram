import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const SignedOutLinks = () => {
  return (
    <>
      <Button color="inherit" component={Link} to="/">
        Home
      </Button>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
      <Button color="inherit" component={Link} to="/signup">
        Signup
      </Button>
    </>
  );
};

export default SignedOutLinks;
