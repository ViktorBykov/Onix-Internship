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

    pokemonNotFound() {
        console.log('not found, check your input');
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

    // Get new pokemon by user input
    getNewPokemon = (e) => {
        this.setState({ currentPokemon: e.target.value });
        if (e.target.value !== '') {

            fetch(`https://pokeapi.co/api/v2/pokemon/${e.target.value}`)
                .then((response) => {
                    if (response.ok) {

                        return response.json();
                    }
                })
                .then((data) => {
                    if (data === undefined) {
                        this.pokemonNotFound();
                    } else {
                        this.setState({
                            pokemonData: data,
                            isLoaded: true,
                        });
                        this.parsImages();
                    }
                });
        }
    }

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon/89')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    pokemonData: data,
                    // pokemonImages: data.sprites,
                    isLoaded: true,
                });
                this.parsImages();
            });
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
                            <input onChange={this.getNewPokemon} name="id_name" />
                            {/* <button onClick={this.getPokemon}>Go!</button> */}
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
