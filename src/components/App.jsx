import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Container } from './Container/Container';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Mukola Trush', number: '777-77-77' },
      { id: 'id-2', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-3', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-4', name: 'Eden Clements', number: '645-17-79' },
    ],
    filter: '',
  };

  componentDidMount() {
    JSON.parse(localStorage.getItem('contacts')) &&
      this.setState({
        contacts: JSON.parse(localStorage.getItem('contacts')),
      });
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = ({ name, number }) => {
    const oneContact = {
      id: nanoid(),
      name,
      number,
    };

    this.checkForSameName(oneContact);
  };

  checkForSameName = oneContact => {
    const { contacts } = this.state;

    if (contacts.find(contact => contact.name === oneContact.name)) {
      alert(`${oneContact.name} is already in contacts`);

      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [oneContact, ...contacts],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  filterChange = value => {
    this.setState({ filter: value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter onChange={this.filterChange} filter={this.state.filter} />
        <ContactsList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
