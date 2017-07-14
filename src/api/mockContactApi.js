import delay from './delay';
const contacts = [
  {
    id: "1",
    Name: "Sudhir",
    PhoneNo: "9698214362",
    Email: "sudhirunde113@gmail.com"
  },
  {
    id: "2",
    Name: "Rahul",
    PhoneNo: "7698214362",
    Email: "Rahul@gmail.com"
  },
  {
    id: "3",
    Name: "Amit",
    PhoneNo: "6698214362",
    Email: "Amit@gmail.com"
  },
  {
    id: "4",
    Name: "Raju",
    PhoneNo: "5698214362",
    Email: "Raju@gmail.com"
  },
  {
    id: "5",
    Name: "Keshav",
    PhoneNo: "4698214362",
    Email: "Keshav@gmail.com"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

const generateId = (contact) => {
  return replaceAll(contact.Name, ' ', '-');
};

class ContactApi {
  static getAllContacts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], contacts));
      }, delay);
    });
  }

  static saveContact(contact) {
    contact = Object.assign({}, contact); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minContactTitleLength = 1;
        if (contact.Name.length < minContactTitleLength) {
          reject(`Title must be at least ${minContactTitleLength} characters.`);
        }

        if (contact.id) {
          const existingContactIndex = contacts.findIndex(a => a.id == contact.id);
          contacts.splice(existingContactIndex, 1, contact);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new contacts in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          contact.id = generateId(contact);
          contact.watchHref = `http://www.pluralsight.com/contacts/${contact.id}`;
          contacts.push(contact);
        }

        resolve(contact);
      }, delay);
    });
  }

  static deleteContact(contactId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const indexOfContactToDelete = contacts.findIndex(contact => contact.id === contactId);
                contacts.splice(indexOfContactToDelete, 1);
                resolve();
            }, delay);
        });
    }

  static getContact(contactId) {
      return new Promise((resolve) => {
          setTimeout(() => {
              const existingContactIndex = contacts.findIndex(contact => contact.id === contactId);

              const contactFound = Object.assign({}, contacts[existingContactIndex]);

              resolve(contactFound);

          }, delay);
      });
  }
}

export default ContactApi;
