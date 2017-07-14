import React, {PropTypes} from 'react';
import {Link} from 'react-router';



class ContactList extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  render() {
    const {contacts,deletecontact} =this.props;

  return (
    <table className="table">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Name</th>
        <th>PhoneNo</th>
        <th>Email</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>
      {contacts.map(contact =>
        <tr  key={contact.id}>
          <td><a href={contact.watchHref} target="_blank"></a></td>
          <td>{contact.Name}</td>
          <td>{contact.PhoneNo}</td>
          <td>{contact.Email}</td>
          <td><Link to={'/contact/' + contact.id}>Edit</Link></td>
          <td><button onClick={e=> deletecontact(contact.id)} >delete</button></td>

        </tr>
      )}
      </tbody>
    </table>
  );
}
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deletecontact: PropTypes.func.isRequired
};

export default ContactList;
