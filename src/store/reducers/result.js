import * as actionTypes from '../actions/actionsTypes'

const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.STORE_RESULT) {
        return {
            ...state,
            results: state.results.concat({id: new Date(), value: action.result}),
        }
    }

    if (action.type === actionTypes.DELETE_RESULT) {
        //First way to delete a copy of array
        // const newArray = [...state.results]
        // newArray.results.splice(id, 1)

        //Second Way - Most used way- Filter method
        //Filter returns a copy of a new array
        const updatedArray = state.results.filter((el) => {
            return el.id !== action.resultElId;
        });

        return {
            ...state,
            results: updatedArray,
        }
    }

    return state;
}

export default reducer;