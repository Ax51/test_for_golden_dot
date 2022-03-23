import React, { useState, useEffect } from 'react';

import './App.css';

import MainPage from './MainPage/MainPage';
import CurrencyPage from './CurrencyPage/CurrencyPage';

function App() {

    const initialValue = sessionStorage.getItem('data')
        ? JSON.parse(sessionStorage.getItem('data'))
        : []

    const temporaryData = []
    const [data, setData] = useState(initialValue)
    const [selectedCurrent, setSelectedCurrent] = useState(null)

    if (selectedCurrent) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }

    useEffect(() => {
        if (!sessionStorage.getItem('data')) {
            getRecources()
        }
    }, [])

    async function getRecources(URL = '//www.cbr-xml-daily.ru/daily_json.js', num = 0) {
        if (num === 5) {
            // due to the limits of API requests per sec (not more than 5 requests per second), we need to wait at least 1 sec
            setTimeout(() => {
                fetch(URL)
                    .then(response => response.json())
                    .then(res => {
                        temporaryData.push(res)
                        getRecources(res.PreviousURL, num + 1)
                    })
            }, 1000)
        } else if (num < 10) { // as we can't jump throught the day (becouse we can jump on holiday) we need at least last 10 records.
            fetch(URL)
                .then(response => response.json())
                .then(res => {
                    temporaryData.push(res)
                    getRecources(res.PreviousURL, num + 1)
                })
        } else {
            setData(temporaryData)
            sessionStorage.setItem('data', JSON.stringify(temporaryData))
        }
    }
    console.log(data)
    return (
        data.length > 0
        ? <div className="App">
            <MainPage
                data={data[0]?.Valute}
                setCurrent={setSelectedCurrent} />
            {selectedCurrent
                ? <CurrencyPage
                    data={data}
                    current={selectedCurrent}
                    resetCurrent={setSelectedCurrent} />
                : null
            }
        </div>
        : <div className="wrapper">
            <i className="bi bi-arrow-clockwise"/>
        </div>
    );
}

export default App;
