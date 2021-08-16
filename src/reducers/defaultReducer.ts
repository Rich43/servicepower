import {CREATE_TYPE, DELETE_TYPE, UPDATE_TYPE} from "../actions";
import { StateType } from "./interfaces";

export const initialState: StateType = {
    counter: 10, lastIndex: 10, data: [
        {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
        {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
        {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
        {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
        {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
        {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
        {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
        {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
        {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    ]
};

const defaultReducer = (state = initialState, action: { type: string; id: number | undefined; object: {} | undefined; }) => {
    const newState = {...state, data: state.data.slice()};
    switch (action.type) {
        case CREATE_TYPE:
            newState.counter++;
            newState.lastIndex = newState.counter;
            newState.data.push({...action.object, id: newState.counter});
            return newState;
        case UPDATE_TYPE:
            const target = newState.data.find(row => row.id === action.id);
            if (target === undefined) {
                console.error(`Unable to update row with id ${action.id}`)
                return state;
            }
            Object.assign(target, {...target, ...action.object});
            return newState;
        case DELETE_TYPE:
            newState.data = newState.data.filter(row => row.id !== action.id);
            return newState;
        default:
            return state;
    }
}

export default defaultReducer;
