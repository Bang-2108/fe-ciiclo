<template>
  <div class="font-poppins">
    <form @submit.prevent="handleSubmit" class="bg-[#161616] border border-white/5 rounded-[40px] p-6 flex flex-col gap-6">
      <div class="bg-[#0f0f0f] p-8 md:p-10 rounded-[32px] border border-white/5 flex flex-col gap-6">
        <h3 class="text-white text-[20px] font-bold border-l-4 border-[#ff71b8] pl-[15px]">
          Identity Information
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="block text-white text-[14px] font-semibold mb-2 ml-[5px]">
              Full Name:
            </label>
            <input
              v-model="formData.name"
              placeholder="Zoan Thi Bang"
              required
              class="w-full bg-black/40 border border-white/5 p-[15px] rounded-xl text-[#ddd] text-[15px] outline-none transition-all duration-300 focus:border-[#ff71b860]"
            />
          </div>
          <div>
            <label class="block text-white text-[14px] font-semibold mb-2 ml-[5px]">
              Position:
            </label>
            <input
              v-model="formData.role"
              placeholder="Full Stack Developer"
              required
              class="w-full bg-black/40 border border-white/5 p-[15px] rounded-xl text-[#ddd] text-[15px] outline-none transition-all duration-300 focus:border-[#ff71b860]"
            />
          </div>
        </div>
        <div>
          <label class="block text-white text-[14px] font-semibold mb-2 ml-[5px]">
            Education / Academic Background:
          </label>
          <input
            v-model="formData.education"
            placeholder="e.g., Passerelles Numeriques Vietnam / Danang Vocational Training College"
            required
            class="w-full bg-black/40 border border-white/5 p-[15px] rounded-xl text-[#ddd] text-[15px] outline-none transition-all duration-300 focus:border-[#ff71b860]"
          />
        </div>
        <div>
          <label class="block text-white text-[14px] font-semibold mb-2 ml-[5px]">
            Short Objective:
          </label>
          <input
            v-model="formData.objective"
            placeholder="Write a short personal objective..."
            class="w-full bg-black/40 border border-white/5 p-[15px] rounded-xl text-[#ddd] text-[15px] outline-none transition-all duration-300 focus:border-[#ff71b860]"
          />
        </div>
        <div>
          <label class="block text-white text-[14px] font-semibold mb-2 ml-[5px]">
            Detailed Biography:
          </label>
          <textarea
            v-model="formData.bio"
            placeholder="Write an introduction about yourself..."
            class="w-full h-[120px] resize-none bg-black/40 border border-white/5 p-[15px] rounded-xl text-[#ddd] text-[15px] outline-none transition-all duration-300 focus:border-[#ff71b860]"
          ></textarea>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-[#0f0f0f] p-8 md:p-10 rounded-[32px] border border-white/5">
          <h3 class="text-white text-[20px] font-bold border-l-4 border-[#ff71b8] pl-[15px] mb-[35px]">
            Profile Picture
          </h3>
          <div class="flex justify-center">
            <div class="relative w-[210px] h-[210px]">
              <img
                :src="previewAvatar || profileStore.profile?.avatar"
                class="w-full h-full rounded-full object-cover border-4 border-white/5"
              />
              <label class="absolute inset-0 rounded-full flex flex-col items-center justify-center cursor-pointer bg-black/20 transition-all duration-300 hover:bg-black/35">
                <div class="w-[52px] h-[52px] rounded-full bg-[#ff71b8] flex items-center justify-center shadow-[0_0_18px_rgba(255,113,184,0.35)] transition-all duration-300 hover:scale-110">
                  <i class="bi bi-camera-fill text-black text-[22px]"></i>
                </div>
                <span class="text-white text-[13px] font-medium mt-[14px] text-center leading-[18px]">
                  Click the image <br />
                  to change
                </span>
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleAvatarChange"
                />
              </label>
            </div>
          </div>
        </div>
        <div class="bg-[#0f0f0f] p-8 md:p-10 rounded-[32px] border border-white/5">
          <h3 class="text-white text-[20px] font-bold border-l-4 border-[#ff71b8] pl-[15px] mb-[35px]">
            CV Document (PDF)
          </h3>
          <div>
            <label class="flex flex-col items-center justify-center border border-dashed border-white/5 rounded-[28px] cursor-pointer transition-all duration-300 min-h-[190px] hover:border-[#ff71b840] hover:bg-[#ff71b805]">
              <i class="bi bi-file-earmark-pdf-fill text-[#ff71b8] text-[38px] mb-[16px]"></i>
              <span class="text-white text-[13px] font-medium text-center leading-[22px]">
                {{
                  cvFile
                    ? cvFile.name
                    : profileStore.profile?.cv_path
                      ? 'Current CV is ready'
                      : 'Upload CV (PDF)'
                }}
              </span>
              <input
                type="file"
                accept=".pdf"
                class="hidden"
                @change="handleCvChange"
              />
            </label>
            <div
              v-if="profileStore.profile?.cv_path"
              class="text-[#4ade80] text-[12px] font-medium text-right mt-[12px]"
            >
              <i class="bi bi-check-circle-fill"></i>
              Publicly visible
            </div>
          </div>
        </div>
      </div>
      <div class="bg-[#0f0f0f] p-8 md:p-10 rounded-[32px] border border-white/5">
        <h3 class="text-white text-[20px] font-bold border-l-4 border-[#ff71b8] pl-[15px] mb-[30px]">
          Professional Statistics
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div class="bg-black/40 p-[25px] rounded-[22px] text-center border border-white/[0.03] transition-all duration-300 hover:border-[#ff71b820] hover:bg-[#151515]">
            <label class="block text-white text-[14px] font-semibold mb-[12px]">
              Projects
            </label>
            <input
              v-model.number="formData.stats_projects"
              type="number"
              class="w-full bg-transparent text-[36px] text-center outline-none text-[#ff71b8] font-bold"
            />
          </div>
          <div class="bg-black/40 p-[25px] rounded-[22px] text-center border border-white/[0.03] transition-all duration-300 hover:border-[#ff71b820] hover:bg-[#151515]">
            <label class="block text-white text-[14px] font-semibold mb-[12px]">
              Internships
            </label>
            <input
              v-model.number="formData.stats_internships"
              type="number"
              class="w-full bg-transparent text-[36px] text-center outline-none text-[#ff71b8] font-bold"
            />
          </div>
          <div class="bg-black/40 p-[25px] rounded-[22px] text-center border border-white/[0.03] transition-all duration-300 hover:border-[#ff71b820] hover:bg-[#151515]">
            <label class="block text-white text-[14px] font-semibold mb-[12px]">
              Years of Study
            </label>
            <input
              v-model.number="formData.stats_experience"
              type="number"
              class="w-full bg-transparent text-[36px] text-center outline-none text-[#ff71b8] font-bold"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button
          type="submit"
          :disabled="profileStore.loading"
          class="bg-[#ff71b8] text-black px-10 py-[14px] rounded-xl text-[14px] font-bold tracking-[0.3px] transition-all duration-300 shadow-[0_0_18px_rgba(255,113,184,0.25)] hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(255,113,184,0.35)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <i v-if="profileStore.loading" class="bi bi-arrow-repeat animate-spin mr-2"></i>
          {{ profileStore.loading ? 'Saving Changes...' : 'Save Changes' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useProfileStore } from '../stores/profile.store'

const profileStore = useProfileStore()
const previewAvatar = ref<string | null>(null)
const avatarFile = ref<File | null>(null)
const cvFile = ref<File | null>(null)

const formData = reactive({
  name: '',
  role: '',
  bio: '',
  education: '',
  objective: '',
  stats_experience: 0,
  stats_projects: 0,
  stats_internships: 0,
})

const loadProfile = async () => {
  await profileStore.fetchProfile()
  if (profileStore.profile) {
    Object.assign(formData, {
      name: profileStore.profile.name || '',
      role: profileStore.profile.role || '',
      bio: profileStore.profile.bio || '',
      education: profileStore.profile.education || '',
      objective: profileStore.profile.objective || '',
      stats_experience: profileStore.profile.stats_experience || 0,
      stats_projects: profileStore.profile.stats_projects || 0,
      stats_internships: profileStore.profile.stats_internships || 0,
    })
  }
}

onMounted(loadProfile)

const handleAvatarChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    avatarFile.value = file
    previewAvatar.value = URL.createObjectURL(file)
  }
}

const handleCvChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    cvFile.value = file
  }
}

const handleSubmit = async () => {
  try {
    const data = new FormData()
    data.append('_method', 'PUT')
    data.append('name', formData.name)
    data.append('role', formData.role)
    data.append('bio', formData.bio)
    data.append('education', formData.education)
    data.append('objective', formData.objective)
    data.append('stats_experience', String(formData.stats_experience))
    data.append('stats_projects', String(formData.stats_projects))
    data.append('stats_internships', String(formData.stats_internships))
    
    if (avatarFile.value) {
      data.append('avatar', avatarFile.value)
    }
    if (cvFile.value) {
      data.append('cv_file', cvFile.value)
    }
    
    await profileStore.updateProfile(data)
    alert('Profile updated successfully!')
    
    avatarFile.value = null
    cvFile.value = null
    previewAvatar.value = null
    await loadProfile()
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to update profile!'
    alert(errorMessage)
  }
}
</script>