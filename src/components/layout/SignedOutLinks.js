import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const SignedOutLinks = () => {
  return (
    <>
      <Button color="inherit" component={Link} to="/login">
        Iniciar Sesión
      </Button>
      <Button color="inherit" component={Link} to="/signup">
        Registrate
      </Button>
    </>
  );
};

export default SignedOutLinks;
