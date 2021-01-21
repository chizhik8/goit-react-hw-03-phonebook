import React, { Component } from 'react'

import { ContactForm } from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import { v4 as uuidv4 } from 'uuid';
import { Filter } from './components/Filter/Filter';


export class App extends Component {

  state = {
    contacts: [
      // {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      // {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      // {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      // {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  componentDidMount() { 
   
    if (localStorage.getItem('contacts') !== null) {
      this.setState({
        contacts: JSON.parse(localStorage.getItem('contacts'))
      })
    };
  }

  componentDidUpdate(prevState) { 
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
     }
  }

  addContacts = (name,number) => { 
    const contact = {
      id: uuidv4(),
      name,
      number
    }
    this.setState(prevState => { 
      if (prevState.contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase()))
      { alert(`${name} is already in contacts`); return };
      return {
        contacts: [...prevState.contacts, contact],
      }
    })
  }

  addFilter = (filter) => { 
    this.setState(() => { 
      return { filter: filter}
    })
  }

  taskFilter = () => {   
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  removeContact = (contactId) => {
    this.setState(prevState => { 
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== contactId)
      }
    })
   }

  render() {
    return (
    <div>
      <h1>Phonebook</h1>
        <ContactForm onAddContacts={this.addContacts} />
        {this.state.contacts.length > 0 ?
          <h2>Contacts</h2> &&
          <Filter onInputFilter={this.addFilter} />
          :
          <h2>Contact list is empty. Please add contact.</h2>}
        {this.state.filter.length > 0 ?
          <ContactList contacts={this.taskFilter()} onRemoveContact={this.removeContact} />
          :
          <ContactList contacts={this.state.contacts} onRemoveContact={this.removeContact} />}
    </div>
    )
  }
}

export default App;