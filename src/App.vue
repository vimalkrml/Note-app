<template>
  <header v-if="storeCounter.user">
    <div class="bg-white shadow-md py-3 px-4 md:py-4 md:px-6 lg:px-8 xl:px-10">
      <div
        class="container mx-auto flex flex-col md:flex-row justify-between items-center"
      >
        <div
          class="text-indigo-600 text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 md:mb-0"
        >
          Note App
        </div>
        <nav class="flex flex-wrap space-x-4 md:space-x-6">
          <RouterLink
            to="/"
            class="transition duration-300 ease-in-out border rounded hover:border-indigo-600 px-3 py-2 md:px-4 md:py-2"
            :class="{ 'active-link': $route.path === '/' }"
          >
            Notes
            <span v-if="fireStore.notes.length">({{ notesCount() }})</span>
          </RouterLink>
          <RouterLink
            to="/collaboration"
            class="transition duration-300 ease-in-out border rounded hover:border-indigo-600 px-3 py-2 md:px-4 md:py-2"
            :class="{ 'active-link': $route.path === '/collaboration' }"
          >
            Collaboration
          </RouterLink>
        </nav>
        <button
          @click="storeCounter.logout"
          class="bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import { onBeforeMount } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useFireStore } from "@/stores/firestore";

export default {
  setup() {
    const storeCounter = useAuthStore();
    const fireStore = useFireStore();

    const notesCount = () => {
      return fireStore.notes.length;
    };

    onBeforeMount(async () => {
      await storeCounter.fetchUser;
      await fireStore.fetchNotes;
    });

    return {
      storeCounter,
      fireStore,
      notesCount,
    };
  },
};
</script>
