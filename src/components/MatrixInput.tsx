import React, { useEffect, useState } from 'react'
import matrixInputStyle from '../static/stylus/matrixInput.module.styl'

interface IProps {
    inputCallback(values: number[][]): void
}

export default function MatrixInput(props: IProps) {
    const [inputValue, setInputValue] = useState<string>('')
    const [inputError, setInputError] = useState<boolean>(false)
    const [parsedMatrix, setParsedMatrix] = useState<number[][]>()


    useEffect(() => {
        const rows = inputValue.trim().replace(/ +(?= )/g, '').split('\n')
        const values = rows.map(row => row.trim().split(' ').map(val => parseInt(val)))
        if (values.find(row => row.length != values[0].length)) return setInputError(true)
        setParsedMatrix(values)
        setInputError(false)
    }, [inputValue])

    const isValid = !inputError && parsedMatrix && parsedMatrix.length != 0

    const returnMatrix = () => {
        if (!isValid) return
        props.inputCallback(parsedMatrix)
    }

    return (
        <div className={matrixInputStyle.matrixInput}>
            <h2>Введите матрицу</h2>
            <textarea className={inputError ? matrixInputStyle.error : ''}
                      onChange={e => setInputValue(e.target.value)}>
            </textarea>
            <button className={!isValid ? matrixInputStyle.error : ''} onClick={returnMatrix}>
                Ввести
            </button>
        </div>
    )
}