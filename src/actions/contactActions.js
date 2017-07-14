import * as types from './actionTypes';
import contactApi from '../api/mockContactApi';

export function loadContactsSuccess(contacts) {
  return { type: types.LOAD_CONTACTS_SUCCESS, contacts};
}

export function createContactSuccess(contact) {
  return {type: types.CREATE_CONTACT_SUCCESS, contact};
}

export function updateContactSuccess(contact) {
  return {type: types.UPDATE_CONTACT_SUCCESS, contact};
}




export function loadContacts() {
  return function(dispatch) {
    return contactApi.getAllContacts().then(contacts => {
      dispatch(loadContactsSuccess(contacts));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveContact(contact) {
  return function (dispatch, getState) {
    return contactApi.saveContact(contact).then(contact => {
      contact.id ? dispatch(updateContactSuccess(contact)) :
        dispatch(createContactSuccess(contact));
    }).catch(error => {
      throw(error);
    });
  };
}


export const deleteContactResponse = () => ({
    type: types.DELETE_CONTACT_RESPONSE
});



export function deleteContactAction(contactId) {
    return (dispatch) => {
  return contactApi.deleteContact(contactId)
            .then(() => {
                dispatch(deleteContactResponse());
            }).then(() => {
                dispatch(loadContacts());
            }).catch(error => {
                throw error;
            });
    };
}
