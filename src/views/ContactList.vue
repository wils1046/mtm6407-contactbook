<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import contactStore from '../stores/contactStore.js';

const router = useRouter();
const searchTerm = ref('');

const filteredContacts = computed(() => {
  return contactStore.searchContacts(searchTerm.value);
});

const viewContact = (id) => {
  router.push(`/contact/${id}`);
};
</script>

<template>
  <div class="contact-list">
    <header class="contact-list-header">
      <h1>Contact Book</h1>
      <router-link to="/add" class="btn btn-primary">Add New Contact</router-link>
    </header>
    
    <div class="search-section">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search contacts by name..."
        class="form-input form-input-large"
      />
    </div>
    
    <div v-if="filteredContacts.length === 0" class="no-contacts">
      <p>{{ searchTerm ? 'No contacts found matching your search.' : 'No contacts available.' }}</p>
    </div>
    
    <div v-else class="contacts-grid">
      <div
        v-for="contact in filteredContacts"
        :key="contact.id"
        class="card card-hover contact-card"
        @click="viewContact(contact.id)"
      >
        <div class="avatar avatar-small">
          {{ contact.firstName[0] }}{{ contact.lastName[0] }}
        </div>
        <div class="contact-info">
          <h3>{{ contact.firstName }} {{ contact.lastName }}</h3>
          <p>{{ contact.email }}</p>
          <p v-if="contact.phone">{{ contact.phone }}</p>
        </div>
      </div>
    </div>
  </div>
</template>