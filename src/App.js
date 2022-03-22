import React, { useState, useEffect } from 'react';

import './App.css';

import MainPage from './MainPage/MainPage';
import CurrencyPage from './CurrencyPage/CurrencyPage';

function App() {

    const initialValue = sessionStorage.getItem('data')
        ? JSON.parse(sessionStorage.getItem('data')).Valute
        : {}

    const [data, setData] = useState(initialValue)
    const [selectedCurrent, setSelectedCurrent] = useState(null)

    useEffect(() => {
        // getRecources()

        if (!sessionStorage.getItem('data')) {
            getRecources()
        }

        // if (sessionStorage.getItem('data')) {
        //     const rawData = sessionStorage.getItem('data');
        //     const JSONData = JSON.parse(rawData)
        //     setData(JSONData.Valute)
        // } else {
        //     getRecources()
        // }
    }, [])

    async function getRecources() {
        fetch(`https://www.cbr-xml-daily.ru/daily_json.js`)
            .then(response => response.json())
            .then(res => {
                setData(res.Valute)
                sessionStorage.setItem('data',JSON.stringify(res))
            })
    }

    return (
        <div className="App">
            <MainPage 
                    data={data}
                    setCurrent={setSelectedCurrent} />
            {selectedCurrent
                ? <CurrencyPage
                    current={selectedCurrent}
                    resetCurrent={setSelectedCurrent} />
                : null
            }
        </div>
    );
}

export default App;
