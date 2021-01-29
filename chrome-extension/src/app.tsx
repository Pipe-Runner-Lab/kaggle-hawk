import React from "react";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import AppShell from "./components/app-shell";
import Home from './pages/home'

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  spacing: [0,4,8,16,32],
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router initialEntries={["/"]}>
        <Switch>
          <AppShell>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/list">
              <div>list</div>
            </Route>
            <Route path="competition">
              <Route path="/kaggle">
                <h3>Kaggle</h3>
              </Route>
            </Route>
            <Route path="*">
              <h3>404</h3>
            </Route>
          </AppShell>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
