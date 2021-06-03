import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import SearchIcon from "@material-ui/icons/Search";
import CheckIcon from "@material-ui/icons/Check";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";
import Error from "./Error";
import Backdrop from "@material-ui/core/Backdrop";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  input: {
    margin: theme.spacing(2),
    minWidth: "60%",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Formulario = ({
  busqueda,
  setBusqueda,
  setConsulta,
  paises,
  setCiudades,
  ciudades,
  wait,
  setWait
}) => {
  const classes = useStyles();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const timer = React.useRef();

  const { ciudad, pais } = busqueda;

  React.useEffect(() => {
    if (pais !== "") {
      if (!backdrop) {
        setBackdrop(true);
        timer.current = window.setTimeout(() => {
          setBackdrop(false);
        }, 2000);
      }
      const consultarCiudades = async () => {
        //setCiudades();
        const url = "states.json";

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        //console.log(resultado.states);
        var cityT = [];
        for (var i = 0; i < resultado.states.length; i++) {
          if (resultado.states[i].id_country === pais) {
            cityT.push(resultado.states[i]);
            //console.log(cityT);
            // eslint-disable-next-line
            //setCiudades((ciudades) => [...ciudades, resultado.states[i]]);
          }
        }
        setCiudades(cityT);
      };
      consultarCiudades();
      setWait(true);
    }
    // eslint-disable-next-line
  }, [pais]);

  const handleChange = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      //Cargando
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        //Listo
        setSuccess(true);
        setLoading(false);
        //Validaciones
        if (ciudad.trim() === "") {
          setError(true);
          return;
        }
        setError(false);
        setConsulta(true);
      }, 1000);
    }
    //Regresar a icono de búsqueda y limpiar error
    timer.current = window.setTimeout(() => {
      setSuccess(false);
      setLoading(false);
      setError(false);
    }, 4000);
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      alignContent="center"
      wrap="nowrap"
    >
      {error ? <Error mensaje="Ambos campos son obligatoriios" /> : null}
      {JSON.stringify(paises) === "{}" ? (
        <CircularProgress />
      ) : (
        <>
          <TextField
            id="pais"
            name="pais"
            label="País"
            select
            defaultValue=""
            className={classes.input}
            color="secondary"
            value={pais}
            onChange={handleChange}
          >
            {paises.map((paises, index) => (
              <MenuItem key={index} value={paises.id}>
                {paises.name}
              </MenuItem>
            ))}
          </TextField>
          {wait ? (
            <TextField
              id="ciudad"
              name="ciudad"
              label="Ciudad"
              select
              defaultValue=""
              className={classes.input}
              color="secondary"
              value={ciudad !== "" ? ciudad : ''}
              onChange={handleChange}
            >
              {ciudades.map((ciudades, index) => (
                <MenuItem key={index} value={ciudades.name + ""}>
                  {ciudades.name}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              id="ciudad"
              name="ciudad"
              label="Ciudad"
              select
              defaultValue=""
              className={classes.input}
              color="secondary"
              value={ciudad}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
            </TextField>
          )}
          <div className={classes.wrapper}>
            <Fab
              color="primary"
              aria-label="Buscar"
              className={buttonClassname}
              onClick={handleButtonClick}
            >
              {success ? <CheckIcon /> : <SearchIcon />}
            </Fab>
            {loading && (
              <CircularProgress size={68} className={classes.fabProgress} />
            )}
          </div>
        </>
      )}
      <Backdrop className={classes.backdrop} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
};

Formulario.propTypes = {
  busqueda: PropTypes.object.isRequired,
  setBusqueda: PropTypes.func.isRequired,
  setConsulta: PropTypes.func.isRequired,
  paises: PropTypes.array.isRequired,
  setCiudades: PropTypes.func.isRequired,
  ciudades: PropTypes.array.isRequired,
  wait: PropTypes.bool.isRequired,
  setWait: PropTypes.func.isRequired,
};

export default Formulario;
