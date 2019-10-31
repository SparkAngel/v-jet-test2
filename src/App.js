import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage';
import startMovies from './components/startMovies';
import Home from './components/Home';
import aboutMovie from './components/aboutMovie';
import Buy from './components/buy';
import './App.css';

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/" exact component={Home} />
      <Route
        path="/movies"
        exact
        component={startMovies}
      />
      <Route path="/movies/:moviesId" exact component={aboutMovie} />
      <Route path="/buy/:moviesId" exact component={Buy} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
