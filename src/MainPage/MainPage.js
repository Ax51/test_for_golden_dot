import React from "react";

import styles from './MainPage.module.css';


export default function MainPage({ data, setCurrent }) {
    console.log(data);
     
    const currenciesArr = Object.keys(data)
    const currenciesForRender = currenciesArr.map((item, k) => {
        const i = data[item]
        const diff = Math.floor(((i.Previous - i.Value) / (i.Previous / 100)) * 100)/100
        const currencyStyles = k % 2 ? styles.currency : `${styles.currency} ${styles.currencyDark}`
        return (
            <div
                key={k}
                className={currencyStyles}
                onClick={() => setCurrent(i)}>
                <div className={`${styles.block} ${styles.currencyCode}`}>
                    <p>{i.CharCode}</p>
                    <div className={styles.hint}>{`${i.Nominal} ${i.Name}`}</div>
                </div>
                <div className={styles.block}>
                    <p>{i.Value}₽</p>
                </div>
                <div className={`${styles.block} ${diff > 0 ? styles.rise : styles.fall}`}>
                    <p>{diff}%</p>
                </div>
            </div>
        )
    })

    return (
        <div className={styles.body}>
            {data ? currenciesForRender : null}
        </div>
    )
}