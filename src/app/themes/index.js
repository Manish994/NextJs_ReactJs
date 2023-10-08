"use client";
import { createTheme } from "@mui/material/styles";

// assets

import colors from "@/app/assets/scss/_themes-vars.module.scss";
// project imports
import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./palette";
import themeTypography from "./typography";

export const theme = () => {
  const color = colors;

  const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
  };

  const themeOptions = {
    direction: "ltr",
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: "48px",
        padding: "16px",
        "@media (min-width: 600px)": {
          minHeight: "48px",
        },
      },
    },
    typography: themeTypography(themeOption),
  };

  // Create and return the theme object
  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes; // Return the theme object
};

export default theme;
