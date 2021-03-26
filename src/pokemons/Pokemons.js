import React from 'react';

import PokemonComparator from '../pokemonComparator/PokemonComparator';
import PokemonCard from '../pokemonCard/PokemonCard';
import './Pokemons.css';

class Pokemons extends React.Component {
    constructor() {
        super();
        this.state = {
            subTitle: "Pokemon Comparator",
            pokemonInputText: 'Введіть ID покемона:',

            placeholderCardsData: [null, null],
            isActiveCoparison: false,
            comparisonHistory: [],

            previewCardsId: Array(5).fill(null),
            previewCardsData: Array(5).fill(null),
            isActivePreviewCards: Array(5).fill(false),
            maxPreviewCount: 5,

            URL: 'https://pokeapi.co/api/v2/pokemon/',
            minPokemonId: 1,
            maxPokemonId: 899,
            
            inputValue: '',
            userInputId: '',
            isInputError: false,

            isActiveCard: false,
            isPreviewLoaded: false,
            
        };
    }


    // Get pokemon data from API
    getPokemonData (id, i) {
        const { URL } = this.state;
        const { previewCardsData } = this.state;

        fetch( `${URL}${id}` )
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
                    previewCardsData[i] = data;
                    this.setState({
                        previewCardsData,
                        isLoaded: true,
                        isError: false,
                    });
                }
            });
    }

    // get 5 pokemon cards in preview
    getPokemonList () {
        const { maxPreviewCount } = this.state;
        let previewCardsData = [];

            let id = this.state.userInputId; 

            for (let i = 0; i < maxPreviewCount; i++){
                if ( id > this.state.maxPokemonId ) {
                    id = 1;
                } 
                this.getPokemonData(id, i)        
                id++
            }

            this.setState({
                previewCardsData: previewCardsData,
                isPreviewLoaded : true,
            });
    }

    componentDidMount() {
        document.addEventListener('keydown', this.hotKeys);
        this.getPokemonData();
    }

    // Hot keys to activate card
    hotKeys = (e) => {
        if(this.state.isPreviewLoaded){
                switch (e.keyCode) {
                    case 49:
                    case 50:
                    case 51:
                    case 52:
                    case 53:
                        this.onClick(e.key-1)
                        break;
                    default:
                        console.log('Hotkey error');
                        break;
                }
            }
        }

    // Get random pokemon ID
    getRandomPokemonId = () => {
        const min = this.state.minPokemonId;
        const max = this.state.maxPokemonId;

        const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
        this.setState({userInputId : randomId}, () => {this.getPokemonList()});
        this.setState({isInputError : false})
    }

    // Get pokemon ID from user input
    getUserInput = (e) => {
        if (this.isValidInput(e)) {
            this.setState({userInputId : e.target.value}, () => {this.getPokemonList()});
            this.setState({isInputError : false})
        } else {
            this.setState({isInputError : true})
        }
    }

    // Toggle active card by click
    onClick = (i) => {
        let {isActivePreviewCards} = this.state;
        // deactivate the card if it is active
        if (isActivePreviewCards[i]) {
            isActivePreviewCards[i] = true;
            isActivePreviewCards = isActivePreviewCards.map((item, index) => {
                return false;
            });
            this.setState({isActiveCard : false})
        // check for another active card 
        } else {
            // activate current card and deactivate other
            isActivePreviewCards = isActivePreviewCards.map((item, index) => {
                return index === i ? true : false;
            });
            this.setState({isActiveCard : true})
        }
        this.setState({ isActivePreviewCards });
    }

    // Error message on wrong user input
    errorMessage() {
        return <span className="error_message">{this.state.errorMessage}</span>;
    }

    // check is user input is correct
    isValidInput(e){
        return  e && 
                e.target.value !== '' && 
                e.target.value >= this.state.minPokemonId && 
                e.target.value <= this.state.maxPokemonId
    }

    // define placeholder class name 
    getPlaceholderClassName (index){
        if (this.state.isActiveCard === true && this.state.placeholderCardsData[index] === null){
            return 'pokemon_card_placeholder active'
        } else {
            return 'pokemon_card_placeholder'
        }
    }

    // put the card in placeholder
    placeCard (index) {
        if (this.state.placeholderCardsData[index] === null && this.state.isActiveCard === true){
            let {isActivePreviewCards, placeholderCardsData, previewCardsData} = this.state;
            let activeCartIndex = isActivePreviewCards.findIndex( item => item);
            placeholderCardsData[index] = previewCardsData[activeCartIndex];
            this.setState({placeholderCardsData});

            isActivePreviewCards = isActivePreviewCards.map((item, index) => {
                return false;
            });
            this.setState({isActiveCard : false})
            this.setState({isActivePreviewCards})

            if (placeholderCardsData[0] != null && placeholderCardsData[1] != null){
                this.setState({isActiveCoparison : true})
            }
        }
    }
    
    // remove card from placeholder
    removeCard (index) {
        const {placeholderCardsData} = this.state;
        placeholderCardsData[index] = null;
        this.setState({placeholderCardsData});
    }

    render() {
        const { subTitle, isInputError, pokemonInputText, isActiveCoparison } = this.state;

        return (
            <div>
                <h4 className="mt100 mb20">{subTitle}</h4>
                <div className="comporator__wrapper">
                    <div className="comporator__content">

                        <div className="pokemon_card_placeholder_wrapper">
                            <div className="pokemon_result__status_wrapper win">
                                <span className="pokemon_result__status"></span>
                                <span className="pokemon_result__score"></span>
                            </div>
                            <div className={this.getPlaceholderClassName(0)} onClick={() => this.placeCard(0)}>
                                {this.state.placeholderCardsData[0]==null ? false : <PokemonCard data={this.state.placeholderCardsData[0]} /> }
                            </div>
                        </div>
                        <div className="pokemon_stat_wrapper">
                           { isActiveCoparison && <PokemonComparator data={this.state.placeholderCardsData}/>}
                        </div>
                        <div className="pokemon_card_placeholder_wrapper">
                            <div className="pokemon_result__status_wrapper win">
                                <span className="pokemon_result__status"></span>
                                <span className="pokemon_result__score"></span>
                            </div>
                            <div className={this.getPlaceholderClassName(1)} onClick={() => this.placeCard(1)}>
                                {this.state.placeholderCardsData[1]==null ? false : <PokemonCard data={this.state.placeholderCardsData[1]} /> }
                            </div>
                        </div>
                    </div>
                    
                    <div className="pokemons_list">
                        <div className="input_wrapper">
                            <p className="mr25">{pokemonInputText}</p> 
                            <input onChange={this.getUserInput} 
                                   name="id_name" 
                                   className={isInputError ? 'error' : null}/>
                            {isInputError && this.errorMessage()} 
                            <button className="ml25" onClick={this.getRandomPokemonId}>Get random ID</button>
                        </div>

                        {/* Render preview pokemon cards */}
                        {this.state.isPreviewLoaded && this.state.previewCardsData.map((item, index) => (
                            item == null ? false : <PokemonCard key={index}
                                                                id={index}
                                                                isActive={this.state.isActivePreviewCards[index]} 
                                                                onClick={() => this.onClick(index)}
                                                                data={this.state.previewCardsData[index]}/>
                        ))}

                    </div>

                </div>
            </div>
        );
    }
}

export default Pokemons;
