import React, { useEffect, useState } from 'react'
import activeMatrixStyle from '../static/stylus/operationInput.module.styl'

interface IProps {
    rowsCount: number

    addOperationCallback(row: number, operation: OperationType): void
}

export default function OperationInput(props: IProps) {
    const [inputText, setInputText] = useState<string>('')
    const [inputError, setInputError] = useState<boolean>(false)

    useEffect(() => {
        let error = false
        if (inputText) {
            const _inputText = inputText.replace(/\s/g, '').toLowerCase()
            if (!_inputText.match(/(^\d[+-]\d+x\d+$)|(^\d+[*/]\d+$)/)) error = true
        }
        setInputError(error)
    }, [inputText])

    const addOperation = () => {
        const _inputText = inputText.replace(/\s/g, '').toLowerCase()

        if (_inputText && !inputError) {
            // 1+-2x3
            if (_inputText.match(/^\d[+-]\d+x\d+$/)) {
                const positive = _inputText.includes('+')
                let split1
                if (positive)
                    split1 = _inputText.split('+')
                else
                    split1 = _inputText.split('-')
                const split2 = split1[1].split('x')
                
                const firstRow = parseInt(split1[0]) - 1
                const secondRow = parseInt(split2[1]) - 1

                props.addOperationCallback(
                    firstRow,
                    {
                        type: 'sum',
                        row: secondRow,
                        multiplier: (positive ? 1 : -1) * parseInt(split2[0]),
                    })
            }
            // 2*3
            else if (_inputText.match(/^\d+\*\d+$/)) {
                const split = _inputText.split('*')

                props.addOperationCallback(
                    parseInt(split[0]) - 1,
                    {
                        type: 'multiply',
                        multiplier: parseInt(split[1]),
                    })
            }
            else if (_inputText.match(/^\d+\/\d+$/)) {
                const split = _inputText.split('/')

                props.addOperationCallback(
                    parseInt(split[0]) - 1,
                    {
                        type: 'divide',
                        divider: parseInt(split[1]),
                    })
            }
            setInputText('')
        }
    }

    return (
        <div className={activeMatrixStyle.input}>
            <input type='text' placeholder='Введите выражение'
                   value={inputText}
                   onChange={
                       e => setInputText(e.target.value)
                   }
                   className={inputError ? activeMatrixStyle.error : ''} />
            {(inputText && inputText != '' && !inputError) &&
                <button onClick={addOperation}>Ввести</button>
            }
        </div>
    )
}

/*if (inputText.match(/^\d+\+\d+x\d+$/)) {
                const split1 = inputText.split('+')
                const firstRow = parseInt(split1[0])
                const split2 = split1[1].split('x')
                
            } else if (inputText.match(/^\d+-\d+x\d+$/)) {

            } else if (inputText.match(/^\d+\*\d+$/)) {
} else if (inputText.match(/^\d+\/\d+$/)) {
}*/