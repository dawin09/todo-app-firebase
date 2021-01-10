<template>
    <div class="flex flex-col items-center h-screen mt-24 todo-app">
        <h1 class="mb-4 text-6xl text-red-300">
            todos
        </h1>
        <div class="relative w-full overflow-hidden bg-white border border-gray-200 shadow-lg xl:w-1/2 2xl:w-1/4">
            <div class="relative h-20 border-b shadow-inner-b">
                <div class="absolute text-2xl text-gray-300 transform -translate-y-1/2 left-5 top-1/2">
                    <span class="block transform rotate-90">❯</span>
                </div>
                <input
                    v-model="newTodo"
                    type="text"
                    class="w-full h-full pl-16 text-2xl"
                    placeholder="What needs to be done?"
                    @keyup.enter="addTodo"
                >
            </div>
            <transition-group name="slide-right" mode="out-in">
                <todo-item
                    v-for="todo in filteredList"
                    :key="todo.id"
                    :todo="todo"
                    @toggle-completed="toggleCompleted"
                    @delete-todo="deleteTodo"
                    @edit-todo="editTodo"
                />
            </transition-group>
            <div class="relative flex justify-between px-4 py-3 text-sm text-gray-500">
                <span>{{ active.length }} item left</span>
                <div class="absolute flex space-x-3 transform list-filters left-1/2 -translate-x-2/4">
                    <button :class="{ 'border' : visibility == 'all' }" class="px-2 border-gray-300 rounded" @click="visibility = 'all'">
                        All
                    </button>
                    <button :class="{ 'border' : visibility == 'active' }" class="px-2 border-gray-300 rounded" @click="visibility = 'active'">
                        Active
                    </button>
                    <button :class="{ 'border' : visibility == 'completed' }" class="px-2 border-gray-300 rounded" @click="visibility = 'completed'">
                        Completed
                    </button>
                </div>
                <button :class="{ 'hidden' : !completed.length }" class="hover:underline" @click="clearCompleted">
                    Clear Completed
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Firebase from "firebase/app";
import "firebase/database";
import { Todo } from "./types/todo";

const firebaseConfig = {
    apiKey: "AIzaSyDSlzi-R46ww9LPYPl0OtuSL2aiP7ICtF8",
    authDomain: "todo-app-65457.firebaseapp.com",
    databaseURL: "https://todo-app-65457-default-rtdb.firebaseio.com",
    projectId: "todo-app-65457",
    storageBucket: "todo-app-65457.appspot.com",
    messagingSenderId: "262976678452",
    appId: "1:262976678452:web:e9874b9c05fe1fa3e83861"
};

const app = Firebase.initializeApp(firebaseConfig);
const db = app.database();
const todosRef = db.ref("todos");
import TodoItem from "./components/todo-item.vue";

export default defineComponent({
    name: "TodoApp",
    components: {
        TodoItem
    },
    firebase: {
        todos: todosRef
    },
    data() {
        return {
            visibility: "all",
            newTodo: "",
            todos: [] as Todo[]
        }
    },
    computed: {
        filteredList(): Todo[] {
            // @ts-ignore
            return this[this.visibility];
        },
        all(): Todo[] {
            return this.todos;
        },
        active(): Todo[] {
            return this.todos.filter(todo => !todo.isCompleted);
        },
        completed(): Todo[] {
            return this.todos.filter(todo => todo.isCompleted);
        }
    },
    methods: {
        getRand(): string {
            return new Date().getTime().toString() + Math.floor(Math.random() * 1000000);
        },
        toggleCompleted(todoId: string, value: boolean): void {
            todosRef.child(todoId).update({ isCompleted: value })
        },
        addTodo(): void {
            if (this.newTodo) {
                const newTodo: Todo = {
                    isCompleted: false,
                    title: this.newTodo,
                    id: `todo-${this.getRand()}`
                }
                todosRef.child(newTodo.id).set(newTodo);
                this.newTodo = "";
            }
        },
        editTodo(todoId: string, value: string): void {
            todosRef.child(todoId).update({ title: value })
        },
        deleteTodo(todoId: string): void {
            todosRef.child(todoId).remove();
        },
        clearCompleted(): void {
            this.completed.forEach(completedTodo => {
                this.deleteTodo(completedTodo.id);
            });
        }
    }
});
</script>

<style>
.slide-right-item {
    display: inline-block;
    margin-right: 10px;
}
.slide-right-enter-active, .slide-right-leave-active {
    transition: all .5s;
}
.slide-right-enter-from, .slide-right-leave-to {
    opacity: 0;
    transform: translateX(-50px);
}
</style>
