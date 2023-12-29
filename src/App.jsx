import { RouterProvider } from "react-router-dom";
import router from "@/routes/router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Provider } from "react-redux";
import { store } from "@/store/store";

import GlobalStyle from "@/styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => console.error(error),
    },
    mutations: {
      onError: (error) => console.error(error),
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}
