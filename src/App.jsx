import GlobalStyle from "@/styles/GlobalStyle";
import { ThemeProvider } from "styled-components";

import { theme } from "@/styles/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
    </ThemeProvider>
  );
}
