import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterPremium from "./pages/User/RegisterPremium";
import NotFound from "./pages/404";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/register-premium">
          <RegisterPremium />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
