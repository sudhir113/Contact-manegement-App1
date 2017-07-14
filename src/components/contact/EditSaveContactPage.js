import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as contactActions from '../../actions/contactActions';
import ContactForm from './ContactForm';
import toastr from 'toastr';

export class ManageContactPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      contact: Object.assign({}, props.contact),
      errors: {},
      saving: false
    };

    this.updateContactState = this.updateContactState.bind(this);
    this.saveContact = this.saveContact.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.contact.id != nextProps.contact.id) {
      // Necessary to populate form when existing contact is loaded directly.
      this.setState({contact: Object.assign({}, nextProps.contact)});
    }
  }

  updateContactState(event) {
    const field = event.target.name;
    let contact = this.state.contact;
    contact[field] = event.target.value;
    return this.setState({contact: contact});
  }

  contactFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.contact.Name.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }


  saveContact(event) {
    event.preventDefault();

    if (!this.contactFormIsValid()) {
      return;
    }

    this.setState({saving: true});

    this.props.actions.saveContact(this.state.contact)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Contact saved');
    this.context.router.push('/Contacts');
  }

  render() {
    return (
      <ContactForm
        onChange={this.updateContactState}
        onSave={this.saveContact}
        contact={this.state.contact}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageContactPage.propTypes = {
  contact: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageContactPage.contextTypes = {
  router: PropTypes.object
};

function getContactById(contacts, id) {
  const contact = contacts.filter(contact => contact.id == id);
  if (contact) return contact[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const contactId = ownProps.params.id; // from the path `/contact/:id`

  let contact = {id: '', watchHref: '', Name: '',  PhoneNo: '', Email: ''};

  if (contactId && state.contacts.length > 0) {
    contact = getContactById(state.contacts, contactId);
  }

  return {
    contact: contact
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(contactActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageContactPage);
