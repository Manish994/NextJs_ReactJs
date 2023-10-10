"use client";
import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// defaultTheme
import themes from "@/themes/index";

// project imports
import NavigationScroll from "@/layout/NavigationScroll";

// ==============================|| APP ||============================== //

const App = ({ children }) => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll> {children} </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
