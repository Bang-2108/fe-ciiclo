import { defineStore } from 'pinia';
import { ref } from 'vue';
import { contactApi } from '../api/contact.api';

export const useContactStore = defineStore('contact', () => {
  const contacts = ref<any[]>([]);
  const isLoading = ref<boolean>(false);

  const fetchContacts = async () => {
    isLoading.value = true;
    try {
      contacts.value = await contactApi.getAll();
    } catch (err) {
      console.error('Error fetching contacts:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const toggleReadStatus = async (id: number) => {
    try {
      await contactApi.markAsRead(id);
      const item = contacts.value.find(c => c.id === id);
      if (item) item.status = 'read'; 
    } catch (err) {
      alert('Failed to update read status.');
    }
  };

  const removeContact = async (id: number) => {
    try {
      await contactApi.delete(id);
      contacts.value = contacts.value.filter(c => c.id !== id);
    } catch (err) {
      alert('Failed to delete contact message.');
    }
  };

  return {
    contacts,
    isLoading,
    fetchContacts,
    toggleReadStatus,
    removeContact,
  };
});