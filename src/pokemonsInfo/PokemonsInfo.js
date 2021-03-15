import React from 'react';

import './PokemonsInfo.css';

class PokemonsInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };


    }

    /******************************* 

API
запрос и вывод данных с апи
??? по клику на элемент отправляет еще один запрос, получает и выводит дополнительные данные

инпут для ввода id покемона и кнопка рандомный покемон
в центре фото покемона, с боку вкладки характеристик
снизу кнопки, поменять фото/вид покемона

    ********************************/





    componentDidMount() {

    }


    render() {
        // const {subTitle} = this.state;
        // const {firstPoke} = this.state;
        // const {secondPoke} = this.state;

        return (
            <div>
                <div className="pokemon_card">
                    {/* <span className="pokemon_name">{firstPoke.name}</span> */}
                    <div className="pokemon_card__info_wrapper">
                        <div className="pokemon_card__foto">
                            {/* {this.getPokemonImg()} */}
                        </div>
                        <div className="pokemon_card__stats">
                            {/* {this.getPokemonStats()} */}
                        </div>
                    </div>
                </div>

                <div className="pokemon_card second">
                    {/* <span className="pokemon_name second">{secondPoke.name}</span> */}
                    <div className="pokemon_card__info_wrapper">
                        <div className="pokemon_card__foto">
                            {/* {this.getPokemonImg2()} */}
                        </div>
                        <div className="pokemon_card__stats">
                            {/* {this.getPokemonStats2()} */}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default PokemonsInfo;
