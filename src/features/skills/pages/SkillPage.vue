<template>
  <div>
    <div class="flex justify-end mb-6">
      <button
        @click="openModal()"
        class="bg-[#ff71b8] hover:bg-[#ff5daa] px-5 py-2.5 rounded-xl font-bold text-black transition-all shadow-lg shadow-[#ff71b8]/10 flex items-center text-sm"
      >
        <i class="bi bi-plus-lg mr-2"></i>
        Add Skill
      </button>
    </div>
    <div class="bg-[#141f26]/40 rounded-3xl overflow-hidden border border-white/5 shadow-xl">
      <table class="w-full text-left border-collapse">
        <thead class="bg-white/5 text-xs uppercase tracking-wider text-gray-400 border-b border-white/5">
          <tr>
            <th class="px-6 py-4.5">Skill</th>
            <th class="px-6 py-4.5">Category</th>
            <th class="px-6 py-4.5">Proficiency</th>
            <th class="px-6 py-4.5 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr
            v-for="skill in skillStore.skills"
            :key="skill.id"
            class="hover:bg-white/5 transition-colors"
          >
            <td class="px-6 py-4.5 font-semibold text-white text-sm">
              {{ skill.name }}
            </td>
            <td class="px-6 py-4.5">
              <span
                class="px-3 py-1 rounded-full text-[11px] font-medium bg-[#ff71b8]/10 text-[#ff71b8] border border-[#ff71b8]/10 capitalize"
              >
                {{ skill.category }}
              </span>
            </td>
            <td class="px-6 py-4.5">
              <div class="flex items-center gap-3">
                <div class="flex-1 bg-white/5 border border-white/5 rounded-full h-2 max-w-[120px]">
                  <div
                    class="bg-[#ff71b8] h-full rounded-full shadow-[0_0_10px_rgba(255,113,184,0.3)]"
                    :style="{ width: skill.percentage + '%' }"
                  ></div>
                </div>
                <span class="text-xs font-semibold text-gray-400">
                  {{ skill.percentage }}%
                </span>
              </div>
            </td>
            <td class="px-6 py-4.5 flex justify-center gap-3">
              <button
                @click="openModal(skill)"
                class="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg transition-colors"
              >
                <i class="bi bi-pencil-square"></i>
              </button>
              <button
                @click="handleDelete(skill.id)"
                class="p-2 text-red-400 hover:text-red-300 bg-red-500/10 rounded-lg transition-colors"
              >
                <i class="bi bi-trash text-lg"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-[#141f26] w-full max-w-md rounded-3xl p-8 border border-white/10 shadow-2xl"
      >
        <h2 class="text-xl font-bold mb-6 text-[#ff71b8]">
          {{ isEdit ? 'Update' : 'Add New' }} Skill
        </h2>
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label class="block text-sm text-gray-400 mb-2">Skill Name</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#ff71b8] transition"
              required
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="relative dropdown-container">
              <label class="block text-sm text-gray-400 mb-2">Category</label>
              <div
                @click="isDropdownOpen = !isDropdownOpen"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 cursor-pointer flex justify-between items-center select-none"
              >
                <span class="capitalize">
                  {{ currentCategoryLabel }}
                </span>
                <i
                  class="bi bi-chevron-down transition-transform duration-200"
                  :class="{ 'rotate-180': isDropdownOpen }"
                ></i>
              </div>
              <ul
                v-if="isDropdownOpen"
                class="absolute w-full mt-2 bg-[#141f26] border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl"
              >
                <li
                  v-for="cat in categories"
                  :key="cat.value"
                  @click="selectCategory(cat.value)"
                  class="px-4 py-3 cursor-pointer hover:bg-[#ff71b8]/10 transition-colors text-sm"
                  :class="{ 'text-[#ff71b8] font-bold': form.category === cat.value }"
                >
                  {{ cat.label }}
                </li>
              </ul>
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Proficiency (%)</label>
              <input
                v-model.number="form.percentage"
                type="number"
                min="0"
                max="100"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#ff71b8] transition"
                required
              />
            </div>
          </div>
          <div class="flex gap-3 mt-8">
            <button
              type="button"
              @click="isModalOpen = false"
              class="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="skillStore.loading"
              class="flex-1 py-3 rounded-xl bg-[#ff71b8] hover:bg-[#ff5daa] font-bold text-black transition disabled:opacity-50"
            >
              {{ skillStore.loading ? 'Saving...' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSkillStore } from '../../skills/stores/skill.store'
import type { Skill } from '../types/skill.type'
const skillStore = useSkillStore()
const isModalOpen = ref(false)
const isEdit = ref(false)
const isDropdownOpen = ref(false)
const currentId = ref<number | null>(null)
const categories = [
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'Database', value: 'database' },
  { label: 'Tools', value: 'tools' },
] as const
const form = ref<Omit<Skill, 'id'>>({
  profile_id: 1,
  name: '',
  percentage: 0,
  category: 'frontend',
  is_featured: false,
  sort_order: 0,
})
const currentCategoryLabel = computed(() => {
  return categories.find(c => c.value === form.value.category)?.label || 'Frontend'
})
const openModal = (skill: Skill | null = null) => {
  isEdit.value = !!skill
  currentId.value = skill?.id || null
  form.value = skill
    ? {
        profile_id: skill.profile_id,
        name: skill.name,
        percentage: skill.percentage,
        category: skill.category,
        is_featured: skill.is_featured,
        sort_order: skill.sort_order,
      }
    : {
        profile_id: 1,
        name: '',
        percentage: 0,
        category: 'frontend',
        is_featured: false,
        sort_order: 0,
      }
  isModalOpen.value = true
}
const selectCategory = (val: 'frontend' | 'backend' | 'database' | 'tools') => {
  form.value.category = val
  isDropdownOpen.value = false
}
const handleSubmit = async () => {
  try {
    isEdit.value && currentId.value
      ? await skillStore.updateSkill(currentId.value, form.value)
      : await skillStore.createSkill(form.value)
    isModalOpen.value = false
  } catch (e) {
    alert(e)
  }
}
const handleDelete = async (id: number) => {
  if (window.confirm('Are you sure you want to delete this skill?')) {
    try {
      await skillStore.deleteSkill(id)
    } catch (e) {
      alert(e)
    }
  }
}
const closeDropdown = (e: MouseEvent) => {
  if (!(e.target as Element).closest('.dropdown-container')) {
    isDropdownOpen.value = false
  }
}
onMounted(() => {
  skillStore.fetchSkills()
  window.addEventListener('click', closeDropdown)
})
onUnmounted(() => {
  window.removeEventListener('click', closeDropdown)
})
</script>