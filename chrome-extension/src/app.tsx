import React from "react";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import AppShell from "./components/app-shell";
import Home from "./pages/home";
import CompetitionList from "./pages/competition-list";
import WatchList from './pages/watch-list';
import DataProvider from "./providers/data-provider";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  spacing: [0, 4, 8, 16, 32],
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router initialEntries={["/"]}>
        <Switch>
          <DataProvider>
            <AppShell>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/competition-list">
                <CompetitionList />
              </Route>
              <Route path="/watch-list">
                <WatchList />
              </Route>
            </AppShell>
          </DataProvider>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
