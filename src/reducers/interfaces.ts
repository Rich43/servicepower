export type StateType = { counter: number, lastIndex: number, data: { id: number, [key: string]: any }[] };
export interface RootState {
    defaultReducer: StateType
}
