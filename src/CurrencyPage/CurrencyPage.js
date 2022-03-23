import React from "react";

import styles from './CurrencyPage.module.css';

export default function CurrencyPage({ data, current, resetCurrent }) {
    const { Name, CharCode, Nominal } = current
    
    const historyDataForRender = data.map((item, k, arr) => {
        const currentValute = item.Valute[CharCode]
        const prevValute = k === 0
            ? currentValute
            : arr[k - 1].Valute[CharCode].Value
        
        const formatter = new Intl.DateTimeFormat('ru')
        const rawDate = new Date(item.Date)
        const date = formatter.format(rawDate)

        const price = currentValute.Value
        
        const diff = k === 0
            ? 0
            : Math.floor(((prevValute - price) / (prevValute / 100)) * 100)/100

        const currencyStyles = k % 2 ? styles.row : `${styles.row} ${styles.rowDark}`
        const diffStyles = diff >= 0 ? styles.rise : styles.fall
        return (
            <div key={k} className={currencyStyles}>
                <div className={styles.block}>{date}</div>
                <div className={styles.block}>{price}₽</div>
                <div className={`${styles.block} ${diffStyles}`}>{diff}%</div>
            </div>
        )
    })
    return (
        <div className={styles.body}
            >
            <h2 className={styles.curencyName}>Цена за {Nominal} {Name}</h2>
            <div className={styles.grid}>
                <div className={styles.row}>
                    <div className={`${styles.block} ${styles.blockHeader}`}>Дата</div>
                    <div className={`${styles.block} ${styles.blockHeader}`}>Стоимость</div>
                    <div className={`${styles.block} ${styles.blockHeader}`}>Изменение</div>
                </div>
                {historyDataForRender}
            </div>
            <div className={styles.closeBtn} onClick={() => resetCurrent(null)}/>
        </div>
    )
}