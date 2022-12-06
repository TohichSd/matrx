declare type SumOperation = {
    type: 'sum',
    row: number
    multiplier: number
}

declare type MultiplyOperation = {
    type: 'multiply',
    multiplier: number
}

declare type DivideOperation = {
    type: 'divide',
    divider: number
}

declare type OperationType = SumOperation | MultiplyOperation | DivideOperation

declare type OperationsList = { [row: number]: OperationType }

declare type StepType = {
    values: number[][]
    operations: OperationsList
}