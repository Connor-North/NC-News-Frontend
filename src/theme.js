import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
    primary: {
      main: "#6366f1",
    },
    secondary: {
      main: "#f59e0b",
    },
    text: {
      primary: "#1f2937",
      secondary: "#6b7280",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    fontSize: 14,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    body1: { lineHeight: 1.6 },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
