import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as actionTypes from '../../store/actions'

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.counter} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                <hr/>
                <button onClick={() => this.props.onStoreResult(this.props.counter)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(result => {
                        return <li key={result.id} onClick={() => this.props.onDeleteResult(result.id)}>{result.value}</li>
                    })}
                    
                </ul>
            </div>
        );
    }
}

// State to Props (Redux do this)
const mapStateToProps = state => {
    return {
        // State comes from reducer.js
        counter: state.ctr.counter,
        storedResults: state.res.results,
    }
}

// Dispatching Actions
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => {
            return dispatch({type: actionTypes.INCREMENT});
        },

        onDecrementCounter:() => {
            return dispatch({type: actionTypes.DECREMENT})
        },

        onAddCounter:() => {
            return dispatch({type: actionTypes.ADD, value: 10})
        },

        onSubtractCounter:() => {
            return dispatch({type: actionTypes.SUBTRACT, value: 15})
        },
        
        onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}),

        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultElId: id}),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);