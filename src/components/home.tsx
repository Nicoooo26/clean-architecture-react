import { Checkbox } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Importa useTheme para acceder al tema

const Home = () => {
  const theme = useTheme(); // Usa useTheme para acceder al tema

  return (
    <>
      {/* Usa el color secundario del tema para el texto */}
      <p style={{ color: theme.palette.secondary.main }}>
        Soy el componente HOME
      </p>
      {/* Usa el color secundario del tema para el Checkbox */}
      <Checkbox style={{ color: theme.palette.secondary.main }} />
    </>
  );
};

export default Home;
