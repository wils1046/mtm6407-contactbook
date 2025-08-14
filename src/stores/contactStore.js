import { reactive } from 'vue';

// Sample initial data
const initialContacts = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    address: '456 Oak Ave, Somewhere, USA'
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    phone: '(555) 555-5555',
    address: '789 Pine Rd, Elsewhere, USA'
  }
];

// Contact store with reactive data
const contactStore = reactive({
  contacts: [...initialContacts],
  
  // Load contacts from localStorage on initialization
  init() {
    const saved = localStorage.getItem('contacts');
    if (saved) {
      try {
        this.contacts = JSON.parse(saved);
      } catch (error) {
        console.error('Error loading contacts from localStorage:', error);
        this.contacts = [...initialContacts];
      }
    }
  },
  
  // Save contacts to localStorage
  saveToLocalStorage() {
    try {
      localStorage.setItem('contacts', JSON.stringify(this.contacts));
    } catch (error) {
      console.error('Error saving contacts to localStorage:', error);
    }
  },
  
  getAllContacts() {
    return this.contacts.sort((a, b) => a.lastName.localeCompare(b.lastName));
  },
  
  getContactById(id) {
    return this.contacts.find(contact => contact.id === parseInt(id));
  },
  
  addContact(contactData) {
    const newContact = {
      id: Date.now(), // Simple ID generation
      ...contactData
    };
    this.contacts.push(newContact);
    this.saveToLocalStorage();
    return newContact;
  },
  
  updateContact(id, contactData) {
    const index = this.contacts.findIndex(contact => contact.id === parseInt(id));
    if (index !== -1) {
      this.contacts[index] = { id: parseInt(id), ...contactData };
      this.saveToLocalStorage();
      return this.contacts[index];
    }
    return null;
  },
  
  deleteContact(id) {
    const index = this.contacts.findIndex(contact => contact.id === parseInt(id));
    if (index !== -1) {
      this.contacts.splice(index, 1);
      this.saveToLocalStorage();
      return true;
    }
    return false;
  },
  
  searchContacts(searchTerm) {
    if (!searchTerm) return this.getAllContacts();
    
    const term = searchTerm.toLowerCase();
    return this.contacts
      .filter(contact => 
        contact.firstName.toLowerCase().includes(term) ||
        contact.lastName.toLowerCase().includes(term)
      )
      .sort((a, b) => a.lastName.localeCompare(b.lastName));
  }
});

// Initialize the store
contactStore.init();

export default contactStore;