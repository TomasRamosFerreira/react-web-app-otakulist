import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Library from './pages/Library';
import Detail from './pages/Detail';
import Explore from './pages/Explore';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Nav />
      <div className="main">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/Animes" exact component={Explore} />
          <Route path="/Animes/Search/:search" component={Explore} />
          <Route path="/Animes/Category/:category" component={Explore} />
          <Route path="/Library" exact component={Library}/>
          <Route path="/Anime/:id" component={Detail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
