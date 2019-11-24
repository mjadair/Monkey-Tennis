import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Navbar from './components/Navbar'

import Home from './components/Home'
import Tracks from './components/Tracks'
import SearchBar from './components//SearchBar'
import SelectedArtist from './components/SelectedArtist'
import SelectedAlbum from './components/SelectedAlbum'

import 'bulma'
import './styles/style.scss'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/Home" component={Home} />
      <Route exact path="/Charts" component={Tracks} />
      <Route exact path="/search/:userInput" component={SearchBar} />
      <Route exact path="/:id/album" component={SelectedArtist} />
      <Route exact path="/:id/tracks" component={SelectedAlbum} />
      <Route path="" component={Home} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)