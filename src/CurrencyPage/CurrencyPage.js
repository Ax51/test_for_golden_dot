import React from "react";

import styles from './CurrencyPage.module.css';

export default function CurrencyPage({ current, resetCurrent }) {

    // TODO: make 4 fetches (one you already have) and collect it's data
    // Promise.all(
    //     [/* array of fetches. check for mor information */]
    // )
    
    console.log(current);
    return (
        <div className={styles.body}
            onClick={() => resetCurrent(null)}>

        </div>
    )
}