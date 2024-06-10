import { createTheme } from '@mui/material/styles';

// Importa tus datos de tema desde ProcontactCx.json
import themeData from './ProcontactCx.json';

// Define una función para convertir los datos en un objeto de tema compatible
const createCustomTheme = () => {
  const {
    coreColors,
    extendedColors,
    palettes,
    schemes,
    seed,
    description
  } = themeData;

  const theme = createTheme({
    palette: {
      primary: {
        main: coreColors.primary
      },
      secondary: {
        main: coreColors.secondary
      },
      // Puedes agregar otras propiedades de la paleta aquí
    },
    // Puedes agregar otras opciones de tema aquí
  });

  return theme;
};

export default createCustomTheme;
