<template>
  <div
    v-if="showNote"
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
  >
    <div class="bg-white shadow-lg rounded-lg p-6 w-96 text-gray-800">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-semibold">Create Note</h2>
        <button
          @click="closeNote"
          class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full transition duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <form>
        <div class="mt-4">
          <!-- <label for="noteTitle" class="block text-sm font-medium"
            >Note Title</label
          > -->
          <input
            v-model="noteData"
            type="text"
            id="noteTitle"
            class="border rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter note title..."
          />
        </div>
      </form>
      <div class="flex justify-center mt-6">
        <button
          @click="localcreateNote"
          class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useFireStore } from "@/stores/firestore";

export default {
  props: {
    showNote: Boolean,
  },
  setup(props, context) {
    const isopen = ref(props.showNote);
    const noteData = ref("");
    const fireStore = useFireStore();

    const localcreateNote = async () => {
      await fireStore.createNote({ data: noteData.value });
      closeNote();
    };

    const closeNote = () => {
      isopen.value = false;
      context.emit("closeNote");
    };

    watch(noteData, (newValue) => {
      console.log(newValue);
    });
    return {
      isopen,
      fireStore,
      localcreateNote,
      closeNote,
      noteData,
    };
  },
};
</script>
