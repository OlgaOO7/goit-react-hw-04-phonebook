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

  // const getFilterResult = () => {
  //   const filteredContact = filterContacts.toLowerCase();
  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(filteredContact)
  //   );
  // };

  // const getContacts = (contacts, filterContacts) => {
  //   const normalizedFilterContact = filterContacts ? filterContacts.toLowerCase() : '';
  //   return contacts.filter(contact =>
  //         contact.name.toLowerCase().includes(normalizedFilterContact));
  // }

  const normalizedFilterContact = filterContacts.toLowerCase();
  const filtredContact = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilterContact));


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

// // зробити рефакторінг класів
// export class App extends Component {
//   static defaultProps = {
//     initialContactList: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//   };

//   // const LS_KEY = 'local storage';

//   state = {
//     contacts: this.props.initialContactList,
//     filter: '',
//     // [
//     // {id: 'id-1', name: 'Rosie Simpson'},
//     // {id: 'id-2', name: 'Hermione Kline'},
//     // {id: 'id-3', name: 'Eden Clements'},
//     // {id: 'id-4', name: 'Annie Copeland'},
//     // ],
//   };

//   componentDidMount() {
//     const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
//     // if (savedContacts !== null) {
//     //   this.setState({contacts: JSON.parse(savedContacts)});
//     // } else {
//     //   this.setState({contacts: JSON.parse(this.props.initialContactList)})
//     // }
//     // this.setState({
//     //   stickers: savedContacts !== null ? JSON.parse(savedContacts) : this.props.initialContactList,
//     // })
//     if (parsedContacts) {
//       this.setState({
//         contacts: parsedContacts,
//       });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     // console.log(prevProps, prevState);
//     // console.log(this.props, this.state);
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   handleNewContact = data => {
//     const { contacts } = this.state;
//     const enteredName = data.name.toLowerCase();
//     const checkedRepeatedName = contacts.find(
//       contact => contact.name.toLocaleLowerCase() === enteredName
//     );
//     if (checkedRepeatedName) {
//       alert(`${data.name} is already in contacts!`);
//       return;
//     }
//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, { ...data, id: nanoid() }],
//     }));
//     // console.log(this.state);
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   handleFilter = evt => {
//     this.setState({ filter: evt.currentTarget.value });
//   };

//   getFilterResult = () => {
//     const { filter, contacts } = this.state;
//     const filterContact = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filterContact)
//     );
//   };

//   render() {
//     const { filter } = this.state;
//     const filterResult = this.getFilterResult();
//     return (
//       <div className={css.wrapper}>
//         <h1 className={css.phonebookTitle}>Phonebook</h1>
//         <ContactForm onSubmit={this.handleNewContact} />
//         <h2>Contacts</h2>
//         <Filter filter={filter} onChange={this.handleFilter} />
//         <ContactsList contacts={filterResult} onDelete={this.deleteContact} />
//       </div>
//     );
//   }
// }
