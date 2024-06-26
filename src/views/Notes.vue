<template>
  <div>
    <div v-if="fireStore.notes.length > 0">
      <div
        class="flex items-center p-3"
        v-for="note in fireStore.notes"
        :key="note.id"
      >
        <div class="w-1/6 pr-4">
          <ul class="pl-4 space-y-2">
            <li class="mb-2">
              {{ note.title }}
            </li>
          </ul>
        </div>
        <div class="w-4/6 bg-gray-200 rounded p-4">
          <h2 class="text-xl font-semibold mb-4">{{ note.title }}</h2>
          <p>Description</p>
        </div>
        <div class="w-1/6 flex justify-end">
          <button
            @click="deleteNote(note.id)"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
          >
            Delete Note
          </button>
        </div>
      </div>
    </div>

    <div class="text-center mt-8 sm:mt-16 md:mt-24 lg:mt-32 xl:mt-48" v-else>
      <h1 class="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 lg:mb-8">
        There are no notes here.
      </h1>
      <button
        @click="openNote"
        class="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        Create New Note
      </button>
      <CreateNote :showNote="showNote" @closeNote="closeNote" />
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import CreateNote from "../components/CreateNote.vue";
import { useFireStore } from "@/stores/firestore";

export default {
  components: {
    CreateNote,
  },
  setup() {
    const fireStore = useFireStore();

    const showNote = ref(false);

    const openNote = () => {
      showNote.value = true;
    };

    const closeNote = async () => {
      await fireStore.fetchNotes();
      showNote.value = false;
    };

    const deleteNote = async (noteId) => {
      console.log(noteId);
      await fireStore.deleteStoreNote({ noteId });
    };

    onBeforeMount(async () => {
      await fireStore.fetchNotes;
    });

    return {
      fireStore,
      showNote,
      openNote,
      closeNote,
      deleteNote,
    };
  },
};
</script>
