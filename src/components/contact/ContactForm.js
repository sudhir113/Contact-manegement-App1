import React from 'react';
import TextInput from '../common/TextInput';

const ContactForm = ({contact, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Manage Contact</h1>
      <TextInput
        name="Name"
        label="Name"
        value={contact.Name}
        onChange={onChange}
        error={errors.Name}/>


      <TextInput
        name="PhoneNo"
        label="PhoneNo"
        value={contact.PhoneNo}
        onChange={onChange}
        error={errors.PhoneNo}/>

      <TextInput
        name="Email"
        label="Email"
        value={contact.Email}
        onChange={onChange}
        error={errors.Email}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

ContactForm.propTypes = {
  contact: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default ContactForm;
