import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import AppShell from "./components/app-shell";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  spacing: [0,4,8,16,32],
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <AppShell>
            <Route exact path="/">
              <div>Page 1</div>
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
              <div>404 path</div>
            </Route>
          </AppShell>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
