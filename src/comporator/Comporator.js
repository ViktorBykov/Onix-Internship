import React from 'react';

import './Comporator.css';

class Comporator extends React.Component {
    constructor() {
        super();
        this.state = {
            subTitle: "Pokemon Comporator",
            currentPokemon: 0,
            pokemonData: [],
            pokemonParsedImages: [],
            pokemonCurrentImage: 0,
            isLoaded: false,
            error: false,
        };
    }


    // Get pokemon stat
    getPokemonStats() {
        if (this.state.isLoaded) {
            return this.state.pokemonData.stats.map((statItem, index) => (
                <li key={index}>
                    <span className="stat_name">{statItem.stat.name}</span>
                    <span className="stat_data">{statItem.base_stat}</span>
                </li>
            ));
        }
    }


    // Get active pokemon image
    getPokemonImg() {
        if (this.state.isLoaded) {
            return <img src={this.state.pokemonParsedImages[this.state.pokemonCurrentImage]} alt="" />
        }
    }


    // Get new pokemon foto by pressing next/prev buttons
    switchFoto = (event) => {
        const direction = event.target.value;
        switch (direction) {
            case 'prev':
                if (this.state.pokemonCurrentImage !== 0) {
                    this.setState({
                        pokemonCurrentImage: this.state.pokemonCurrentImage - 1,
                    });
                }
                break;
            case 'next':
                if (this.state.pokemonCurrentImage !== this.state.pokemonParsedImages.length - 1) {
                    this.setState({
                        pokemonCurrentImage: this.state.pokemonCurrentImage + 1,
                    });
                }
                break;
        }
    }


    // Display error message
    errorMessage() {
        if (this.state.error){
           return <span className="error_message">Pokemon not found, check your input</span>;
        }
    }


    // Pars all images of current pokemon
    parsImages() {
        if (this.state.isLoaded) {
            const result = [];
            // recursive images parsing
            function parsInnerImages(obj) {
                for (const prop in obj) {
                    const value = obj[prop];
                    if (value !== undefined && value !== null) {
                        if (typeof value === 'object') {
                            parsInnerImages(value);
                        } else {
                            result.push(value);
                        }
                    }
                }
                return result;
            }

            parsInnerImages(this.state.pokemonData.sprites);

            this.setState({
                pokemonParsedImages: result,
            });

        }
    }


    // Get random pokemon on load
    getRandomPokemonId() {
        return Math.floor(Math.random() * 899);
    }


    // Get new pokemon by user input
    getPokemonData = (e) => {
        let pokemonId;
        if (e && e.target.value !== '') {
            pokemonId = e.target.value;
        } else {
            pokemonId = this.getRandomPokemonId();
        }
        this.setState({ currentPokemon: pokemonId });
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                if (data === undefined) {
                    this.setState({
                        error: true,
                    });
                } else {
                    this.setState({
                        pokemonData: data,
                        isLoaded: true,
                        error: false,
                    });
                    this.parsImages();
                }
            });
    }


    componentDidMount() {
        this.getPokemonData();
    }


    render() {
        const { subTitle } = this.state;
        const { pokemonData } = this.state;

        return (
            <div>
                <h4>{subTitle}</h4>
                <div className="comporator_content">
                    <div className="pokemon_cards__wrapper">
                        <div className="pokemon_cards__input_wrapper">
                            <p>Введіть ID або ім'я покемона:</p>
                            <input onChange={this.getPokemonData} name="id_name" />
                            {this.errorMessage()}
                        </div>
                        <div className="pokemon_card">
                            <span className="pokemon_name">{pokemonData.name}</span>
                            <div className="pokemon_card__info_wrapper">
                                <div className="pokemon_card__left_wrapper">
                                    <div className="pokemon_card__foto">
                                        {this.getPokemonImg()}
                                    </div>
                                    <div className="pokemon_card__foto_buttons">
                                        <button value='prev' onClick={this.switchFoto}>Prev</button>
                                        <button value='next' onClick={this.switchFoto}>Next</button>
                                    </div>
                                </div>
                                <div className="pokemon_card__stats">
                                    {this.getPokemonStats()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Comporator;
