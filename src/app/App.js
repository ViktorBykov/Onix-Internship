import React from 'react';

import Header from '../header/Header';
import Content from '../content/Content';
import Footer from '../footer/Footer';

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
                <Content />
                <Footer />
            </div>
        );
    }
}

export default App;
