// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactsList } from '../ContactsList/ContactsList';
import css from './App.module.css';

export default function App() {
  // const [contacts, setContacts] = useState ({name:'', number: '', id: nanoid()});
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts')) ?? []);
  const [filterContacts, setFilterContacts] = useState('');

  // useEffect(() => {
  //   const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
  //   if (parsedContacts) {
  //     setContacts(parsedContacts);
  //     console.log(contacts);
  //   }
  // }, []);

  useEffect(() => {
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleNewContact = data => {
    const enteredName = data.name.toLowerCase();
    const checkedRepeatedName = contacts.find(
      contact => contact.name.toLocaleLowerCase() === enteredName
    );
    if (checkedRepeatedName) {
      alert(`${data.name} is already in contacts!`);
      return;
    }
    setContacts(prevState => [...prevState, { name: data.name, number: data.number, id: nanoid() }]);
  };
  // console.log(this.state);

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const handleFilter = evt => {
    setFilterContacts(evt.target.value);
  };

  const normalizedFilterContact = filterContacts.toLowerCase();
  const filtredContact = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilterContact));

    // const getContacts = (contacts, filterContacts) => {
  //   const normalizedFilterContact = filterContacts ? filterContacts.toLowerCase() : '';
  //   return contacts.filter(contact =>
  //         contact.name.toLowerCase().includes(normalizedFilterContact));
  // }


  return (
    <div className={css.wrapper}>
      <h1 className={css.phonebookTitle}>Phonebook</h1>
      <ContactForm onSubmit={handleNewContact} />
      <h2>Contacts</h2>
      <Filter filter={filterContacts} onChange={handleFilter} />
      {contacts.length !== 0 && (
      <ContactsList contacts={filtredContact} onDelete={deleteContact} />)}
    </div>
  );
}