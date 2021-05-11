import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Library from './pages/Library';
import Detail from './pages/Detail';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Nav />
      <div className="container">  
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/Library" exact component={Library}/>
          <Route path="/Anime/:id" component={Detail} />
        </Switch>
        <h1>U</h1>
      </div>
    </Router>
  );
}

export default App;
