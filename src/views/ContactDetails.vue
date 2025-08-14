<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import contactStore from '../stores/contactStore.js';

const props = defineProps(['id']);
const router = useRouter();
const showDeleteConfirm = ref(false);

const contact = computed(() => {
  return contactStore.getContactById(props.id);
});

const confirmDelete = () => {
  showDeleteConfirm.value = true;
};

const deleteContact = () => {
  contactStore.deleteContact(props.id);
  router.push('/');
};
</script>

<template>
  <div class="contact-details">
    <div v-if="!contact" class="error">
      <h2>Contact not found</h2>
      <router-link to="/" class="btn btn-secondary">Back to Contacts</router-link>
    </div>
    
    <div v-else class="details-container">
      <header class="details-header">
        <router-link to="/" class="back-link">← Back to Contacts</router-link>
        <div class="actions">
          <router-link :to="`/edit/${contact.id}`" class="btn btn-primary btn-small">Edit Contact</router-link>
          <button @click="confirmDelete" class="btn btn-danger btn-small">Delete Contact</button>
        </div>
      </header>
      
      <div class="card card-large contact-profile">
        <div class="avatar avatar-large">
          {{ contact.firstName[0] }}{{ contact.lastName[0] }}
        </div>
        <div class="profile-info">
          <h1>{{ contact.firstName }} {{ contact.lastName }}</h1>
          <div class="contact-fields">
            <div class="field">
              <label>Email:</label>
              <span>{{ contact.email }}</span>
            </div>
            <div v-if="contact.phone" class="field">
              <label>Phone:</label>
              <span>{{ contact.phone }}</span>
            </div>
            <div v-if="contact.address" class="field">
              <label>Address:</label>
              <span>{{ contact.address }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click="showDeleteConfirm = false">
      <div class="modal" @click.stop>
        <h3>Delete Contact</h3>
        <p>Are you sure you want to delete {{ contact.firstName }} {{ contact.lastName }}? This action cannot be undone.</p>
        <div class="modal-actions">
          <button @click="showDeleteConfirm = false" class="btn btn-secondary">Cancel</button>
          <button @click="deleteContact" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>