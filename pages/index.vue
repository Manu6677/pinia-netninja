<template>
  <div>
    <header class="flex flex-col py-3">
      <h1>Hello, {{ name }}</h1>
      <div class="mx-auto flex">
        <TaskForm />
      </div>
    </header>

    <nav
      class="w-[600px] mx-auto py-2 items-center flex justify-end text-gray-600 pt-4"
    >
      <button
        class="mx-1 px-3 text-gray-800 bg-gray-200 rounded-md outline outline-offset-1 outline-2"
        @click="filter = 'all'"
      >
        All Tasks
      </button>
      <button
        class="mx-1 px-3 text-gray-800 bg-gray-200 rounded-md outline outline-2 outline-offset-2"
        @click="filter = 'fav'"
      >
        Fav Tasks
      </button>
      <button
        @click="store.$reset"
        class="mx-1 px-3 text-gray-800 bg-gray-200 rounded-md outline outline-2 outline-offset-2"
      >
        Reset
      </button>
    </nav>

    <main class="">
      <div v-if="filter === 'all'">
        <div class="mx-auto w-[600px] px-3 font-seri text-gray-600 text-lg">
          There are {{ totalCount }} tasks left to do
        </div>
        <div v-for="task in tasks">
          <TaskDetail :task="task" />
        </div>
      </div>

      <div v-if="filter === 'fav'">
        <p class="mx-auto w-[600px] px-3 font-seri text-gray-600 text-lg">
          Fav {{ favCount }} tasks left to do
        </p>
        <div v-for="task in favs">
          <TaskDetail :task="task" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useTaskStore } from "../stores/TaskStore";

const store = useTaskStore();
const { favCount, totalCount, favs, tasks, name } = storeToRefs(store);

// fetch tasks
store.getTasks();

const filter = ref("all");
</script>

<style scoped></style>
