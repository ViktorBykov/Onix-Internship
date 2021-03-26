import React from 'react';

import Header from '../header/Header';
import Pokemons from '../pokemons/Pokemons';


import './App.css';


class App extends React.Component {
    constructor(){
        super();
        this.state = {
        }
    }

    render(){
        return(
            <div className="App">
                <Header />
                <Pokemons />
            </div>
        );
    }
}

export default App;
