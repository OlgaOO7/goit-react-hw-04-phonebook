// import { Component } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export function ContactForm({onSubmit}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleContactNameChange = evt => {
    setName(evt.target.value);
  };

  const handleContactNumberChange = evt => {
    setNumber(evt.target.value);
  };

  // // або переписати як одну  handleContactChange для різних стейтів:
  // const handleContactChange = evt => {
  //   const { name, value } = evt.currentTarget;

  //   switch (name) {
  //     case 'contactName':
  //       setName(value);
  //       break;

  //     case 'number':
  //       setNumber(value);
  //       break;

      // default:
      //   throw new Error("Contact can't be added")
      //   break;
  //   }
  // };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit({name, number});
    // console.log(this.state);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <div className={css.formWrapper}>
      <form onSubmit={handleSubmit} className={css.form}>
        <label className={css.labelForm}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleContactNameChange}
            className={css.inputForm}
          />
        </label>

        <label className={css.labelForm}>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleContactNumberChange}
            className={css.inputForm}
          />
        </label>

        <button type="submit" className={css.addBtn}>
          Add contact
        </button>
      </form>
    </div>
  );
}

// export class ContactForm extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   handleContactChange = evt => {
//     const { name, value } = evt.currentTarget;
//     this.setState({ [name]: value });
//     // console.log(evt.target.value);
//   };

//   handleSubmit = evt => {
//     evt.preventDefault();
//     this.props.onSubmit(this.state);
//     // console.log(this.state);
//     this.reset();
//   };

//   reset = () => {
//     this.setState({ name: '', number: '' });
//   };

//   render() {
//     const { name, number } = this.state;

//     return (
//       <div className={css.formWrapper}>
//         <form onSubmit={this.handleSubmit} className={css.form}>
//           <label className={css.labelForm}>
//             Name
//             <input
//               type="text"
//               name="name"
//               value={name}
//               pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//               title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//               required
//               onChange={this.handleContactChange}
//               className={css.inputForm}
//             />
//           </label>

//           <label className={css.labelForm}>
//             Number
//             <input
//               type="tel"
//               name="number"
//               value={number}
//               pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//               title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//               required
//               onChange={this.handleContactChange}
//               className={css.inputForm}
//             />
//           </label>

//           <button type="submit" className={css.addBtn}>
//             Add contact
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
