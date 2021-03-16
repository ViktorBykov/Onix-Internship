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
            pokemonImageIndex: 0,
            isLoaded: false,
            isError: false,
            errorMessage: 'Pokemon not found, check your input',
            pokemonInputText: 'Введіть ID або ім\'я покемона:',
        };
    }


    // Get pokemon stat
    getPokemonStats() {
        return this.state.pokemonData.stats.map((statItem, index) => (
            <li key={index}>
                <span className="stat_name">{statItem.stat.name}</span>
                <span className="stat_data">{statItem.base_stat}</span>
            </li>
        ));
    }


    // Get active pokemon image
    getPokemonImg() {
        return <img src={this.state.pokemonParsedImages[this.state.pokemonImageIndex]} alt="" />
    }


    // Get new pokemon image by pressing next/prev buttons
    switchFoto = (e) => {
        const { pokemonImageIndex } = this.state;

        const direction = e.target.value;
        switch (direction) {
            // previous image
            case 'prev':
                if (pokemonImageIndex !== 0) {
                    this.setState({
                        pokemonImageIndex: this.state.pokemonImageIndex - 1,
                    });
                }
                break;
            // next image
            case 'next':
                if (pokemonImageIndex !== this.state.pokemonParsedImages.length - 1) {
                    this.setState({
                        pokemonImageIndex: this.state.pokemonImageIndex + 1,
                    });
                }
                break;
        }
    }


    // Pars all images of current pokemon
    parsImages() {
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


    // Get random pokemon on load
    getRandomPokemonId() {
        return Math.floor(Math.random() * 899);
    }


    // Show error message
    errorMessage() {
        return <span className="error_message">{this.state.errorMessage}</span>;
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
                        isError: true,
                    });
                } else {
                    this.setState({
                        pokemonData: data,
                        isLoaded: true,
                        isError: false,
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
        const { isLoaded } = this.state;
        const { isError } = this.state;
        const { pokemonInputText } = this.state;

        return (
            <div>
                <h4>{subTitle}</h4>
                <div className="comporator_content">
                    <div className="pokemon_cards__wrapper">
                        <div className="pokemon_cards__input_wrapper">
                            <p>{pokemonInputText}</p>
                            <input onChange={this.getPokemonData} name="id_name" className={isError ? 'error' : null}/>
                            {isError && this.errorMessage()}
                        </div>
                        <div className="pokemon_card">
                            <span className="pokemon_name">{pokemonData.name}</span>
                            <div className="pokemon_card__info_wrapper">
                                <div className="pokemon_card__left_wrapper">
                                    <div className="pokemon_card__foto">
                                        {isLoaded && this.getPokemonImg()}
                                    </div>
                                    <div className="pokemon_card__foto_buttons">
                                        <button value='prev' onClick={this.switchFoto}>Prev</button>
                                        <button value='next' onClick={this.switchFoto}>Next</button>
                                    </div>
                                </div>
                                <div className="pokemon_card__stats">
                                    {isLoaded && this.getPokemonStats()}
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
