<template>
  <div>
    <div v-if="contactStore.isLoading" class="text-center py-10">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
    </div>
    <div v-else class="grid grid-cols-1 gap-4">
      <div 
        v-for="item in contactStore.contacts" 
        :key="item.id"
        class="border rounded-3xl p-6 transition-all duration-300 bg-[#141f26]/40"
        :class="item.status === 'read' ? 'border-white/5 opacity-50' : 'border-[#ff71b8]/20 shadow-lg shadow-[#ff71b8]/5'"
      >
        <div class="flex justify-between items-start gap-4">
          <div class="space-y-1 flex-1">
            <div class="flex items-center gap-2">
              <span class="font-bold text-white text-base">{{ item.name }}</span>
              <span class="text-xs text-gray-400">(&lt;{{ item.email }}&gt;)</span>
              <span 
                v-if="item.status !== 'read'" 
                class="bg-[#ff71b8] text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider"
              >
                New
              </span>
            </div>
            <div class="text-sm font-semibold text-[#ff71b8] mt-1" v-if="item.subject">
              Subject: {{ item.subject }}
            </div>
            <p class="text-sm text-gray-300 pt-2 whitespace-pre-wrap leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5 mt-3">
              {{ item.message }}
            </p>
            <div class="text-[11px] text-gray-500 pt-2">
              Sent at: {{ item.created_at ? new Date(item.created_at).toLocaleString('en-US') : 'Unknown' }}
            </div>
          </div>
          <div class="flex gap-2">
            <button 
              v-if="item.status !== 'read'"
              @click="contactStore.toggleReadStatus(item.id)" 
              class="p-2 bg-[#ff71b8]/10 hover:bg-[#ff71b8] text-[#ff71b8] hover:text-black rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            >
              <i class="bi bi-check2-all text-base"></i> Mark Read
            </button>
            <button 
              @click="handleDelete(item.id)" 
              class="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all"
            >
              <i class="bi bi-trash3-fill text-base"></i>
            </button>
          </div>
        </div>
      </div>
      <div 
        v-if="!contactStore.contacts.length" 
        class="text-center py-20 text-gray-500 bg-[#141f26]/20 border border-white/5 rounded-3xl"
      >
        <i class="bi bi-envelope-open text-4xl block mb-2 text-gray-600"></i>
        Your contact inbox is currently empty.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useContactStore } from '../stores/contact.store';

const contactStore = useContactStore();
onMounted(() => { contactStore.fetchContacts(); });

const handleDelete = (id: number) => {
  if (confirm('Are you sure you want to delete this contact message?')) { contactStore.removeContact(id); }
};
</script>