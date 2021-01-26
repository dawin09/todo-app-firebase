<template>
    <div class="flex flex-col items-center h-screen todo-app">
        <transition name="fade" mode="out-in">
            <div v-if="!isAppReady" class="absolute z-50 w-screen h-screen bg-white" />
        </transition>

        <transition-group name="fade" mode="out-in">
            <auth-form v-if="!isLoggedIn" key="auth-form" />
            <template v-else>
                <nav-bar key="nav-bar" :user-email="user.email" @logout="logout" />
                <div key="todos-box" class="mt-36 todos-container xl:w-1/2 2xl:w-1/4">
                    <h1 class="mb-4 text-6xl text-center text-indigo-500">
                        to-dos
                    </h1>
                    <div class="relative w-full overflow-hidden bg-white border border-gray-200 shadow-lg">
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
        </transition-group>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import { Todo } from "./types/todo";
import firebase from "firebase/app";
import firebaseApp from "./config/firebase";
const db = firebaseApp.database();
import AuthForm from "./components/auth-form.vue";
import NavBar from "./components/nav-bar.vue";

interface IUser {
    uid: string;
    email: string | null;
}

export default defineComponent({
    name: "TodoApp",
    components: {
        AuthForm,
        TodoItem: defineAsyncComponent(() => import("./components/todo-item.vue")),
        NavBar
    },
    data() {
        return {
            isLoadingUserSession: true,
            isLoadingTodos: true,
            visibility: "all",
            newTodo: "",
            todos: [] as Todo[],
            user: {
                email: "",
                uid: ""
            } as IUser
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
        },
        isAppReady(): boolean {
            return !this.isLoadingUserSession && !this.isLoadingTodos;
        },
        isLoggedIn(): boolean {
            return Boolean(this.user.uid);
        },
        userTodosPath(): string {
            return `users/${this.user.uid}/todos`;
        }
    },
    created() {
        this.setUser();
    },
    methods: {
        setUser(): void {
            firebaseApp.auth().onAuthStateChanged((user: firebase.User | null) => {
                this.isLoadingUserSession = false;

                if (user) {
                    this.user = user;
                    this.getUserTodos();
                } else {
                    this.isLoadingTodos = false;
                }
            })
        },
        getUserTodos(): void {
            db.ref(this.userTodosPath).on("value", (snap: firebase.database.DataSnapshot) => {
                if (snap.val()) {
                    this.todos = Object.values(snap.val());
                }

                this.isLoadingTodos = false;
            });
        },
        getRand(): string {
            return new Date().getTime().toString() + Math.floor(Math.random() * 1000000);
        },
        toggleCompleted(todoId: string, value: boolean): void {
            db.ref(this.userTodosPath).child(todoId).update({ isCompleted: value });
        },
        addTodo(): void {
            if (this.newTodo) {
                const newTodo: Todo = {
                    isCompleted: false,
                    title: this.newTodo,
                    id: `todo-${this.getRand()}`
                }
                db.ref(this.userTodosPath).child(newTodo.id).set(newTodo)
                this.newTodo = "";
            }
            this.newTodo = "";
        },
        editTodo(todoId: string, title: string): void {
            db.ref(this.userTodosPath).child(todoId).update({ title: title });
        },
        deleteTodo(todoId: string): void {
            db.ref(this.userTodosPath).child(todoId).remove();
        },
        clearCompleted(): void {
            this.completed.forEach(completedTodo => this.deleteTodo(completedTodo.id));
        },
        logout(): void {
            firebaseApp.auth().signOut();
            this.visibility = "all";
            this.newTodo = "";
            this.todos = [] as Todo[];
            this.user = {
                email: "",
                uid: ""
            } as IUser
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
