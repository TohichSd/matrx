import React from 'react'
import matrixStyle from '../static/stylus/matrix.module.styl'
import Table from './Table'
import OperationsColumn from './OperationsColumn'

interface IProps {
    values: number[][]
    operations?: OperationsList
}

export default function Matrix(props: IProps) {
    return (
        <div className={matrixStyle.matrixWrapper}>
            <div className={matrixStyle.matrix}>
                <Table values={props.values} />
            </div>
            {props.operations &&
                <OperationsColumn rows={props.values.length} operations={props.operations} />
            }
        </div>
    )
}