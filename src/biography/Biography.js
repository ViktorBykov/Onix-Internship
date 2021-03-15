import React from 'react';


// import './Biography.css';

class Biography extends React.Component {
    constructor(){
        super();
        this.state = {
            subTitle: "Біографія",
            initialBio: [
                {date: 2011, dateEvent : 'React впервые использовался в новостной ленте Facebook'},
                {date: 2012, dateEvent : 'React впервые использовался в новостной ленте Instagram'},
                {date: 2013, dateEvent : 'На конференции «JSConf US» открыт исходный код React'},
                {date: 2015, dateEvent : 'На конференции Facebook «React.js Conf» анонсирован React Native'},
                {date: 2015, dateEvent : 'Открыт исходный код React Native'},
                {date: 2017, dateEvent : 'Facebook анонсировал React Fiber'},
            ],
        };
    }

    /******************************* 

    TODO:
    Таблица с биографией

    сортировка по 2ум столбцам

    инпут - новые данные в таблицу
    кнопка - если в инпуте есть данные, сохраняет и добавляет новый инпут 

    ********************************/

    // button 1 click function
    buttonFunc(){
        let arr = this.state.initialBio;
        customSort(arr);

       
        function customSort(arr) {
            let moved = false;
            for(let i = 0; i < arr.length-1; i++){
                console.log('i = ' + i + ', ' + arr[i].date + ' : ' + arr[i+1].date);
                if (i !== arr.length && arr[i].date > arr[i+1].date){
                    console.log('i = ' + i + ', ' + arr[i].date + ' : ' + arr[i+1].date + 'moved');

                    let temp = arr[i+1].date;
                    arr[i+1].date = arr[i].date;
                    arr[i].date = temp;
                    moved = true;
                }
            }
            if (moved) {
                customSort(arr);
            }
        }
    }

    // button 2 click function
    buttonFunc2 = () => {
        const revertedArray = [];
        const revertedArray2 = [];

        for (let i= this.state.initialBio.length-1; i > -1; i--){
            revertedArray.push(this.state.initialBio[i]);
        }


        this.setState({
            initialBio: revertedArray
        });
    }

    // add Bio Item func
    addBioItem = () => {
        console.log('add item button');
    }



    
    render(){
        const {subTitle} = this.state;
        const {initialBio} = this.state;

        function QuickSort(A){
                if (A.length === 0) return [];
                var a = [], b = [], p = A[0];
                for (var i = 1; i < A.length; i++)
                { if (A[ i ] < p) a[a.length] = A[ i ];
                else b[b.length] = A[ i ];
                }
                return QuickSort(a).concat( p,QuickSort(b) );
        }



        return(
            <div>
                <h4>{subTitle}</h4>
                <div className="biography_content">
                    <p></p>
                    <button onClick={this.buttonFunc}>Кнопка 1</button>
                    <button onClick={this.buttonFunc2}>Кнопка 2</button>
                    <ul>
                        {initialBio.map(({date, dateEvent})=>(
                            <li>
                                <span>{date}</span>
                                <span>{dateEvent}</span>
                            </li>
                        ))}
                    </ul>

                    <input name="date" />
                    <input name="description" />
                    <button onClick={this.addBioItem}>Добавить запись</button>

                </div>
            </div>
        );
    }
}

export default Biography;
