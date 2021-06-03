import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
  },
}));

const Header = ({titulo}) => {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6">{titulo}</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.offset}></div>
    </header>
  );
};

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
};

export default Header;
