import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";
import { blue, deepOrange, grey } from "@mui/material/colors";
import { CssBaseline } from "@mui/material";

export const ColorModeContext = createContext();

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            light: grey[50],
            main: grey[900],
            dark: grey[400],
            contrastText: "#000",
          },
          secondary: {
            light: "#ff7961",
            main: "#f44336",
            dark: "#ba000d",
            contrastText: "#000",
          },
          background: {
            default: blue[500],
          },
          text: {
            primary: grey[800],
            secondary: grey[700],
          },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: grey,
            paper: deepOrange[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});

export default function CustomTheme({ children }) {
  const [mode, setMode] = useState("light");
  const colorMode = {
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    },
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline>{children}</CssBaseline>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
