import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyle = makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    padding: theme.spacing(3),
    borderRadius: 10,
  },
  text: {
    margin: theme.spacing(1),
  },
}));

const Clima = ({ resultado }) => {
  const classes = useStyle();

  const { name, main } = resultado;

  if (!name) return null;

  const kelvin = 273.15;

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      alignContent="center"
      wrap="nowrap"
    >
      <Grid className={classes.container}>
        <Typography
          variant="h5"
          color="primary"
          align="center"
          className={classes.text}
        >
          El clima de {name} es:{" "}
        </Typography>
        <Typography
          variant="h4"
          color="primary"
          align="center"
          className={classes.text}
        >
          {parseFloat(main.temp - kelvin, 10).toFixed(2)} &#x2103;
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          align="center"
          className={classes.text}
        >
          La temperatura máxima es{" "}
          {parseFloat(main.temp_max - kelvin, 10).toFixed(2)} &#x2103;
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          align="center"
          className={classes.text}
        >
          La temperatura mínima es{" "}
          {parseFloat(main.temp_min - kelvin, 10).toFixed(2)} &#x2103;
        </Typography>
      </Grid>
    </Grid>
  );
};

Clima.propTypes = {
  resultado: PropTypes.object.isRequired,
};

export default Clima;
