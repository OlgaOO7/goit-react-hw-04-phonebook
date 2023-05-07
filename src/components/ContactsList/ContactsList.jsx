import { Contact } from '../Contact/Contact';
import PropTypes from 'prop-types';
import css from './ContactsList.module.css';

export function ContactsList({ contacts, onDelete }) {
  return (
    <ul className={css.contactList}>
      {contacts.map(contact => (
        <Contact
          key={contact.id}
          contact={contact}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
