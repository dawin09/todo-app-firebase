<template>
    <div :class="{ 'is-completed' : todo.isCompleted, 'editing' : isEditing }" class="flex items-center text-2xl text-gray-700 border-b todo-item">
        <div class="relative w-8 h-8 ml-3 checkbox">
            <input
                :checked="todo.isCompleted"
                type="checkbox"
                name="todo-item"
                class="absolute w-full h-full opacity-0"
                @input="toggleCompleted"
            >
            <div class="w-full h-full border border-gray-400 rounded-full" />
        </div>
        <div class="relative flex-1 py-5">
            <label class="block w-full h-full pl-5 todo-title" @dblclick="showEditInput">{{ todo.title }}</label>
            <input
                ref="editTodoInput"
                :value="todo.title"
                type="text"
                class="absolute top-0 left-0 hidden w-full h-full pl-5 border border-gray-400 shadow-inner"
                @keyup.enter="editTodo($event.target.value)"
                @blur="editTodo($event.target.value)"
            >
        </div>
        <div class="absolute items-center hidden space-x-3 text-xs text-white todo-actions right-5">
            <button class="px-2 py-1 bg-blue-500 rounded" @click="showEditInput">
                Edit
            </button>
            <button class="px-2 py-1 bg-red-500 rounded" @click="deleteTodo">
                Delete
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Todo } from "../types/todo";

export default defineComponent({
    name: "TodoItem",
    props: {
        todo: {
            type: Object as PropType<Todo>,
            required: true
        }
    },
    data() {
        return {
            isEditing: false
        }
    },
    methods: {
        toggleCompleted() {
            this.$emit("toggle-completed", this.todo.id, !this.todo.isCompleted);
        },
        showEditInput() {
            this.isEditing = true;
            this.$nextTick(() => {
                const input = this.$refs.editTodoInput as HTMLInputElement;
                input.focus();
            })
        },
        editTodo(value: string) {
            this.isEditing = false;
            if (value.trim()) {
                this.$emit("edit-todo", this.todo.id, value);
            }
        },
        deleteTodo() {
            this.$emit("delete-todo", this.todo.id);
        }
    }
})
</script>

<style lang="scss">
.todo-item {
    &.editing {
        .checkbox {
            opacity: 0;
            pointer-events: none;
        }

        input[type=text] {
            display: block;
        }
    }

    &.is-completed {
        input[type=checkbox] + div {
            border-color: #5dc2af;
            background-image: url("../assets/icons/tick.svg");
            background-size: 60%;
            background-repeat: no-repeat;
            background-position: center;
        }

        .todo-title {
            text-decoration: line-through;
            opacity: .3;
        }
    }

    &:hover:not(.editing) {
        .todo-actions {
            display: flex;
        }
    }
}
</style>
