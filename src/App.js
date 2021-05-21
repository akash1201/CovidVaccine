import './App.css';
import history from './history';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./components/Home"
import CenterList from "./components/CenterList"

function App() {


  return (
     <Router history={history}>
       <Switch>
       <Route path="/" component={Home} exact/>
       <Route path="/CenterList" component={CenterList} exact/>
       </Switch>
     </Router>
  );
}

export default App;
