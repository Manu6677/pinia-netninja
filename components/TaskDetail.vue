<template>
    <div class="w-[600px] task flex mx-auto justify-between my-3 bg-white shadow-md rounded-md py-3 items-center px-3">
        <h2 class="px-3 font-semibold text-gray-600 font-serif">{{task.title}}</h2>
        <div class="space-x-3 text-gray-600 flex items-center">
            <i class="material-icons cursor-pointer" @click="deleteTaskFromArr(task.id)">delete</i>
            <i class="material-icons cursor-pointer" :class="{active: task.isFav}"  @click="addToFav(task.id)">favorite</i>
        </div>
    </div>
</template>

<script setup>
import { useTaskStore } from '../stores/TaskStore';
const store = useTaskStore()
const { task } = defineProps(["task"])

const deleteTaskFromArr = (id) => {
    store.deleteTask(id)
}

const addToFav = (id) => {
    store.addFav(id)
}
</script>

