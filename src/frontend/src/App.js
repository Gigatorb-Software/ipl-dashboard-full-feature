import './App.css';
import TeamPage from './pages/TeamPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import MatchPage from './pages/MatchPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/teams/:teamName" exact>
            <TeamPage/>
          </Route>
          <Route path="/teams/:teamName/matches/:year">
            <MatchPage/>
          </Route>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
