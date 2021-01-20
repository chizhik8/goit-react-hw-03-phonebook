import React, { Component } from 'react'


export class ContactForm extends Component {

    state = {
        name: '',
        number: '',
    }

    handleInput = (e) => {
        const { name, value } = e.target;
        this.setState(() => {
        return {
            [name]: value,
        }
        })
    }

    handleSubmit = (e) => { 
        const { name, number } = this.state
        e.preventDefault();
        this.props.onAddContacts(name, number);
        this.setState({ name: '', number: '' })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name
                    <input type='text'
                        value={this.state.name}
                        onChange={this.handleInput}
                        name='name'
                    />
                </label>
                <label>
                    Number
                    <input type='tel'
                        value={this.state.number}
                        onChange={this.handleInput}
                        name='number'
                    />
                </label>
                <button type='submit'>Add contact</button>
            </form>
        )    
    }
}
