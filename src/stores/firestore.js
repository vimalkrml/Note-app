// useFireStore.js
import { defineStore } from "pinia";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const useFireStore = defineStore("firestore", {
  state: () => ({
    notes: [],
  }),
  actions: {
    async createNote({ data }) {
      try {
        const docRef = await addDoc(collection(db, "title"), {
          title: data,
        });
        console.log(docRef);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },

    async fetchNotes() {
      try {
        const notesCollection = collection(db, "title");
        const getData = await getDocs(notesCollection);

        const notes = [];
        getData.forEach((doc) => {
          notes.push({ id: doc.id, ...doc.data() });
        });

        this.notes = notes;
      } catch (error) {
        console.error("Error fetching notes: ", error);
      }
    },
    async deleteStoreNote({ noteId }) {
      console.log(noteId);
      try {
        const noteDelete = doc(db, "title", noteId);
        await deleteDoc(noteDelete);
        await this.fetchNotes();
      } catch (error) {
        console.error("Error deleting note: ", error);
      }
    },
  },
});
