'use client'

/* Instruments */
import {
    useSelector,
    selectGenerator,
} from '@/lib/redux'
import styles from './table.module.css'
import {useEffect, useState} from "react";

import {BiUpArrow, BiDownArrow} from 'react-icons/bi'

export const Table = () => {

    const [timestampSort, setTimestampSort] = useState(false)
    const [numberSort, setNumberSort] = useState(false)
    const [arrOfGeneratedNumbers, setArrOfGeneratedNumbers] = useState([])

    const generatedNumber = useSelector(selectGenerator)

    useEffect(() => {
        setArrOfGeneratedNumbers([...generatedNumber])
        setTimestampSort(false)
        setNumberSort(false)
    }, [generatedNumber])

    const sortByTimestamp = () => {
        setTimestampSort(!timestampSort)
        let sortedArr = []
        if (timestampSort) {
            sortedArr = arrOfGeneratedNumbers.sort((a, b) => {
                const dateA = new Date(a.timestamp.replace(/(\d{2}).(\d{2}).(\d{4}) (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5:00'));
                const dateB = new Date(b.timestamp.replace(/(\d{2}).(\d{2}).(\d{4}) (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5:00'));
                return dateA - dateB;
            });
        } else {
            sortedArr = arrOfGeneratedNumbers.sort((a, b) => {
                const dateA = new Date(a.timestamp.replace(/(\d{2}).(\d{2}).(\d{4}) (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5:00'));
                const dateB = new Date(b.timestamp.replace(/(\d{2}).(\d{2}).(\d{4}) (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5:00'));
                return dateB - dateA;
            });
        }
        setArrOfGeneratedNumbers(sortedArr)
    }

    const sortByNumber = () => {
        setNumberSort(!numberSort)
        if (numberSort) {
            setArrOfGeneratedNumbers(arrOfGeneratedNumbers.sort((a, b) => a.value - b.value))
        } else {
            setArrOfGeneratedNumbers(arrOfGeneratedNumbers.sort((a, b) => b.value - a.value))
        }
    }

    const textSearch = (e) => {
        let value = e.target.value.toLowerCase()
        let result = generatedNumber.filter((item) => {
            return item.value.toString().toLowerCase().includes(value) || item.timestamp.toString().toLowerCase().includes(value)
        })
        setArrOfGeneratedNumbers(result)
    }

    return (
        <div className={styles.column}>
            <div className={styles.input_container}>
                <input type="text" onChange={(e) => textSearch(e)}/>
                <label>Search</label>
            </div>
            <table className={styles.generator_table}>
                <thead>
                <tr className={styles.generator_tr}>
                    <th className={styles.generator_th}>Time
                        <span style={{marginLeft: "8px", cursor: "pointer"}} onClick={() => sortByTimestamp()}>
                            {
                                timestampSort ? <BiUpArrow /> : <BiDownArrow />
                            }
                        </span>
                    </th>
                    <th className={styles.generator_th}>Number
                        <span style={{marginLeft: "8px", cursor: "pointer"}} onClick={() => sortByNumber()}>
                            {
                                numberSort ? <BiUpArrow /> : <BiDownArrow />
                            }
                        </span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {arrOfGeneratedNumbers.map((item, index) => (
                    <tr key={index} className={styles.generator_tr}>
                        <td className={styles.generator_th}>{item.timestamp}</td>
                        <td className={styles.generator_th}>{item.value}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
