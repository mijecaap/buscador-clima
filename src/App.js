import React, { useEffect, useState } from "react";
import theme from "./temaConfig";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header";
import Grid from "@material-ui/core/Grid";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  contenedor: {
    marginTop: theme.spacing(2),
  },
  contenedorForm: {
    backgroundColor: theme.palette.primary.dark,
    borderRadius: 10,
    padding: theme.spacing(5),
  },
}));

function App() {
  const classes = useStyles();

  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });
  const [consulta, setConsulta] = useState(false);
  const [resultado, setResultado] = useState({});
  const [paises, setPaises] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [error, setError] = useState(false);
  const [wait, setWait] = useState(false);

  const { ciudad } = busqueda;

  const consultarPaises = async () => {
    const url = "countries.json";

    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    //console.log(resultado.countries);
    setPaises(resultado.countries);
  };

  useEffect(() => {
    consultarPaises();
  }, []);

  useEffect(() => {
    const consultarApi = async () => {
      if (consulta) {
        const appId = "cb379ed5b4a1990ec28c9ad0347a6b28";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${appId}`;

        //console.log(url);

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        //console.log(resultado)

        setResultado(resultado);
        setConsulta(false);

        if (resultado.cod === "404") {
          setError(true);
        } else {
          setError(false);
        }
      }
    };
    consultarApi();
    setBusqueda({
      ciudad: "",
      pais: "",
    });
    setWait(false);
    // eslint-disable-next-line
  }, [consulta]);

  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultado" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Header titulo="Clima React App" />
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.contenedor}
        >
          <Grid
            item
            xs={10}
            container
            spacing={1}
            className={classes.contenedorForm}
          >
            <Grid item xs={12} md={6} container>
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsulta={setConsulta}
                paises={paises}
                setCiudades={setCiudades}
                ciudades={ciudades}
                wait={wait}
                setWait={setWait}
              />
            </Grid>
            <Grid item xs={12} md={6} container>
              {componente}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
