import React from 'react'
import matrixStyle from '../static/stylus/matrix.module.styl'
import { v4 as uuidv4 } from 'uuid'

interface IProps {
    values: number[][]
    selectedRow?: number
    rowSelectCallback?: (row: number) => void
}

export default function Table(props: IProps) {
    const table = props.values.map((row, rowIndex) =>
        <tr key={uuidv4()} onClick={() => props.rowSelectCallback(rowIndex)}
            className={rowIndex == props.selectedRow ? matrixStyle.selected : ''}>
            {row.map(value => (
                <td key={uuidv4()}>
                    {value}
                </td>
            ))}
        </tr>)

    return (
        <table className={[matrixStyle.matrixTable, (props.rowSelectCallback ? matrixStyle.selectable : '')].join(' ')}>
            <tbody>{table}</tbody>
        </table>
    )
}