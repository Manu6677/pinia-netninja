import { defineStore } from "pinia";

// return value is fn itself
export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    isLoading: false,
    name: "Yoshi",
  }),
  getters: {
    favs() {
      return this.tasks.filter((t) => t.isFav);
    },

    favCount() {
      return this.tasks.reduce((acc, curr) => {
        return curr.isFav ? acc + 1 : acc;
      }, 0);
    },

    totalCount: (state) => {
      return state.tasks.length;
    },
  },

  actions: {
    async getTasks() {
      this.isLoading = true;
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      this.tasks = data;
      this.isLoading = false;
    },

    async addTask(task) {
      this.tasks.push(task);

      try {
        const data = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          body: JSON.stringify(task),
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        console.log(err.message);
      }
    },

    async deleteTask(id) {
      this.tasks = this.tasks.filter((it) => {
        return it.id != id;
      });

      try {
        const res = await fetch("http://localhost:3000/tasks/" + id, {
          method: "DELETE",
        });
      } catch(err) {
        console.log(err.message);
      }
    },

    async addFav(id) {
      const task = this.tasks.find((it) => it.id == id);
      task.isFav = !task.isFav;
      try {
        const data = await fetch("http://localhost:3000/tasks/" + id, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({isFav: task.isFav})
        });
      } catch(err) {
        console.log(err.message)
      }
    },
  },
});
