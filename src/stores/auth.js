import { defineStore } from "pinia";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import router from "../router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    async register({ email, password }) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.user = userCredential.user;
      } catch (error) {
        alert(error.message);
        console.error("Registration Error:", error.message);
      }
    },

    async login({ email, password }) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.user = userCredential.user;
        router.push("/");
      } catch (error) {
        alert(error.message);
        console.error("Login Error:", error.message);
      }
    },

    async logout() {
      try {
        await signOut(auth);
        this.user = null;
        router.push("/login");
      } catch (error) {
        console.error("Logout Error:", error.message);
      }
    },

    fetchUser() {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          this.user = null;
        } else {
          this.user = user;
          console.log(this.user);
          if (router.isReady() && router.currentRoute.value.path === "/login") {
            router.push("/");
          }
        }
      });
    },
  },
});
