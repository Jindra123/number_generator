'use client'

/* Core */
import {useEffect, useState} from 'react'

/* Instruments */
import {
    generatorSlice,
    useSelector,
    useDispatch,
    selectGenerator,
    selectState,
} from '@/lib/redux'
import styles from './generator.module.css'

export const Generator = () => {
    const dispatch = useDispatch()
    const generatedNumber = useSelector(selectGenerator)
    const generatorState = useSelector(selectState)

    useEffect(() => {
        let intervalId;

        if (generatorState === 'generating') {
            // Start the timer if isCounterActive is true
            intervalId = setInterval(() => {
                dispatch(generatorSlice.actions.generate())
            }, 15000); // 15,000 milliseconds = 15 seconds
        }

        // Clean up the interval when the component unmounts or when isCounterActive becomes false
        return () => clearInterval(intervalId);
    }, [generatorState === 'generating']);

    return (
        <div>
            <div className={styles.row}>
                <span className={styles.value}>{generatedNumber[0]?.value}</span>
            </div>
            <div className={styles.row}>
                <button
                    className={styles.asyncButton}
                    onClick={() => dispatch(generatorSlice.actions.switchGenerator())}
                >
                    {generatorState === 'stopped' ? 'Start' : 'Stop'}
                </button>
            </div>
        </div>
    )
}
