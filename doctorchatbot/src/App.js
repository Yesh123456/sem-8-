import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './components/Home';
import Consult from './components/Consult';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/consult" component={Consult} />
      </Switch>
    </Router>
  );
}

export default App;
