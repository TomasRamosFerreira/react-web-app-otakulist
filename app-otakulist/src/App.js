import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Library from './pages/Library';
import Detail from './pages/Detail';
import AnimesList from './pages/AnimesList';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Nav />
      <div className="main">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/Animes" exact component={AnimesList} />
          <Route path="/Library" exact component={Library}/>
          <Route path="/Anime/:id" component={Detail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
