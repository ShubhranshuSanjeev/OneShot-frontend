import { responsiveFontSizes, createTheme } from "@material-ui/core/styles";

export default responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: '"Public Sans", sans-serif',
      subtitle1: {
        fontSize: "2rem",
        fontWeight: 700,
        color: "rgb(0, 82, 73)",
      },
      subtitle2: {
        fontSize: "1.1rem",
        fontWeight: 700,
        color: "rgb(0, 82, 73)",
      },
      h4: {
        fontSize: "1rem",
        fontWeight: 500,
        color: "#fff",
        marginTop: "5px",
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 700,
        textTransform: "uppercase",
      },
    },
  })
);
