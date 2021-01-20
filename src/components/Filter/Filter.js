import React, { Component } from 'react'

export class Filter extends Component {

    handleInput = (e) => {
        this.props.onInputFilter(e.target.value)
    }
    render() {
        return (
            <div>
                <h3>Find contacts by name</h3>
                <input type='text' onChange={this.handleInput} />
            </div>
        )
    }
}

export default Filter
