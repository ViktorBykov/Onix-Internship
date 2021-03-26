import React from 'react';


class PokemonCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // current card Id in preview
            cardId: null,
            // current pokemon's Id
            currentPokemonId: null,
            // all data of current pokemon
            pokemonData: [],
            // all images of current pokemon
            pokemonParsedImages: [],
            // index of first image to display in card
            currentImageIndex: 4,
            // is pokemon data allready loaded 
            isLoaded: false,
            // is we have error on load data
            isError: false,
            
        };
    }

    // Get active pokemon image
    getPokemonImg() {
        return <img src={this.state.pokemonParsedImages[this.state.currentImageIndex]} alt="" />
    }


    // Get new pokemon image by pressing next/prev buttons
    switchFoto = (e) => {
        const { currentImageIndex } = this.state;
        const lastImageIndex = this.state.pokemonParsedImages.length;
        let newImageIndex;
        const direction = e.target.value;
        
        switch (direction) {
            // get previous image
            case 'prev':
                if (currentImageIndex !== 0) {
                    newImageIndex = currentImageIndex - 1;
                    this.setState({
                        currentImageIndex: newImageIndex,
                    });
                }
                break;
            // get next image
            case 'next':
                if (currentImageIndex !== lastImageIndex) {
                    newImageIndex = currentImageIndex + 1;
                    this.setState({
                        currentImageIndex: newImageIndex,
                    });
                }
                break;
        }
    }


    // Pars all images of current pokemon
    parsImages() {
        const parsedImages = [];
        // recursive images parsing
        function parsInnerImages(obj) {
            for (const prop in obj) {
                const value = obj[prop];
                if (value !== undefined && value !== null) { 
                    if (typeof value === 'object') {
                        parsInnerImages(value);
                    } else {
                        parsedImages.push(value);
                    }
                }
            }
            return parsedImages;
        }

        parsInnerImages(this.props.data.sprites);

        this.setState({
            pokemonParsedImages: parsedImages,
            isLoaded: true,
        });
    }

    componentDidMount() {
        this.parsImages();
    }


    render() {
        const { isError } = this.state;

        return (
            <div className={this.props.isActive ? 'pokemon_card active': 'pokemon_card'} onClick={ this.props.onClick }>
                <div className="close_btn"></div>
                <span className="pokemon_name">{!isError ? this.props.data.name : false}</span>
                <div className="pokemon_card__foto">
                    {isError ? false : this.getPokemonImg()}
                </div>
                <div className="pokemon_card__foto_buttons">
                    <button value='prev' onClick={this.switchFoto}>Prev</button>
                    <button value='next' onClick={this.switchFoto}>Next</button>
                </div>
            </div> 
        );
    }
}

export default PokemonCard;
