<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
  >
    <div
      class="bg-white p-8 shadow-md rounded-md flex flex-col items-center space-y-6"
    >
      <h1 class="text-3xl font-semibold mb-4">
        {{ isRegisterMode ? "Register" : "Login" }}
      </h1>
      <button
        @click="toggleMode"
        class="text-indigo-600 font-medium underline cursor-pointer mb-4"
      >
        {{
          isRegisterMode
            ? "Already have an account? Login here."
            : "Don't have an account? Register here."
        }}
      </button>
      <form @submit.prevent="validMode" class="w-full">
        <!-- Registration form fields -->
        <template v-if="isRegisterMode">
          <div class="mb-4 w-full">
            <label for="email" class="block text-sm font-medium">Email</label>
            <input
              v-model="registerData.email"
              type="email"
              id="email"
              class="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div class="mb-6 w-full">
            <label for="password" class="block text-sm font-medium"
              >Password</label
            >
            <input
              v-model="registerData.password"
              type="password"
              id="password"
              class="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </template>
        <!-- Login form fields -->
        <template v-else>
          <div class="mb-4 w-full">
            <label for="loginEmail" class="block text-sm font-medium"
              >Email</label
            >
            <input
              v-model="loginData.email"
              type="email"
              id="loginEmail"
              class="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div class="mb-6 w-full">
            <label for="loginPassword" class="block text-sm font-medium"
              >Password</label
            >
            <input
              v-model="loginData.password"
              type="password"
              id="loginPassword"
              class="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </template>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white font-semibold rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          {{ isRegisterMode ? "Register" : "Login" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import emailValidator from "email-validator";

export default {
  setup() {
    const isRegisterMode = ref(true);
    const registerData = ref({
      email: "",
      password: "",
    });

    const loginData = ref({
      email: "",
      password: "",
    });

    const toggleMode = () => {
      isRegisterMode.value = !isRegisterMode.value;
    };

    const storeCounter = useAuthStore();

    const validateEmail = (email) => {
      return emailValidator.validate(email);
    };

    const onRegister = async () => {
      if (!validateEmail(registerData.value.email)) {
        alert("Please enter a valid email address.");
        return;
      }

      await storeCounter.register(registerData.value);
      registerData.value.email = "";
      registerData.value.password = "";
    };

    const onLogin = async () => {
      await storeCounter.login(loginData.value);
      loginData.value.email = "";
      loginData.value.password = "";
    };

    const validMode = () => {
      return isRegisterMode.value ? onRegister() : onLogin();
    };

    return {
      registerData,
      loginData,
      storeCounter,
      isRegisterMode,
      toggleMode,
      onRegister,
      onLogin,
      validMode,
    };
  },
};
</script>
