<template>
  <div class="items-center flex justify-center">
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="i need to..." v-model="task"  class="px-2 rounded-md py-1"/>
      <button class="font-sans px-3 bg-yellow-300 rounded-md text-gray-500 text-lg ml-2" type="submit"> Add </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/TaskStore";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const store = useTaskStore();
const task = ref(null);

const handleSubmit = () => {
  console.log("done");
  console.log(task.value);
  if (task.value.length > 0) {
    store.addTask({
      title: task.value,
      isFav: false,
      id: Math.floor(Math.random() * 10000),
    });
    toast("Task Added", {
      transition: toast.TRANSITIONS.BOUNCE,
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  task.value = "";
};
</script>
