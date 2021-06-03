import React from "react";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  alert: {
    marginTop: theme.spacing(2),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Error = ({ mensaje }) => {
  const classes = useStyles();

  return (
    <Alert variant="outlined" severity="error" className={classes.alert}>
      {mensaje}
    </Alert>
  );
};

Error.propTypes = {
  mensaje: PropTypes.string.isRequired,
};

export default Error;
