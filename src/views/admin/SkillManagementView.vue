<template>
  <div class="p-6 bg-black min-h-screen text-white">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-[#ff71b8]">Skill Management</h1>

      <button
        @click="openModal()"
        class="bg-[#ff71b8] hover:bg-[#ff5daa] px-5 py-2 rounded-xl font-bold transition-all shadow-lg shadow-[#ff71b8]/20"
      >
        <i class="bi bi-plus-lg mr-2"></i>
        Add Skill
      </button>
    </div>

    <div class="bg-black rounded-2xl overflow-hidden border border-white/10">
      <table class="w-full text-left border-collapse">
        <thead class="bg-white/5 text-sm uppercase text-gray-400">
          <tr>
            <th class="px-6 py-4">Skill</th>
            <th class="px-6 py-4">Category</th>
            <th class="px-6 py-4">Proficiency</th>
            <th class="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-white/5">
          <tr
            v-for="skill in skillStore.adminSkills"
            :key="skill.id"
            class="hover:bg-white/5 transition"
          >
            <td class="px-6 py-4 font-medium">
              {{ skill.name }}
            </td>

            <td class="px-6 py-4">
              <span
                class="px-3 py-1 rounded-full text-xs bg-pink-500/10 text-[#ff71b8] border border-[#ff71b8]/20 capitalize"
              >
                {{ skill.category }}
              </span>
            </td>

            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="flex-1 bg-gray-700 rounded-full h-1.5 max-w-[100px]">
                  <div
                    class="bg-[#ff71b8] h-1.5 rounded-full"
                    :style="{ width: skill.percentage + '%' }"
                  ></div>
                </div>

                <span class="text-xs text-gray-400">
                  {{ skill.percentage }}%
                </span>
              </div>
            </td>

            <td class="px-6 py-4 flex justify-center gap-4">
              <button
                @click="openModal(skill)"
                class="text-yellow-400 hover:text-yellow-300"
              >
                <i class="bi bi-pencil-square text-lg"></i>
              </button>

              <button
                @click="handleDelete(skill.id)"
                class="text-red-400 hover:text-red-300"
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
        class="bg-[#1e293b] w-full max-w-md rounded-3xl p-8 border border-white/10 shadow-2xl"
      >
        <h2 class="text-xl font-bold mb-6 text-[#ff71b8]">
          {{ isEdit ? 'Update' : 'Add New' }} Skill
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label class="block text-sm text-gray-400 mb-2">
              Skill Name
            </label>

            <input
              v-model="form.name"
              type="text"
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#ff71b8]"
              required
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="relative dropdown-container">
              <label class="block text-sm text-gray-400 mb-2">
                Category
              </label>

              <div
                @click="isDropdownOpen = !isDropdownOpen"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 cursor-pointer flex justify-between items-center"
              >
                <span class="capitalize">
                  {{ categories.find(c => c.value === form.category)?.label }}
                </span>

                <i
                  class="bi bi-chevron-down transition-transform"
                  :class="{ 'rotate-180': isDropdownOpen }"
                ></i>
              </div>

              <ul
                v-if="isDropdownOpen"
                class="absolute w-full mt-2 bg-[#1e293b] border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl"
              >
                <li
                  v-for="cat in categories"
                  :key="cat.value"
                  @click="selectCategory(cat.value)"
                  class="px-4 py-3 cursor-pointer hover:bg-[#ff71b8]/10 transition-colors"
                  :class="{ 'text-[#ff71b8] font-bold': form.category === cat.value }"
                >
                  {{ cat.label }}
                </li>
              </ul>
            </div>

            <div>
              <label class="block text-sm text-gray-400 mb-2">
                Proficiency (%)
              </label>

              <input
                v-model.number="form.percentage"
                type="number"
                min="0"
                max="100"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#ff71b8]"
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
              class="flex-1 py-3 rounded-xl bg-[#ff71b8] hover:bg-[#ff5daa] font-bold transition disabled:opacity-50"
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useSkillStore } from '@/stores/skill.store'
import type { Skill, SkillRequest } from '@/types/skill'

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
]

const form = ref<SkillRequest>({
  profile_id: 1,
  name: '',
  percentage: 0,
  category: 'frontend',
  is_featured: false,
  sort_order: 0,
})

const openModal = (skill: Skill | null = null) => {
  isEdit.value = !!skill
  currentId.value = skill?.id || null

  form.value = skill
    ? { ...skill }
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

const selectCategory = (val: any) => {
  form.value.category = val
  isDropdownOpen.value = false
}

const handleSubmit = async () => {
  try {
    isEdit.value && currentId.value
      ? await skillStore.editSkill(currentId.value, form.value)
      : await skillStore.addSkill(form.value)

    isModalOpen.value = false
  } catch (e) {
    alert(e)
  }
}

const handleDelete = async (id: number) => {
  if (window.confirm('Are you sure you want to delete this skill?')) {
    try {
      await skillStore.removeSkill(id)
    } catch (e) {
      alert(e)
    }
  }
}

// Close dropdown when clicking outside
const closeDropdown = (e: MouseEvent) => {
  if (!(e.target as Element).closest('.dropdown-container')) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  skillStore.fetchAdminSkills()
  window.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  window.removeEventListener('click', closeDropdown)
})
</script>