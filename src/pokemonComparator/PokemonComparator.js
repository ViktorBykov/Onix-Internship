import React from 'react';

class PokemonComparator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPokemon: 0,
            pokemonData: [],
            isLoaded: false,
            isError: false,
        };
    }


    // Get pokemon stat
    getPokemonStats() {
        const firstPokemonStats = this.props.data[0].stats;
        const secondPokemonStats = this.props.data[1].stats;

        for (let i = 0; i < firstPokemonStats.length; i++) {
            getRowStat(i)
        }

        function getRowStat(i) {
            // console.log(secondPokemonStats[i])
        }
        let data = this.props.data;


        return firstPokemonStats.map((statItem, index) => (
            <li key={index}>
                <span className="stat_name">{statItem.stat.name}</span>
                <div className="stat_data__wrapper">
                    {/* <span className="stat_data_compare">+5%</span> */}
                    <span className="stat_data active">{statItem.base_stat}</span>
                    <span className="stat_data active">{statItem.base_stat}</span>
                    {/* <span className="stat_data_compare">-3%</span> */}
                </div>
            </li>
        ));
    }

    compareStats() {
        const firstPokemonStats = this.props.data[0].stats;
        const secondPokemonStats = this.props.data[1].stats;

    }

    render() {
        const { isLoaded } = this.state;

        return (
            <div className="pokemon_card__stats">
                {this.getPokemonStats()}
            </div>
        );
    }
}

export default PokemonComparator;
