import React from 'react'
import matrixStyle from '../static/stylus/matrix.module.styl'
import romanize from '../util/romanize'
import { v4 as uuidv4 } from 'uuid'

interface IProps {
    rows: number
    operations: OperationsList
}

export default function OperationsColumn(props: IProps) {
    const operations = [...Array(props.rows).keys()].map(rowIndex => {
        const operation = props.operations[rowIndex]
        if (operation)
            if (operation.type == 'sum')
                return (
                    <div key={uuidv4()}>
                        <span>
                            {operation.multiplier > 0 ? '+ ' : '- '}
                            {Math.abs(operation.multiplier) != 1 ? Math.abs(operation.multiplier) : ''}
                            {romanize(operation.row + 1)}
                        </span>
                    </div>
                )
            else if (operation.type == 'multiply')
                return (
                    <div key={uuidv4()}>
                        <span> * {operation.multiplier}</span>
                    </div>
                )
            else if (operation.type == 'divide')
                return (
                    <div key={uuidv4()}>
                        <span> / {operation.divider}</span>
                    </div>
                )
        return (
            <div key={`oc${rowIndex}`}>
                <span>&nbsp;</span>
            </div>
        )
    })

    return (
        <div className={['column', matrixStyle.operationsColumn].join(' ')}>
            {operations}
        </div>
    )
}