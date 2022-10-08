import PropTypes from 'prop-types';
import { useState } from 'react';
import { Form, Button } from '../ContactForm';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({ name, number });
    setName('');
    setNumber('');
  };

  const handleChange = e => {
    e.currentTarget.type === 'text'
      ? setName(e.currentTarget.value)
      : setNumber(e.currentTarget.value);
  };

  return (
    <>
      <p>Name</p>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <p>Number</p>
        <input
          value={number}
          onChange={handleChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <Button type="submit">Add contact</Button>
      </Form>
    </>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
