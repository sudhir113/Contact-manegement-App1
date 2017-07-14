import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as contactActions from '../../actions/contactActions';
import ContactList from './ContactList';
import {browserHistory} from 'react-router';

class ContactsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddContactPage = this.redirectToAddContactPage.bind(this);
    this.deletecontact = this.deletecontact.bind(this);
  }

  contactRow(contact, index) {
    return <div key={index}>{contact.title}</div>;
  }

  redirectToAddContactPage() {
    browserHistory.push('/Contact');
  }
deletecontact(data){
  this.props.actions.deleteContactAction(data);

}


  render() {
    const {contacts,deletecontact} = this.props;

    return (
      <div>
        <h1>Contacts</h1>
        <input type="submit"
               value="Add Contact"
               className="btn btn-primary"
               onClick={this.redirectToAddContactPage}/>
        <ContactList contacts={contacts} deletecontact={this.deletecontact}  />
      </div>
    );
  }
}

ContactsPage.propTypes = {
  contacts: PropTypes.array.isRequired,
  deletecontact:PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    contacts: state.contacts

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(contactActions, dispatch)

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage);
