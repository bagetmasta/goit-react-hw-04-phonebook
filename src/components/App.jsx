import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Container } from './Container/Container';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export const App = () => {
  const contactsDefaultArray = [
    { id: 'id-1', name: 'Mukola Trush', number: '777-77-77' },
    { id: 'id-2', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-3', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-4', name: 'Eden Clements', number: '645-17-79' },
  ];

  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? contactsDefaultArray
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const oneContact = {
      id: nanoid(),
      name,
      number,
    };

    checkForSameName(oneContact);
  };

  const checkForSameName = oneContact => {
    if (contacts.find(contact => contact.name === oneContact.name)) {
      alert(`${oneContact.name} is already in contacts`);

      return;
    }

    setContacts(prevState => [oneContact, ...contacts]);
  };

  const deleteContact = id => {
    setContacts(prevState => contacts.filter(contact => contact.id !== id));
  };

  const filterChange = value => {
    setFilter(value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter onChange={filterChange} filter={filter} />
      <ContactsList
        contacts={visibleContacts}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
};
