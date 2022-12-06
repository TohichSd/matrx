import React, { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { v4 as uuidv4 } from 'uuid'
import matrixStyle from './static/stylus/matrix.module.styl'
import './static/stylus/common.styl'
import Matrix from './components/Matrix'
import OperationInput from './components/OperationInput'
import MatrixInput from './components/MatrixInput'

function App() {
    const [steps, setSteps] = useState<StepType[]>([])
    const [currentValues, setCurrentValues] = useState<number[][]>()
    const [currentOperations, setCurrentOperations] = useState<OperationsList>([])
    const [nextStepValues, setNextStepValues] = useState<number[][]>(currentValues)

    const matrices = steps.map(step =>
        <div key={uuidv4()} className={matrixStyle.step}>
            <Matrix values={step.values} operations={step.operations} />
            <span className='tilda'>~</span>
        </div>,
    )

    useEffect(() => {
        if (!currentValues) return
        const _values = currentValues.map((row, rowIndex) => {
            const operation = currentOperations[rowIndex]
            if (operation) {
                if (operation.type == 'sum')
                    return row.map((value, valueIndex) =>
                        value + (currentValues[operation.row][valueIndex] * operation.multiplier),
                    )
                else if (operation.type == 'multiply')
                    return row.map((value) =>
                        value * operation.multiplier,
                    )
                else if (operation.type == 'divide')
                    return row.map((value) =>
                        value / operation.divider,
                    )
            }
            return row
        })
        setNextStepValues(_values)
    }, [currentOperations])

    const addStep = () => {
        setSteps([...steps, { values: currentValues, operations: currentOperations }])
        setCurrentValues(nextStepValues)
        setCurrentOperations([])
    }

    const addOperation = (row: number, operation: OperationType) => {
        if (row < 0 || row > currentValues.length) return
        if (operation.type == 'sum')
            if (operation.row < 0 || operation.row > currentValues.length) return
        setCurrentOperations({ ...currentOperations, [row]: operation })
    }

    let main
    if (currentValues) main =
        <main>
            <div className={matrixStyle.matrixContainer}>
                {matrices}
                <Matrix values={currentValues} operations={currentOperations} />
                <button className='tilda' onClick={addStep}>~</button>
                <div className='muted'>
                    <Matrix values={nextStepValues} />
                </div>
            </div>
            <OperationInput rowsCount={currentValues.length} addOperationCallback={addOperation} />
        </main>
    else main =
        <main>
            <MatrixInput inputCallback={values => {
                setCurrentValues(values)
                setNextStepValues(values)
            }} />
        </main>

    return (
        <div>
            <header>

            </header>
            {main}
        </div>
    )
}

const rootDiv = document.createElement('div')
rootDiv.setAttribute('id', 'root')
document.body.appendChild(rootDiv)

const root = createRoot(rootDiv)
root.render(<StrictMode> <App /> </StrictMode>)
