import React, { Component } from 'react';

import Navbar from './containers/NavBar/NavBar'
import UserContainer from './containers/UserContainer/UserContainer';
import AllCoinList from './containers/CoinListContainer/CoinContainer';


class App extends Component {

  render() {
    return (
      <div>
        <Navbar />
        <UserContainer />
        <AllCoinList />
      </div>
    );
  }
}

export default App;

