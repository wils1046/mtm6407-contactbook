<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import contactStore from '../stores/contactStore.js';

const props = defineProps(['id']);
const router = useRouter();

const isEditing = computed(() => !!props.id);

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  company: '',
  notes: ''
});

onMounted(() => {
  if (isEditing.value) {
    const contact = contactStore.getContactById(props.id);
    if (contact) {
      form.value = { ...contact };
    } else {
      router.push('/');
    }
  }
});

const handleSubmit = () => {
  try {
    let contact;
    if (isEditing.value) {
      contact = contactStore.updateContact(props.id, form.value);
    } else {
      contact = contactStore.addContact(form.value);
    }
    
    if (contact) {
      router.push(`/contact/${contact.id}`);
    }
  } catch (error) {
    console.error('Error saving contact:', error);
  }
};

const cancel = () => {
  if (isEditing.value) {
    router.push(`/contact/${props.id}`);
  } else {
    router.push('/');
  }
};
</script>

<template>
  <div class="contact-form-container">
    <header class="form-header">
      <router-link to="/" class="back-link">← Back to Contacts</router-link>
      <h1>{{ isEditing ? 'Edit Contact' : 'Add New Contact' }}</h1>
    </header>
    
    <form @submit.prevent="handleSubmit" class="card card-large contact-form">
      <div class="form-row">
        <div class="form-group">
          <label for="firstName">First Name *</label>
          <input
            id="firstName"
            v-model="form.firstName"
            type="text"
            required
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label for="lastName">Last Name *</label>
          <input
            id="lastName"
            v-model="form.lastName"
            type="text"
            required
            class="form-input"
          />
        </div>
      </div>
      
      <div class="form-group">
        <label for="email">Email *</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="form-input"
        />
      </div>
      
      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          class="form-input"
        />
      </div>
      
      <div class="form-group">
        <label for="address">Address</label>
        <textarea
          id="address"
          v-model="form.address"
          class="form-input"
          rows="2"
        ></textarea>
      </div>
      
      <div class="form-actions">
        <button type="button" @click="cancel" class="btn btn-secondary">Cancel</button>
        <button type="submit" class="btn btn-primary">
          {{ isEditing ? 'Update Contact' : 'Add Contact' }}
        </button>
      </div>
    </form>
  </div>
</template>