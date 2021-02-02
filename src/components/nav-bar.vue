<template>
    <div class="absolute w-full bg-white border shadow-lg nav-bar">
        <div class="container flex flex-col items-center justify-between p-4 mx-auto my-auto md:flex-row">
            <div class="font-sans text-xl font-semibold text-indigo-500">TO-DO APP</div>
            <div class="flex items-center space-x-4">
                <div class="font-semibold text-gray-500">Hello {{ userEmail }}</div>
                <button class="px-4 py-1 text-gray-500 border border-gray-300 rounded" @click="$emit('logout')">
                    Logout
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IUser } from "../types/user";

export default defineComponent({
    name: "NavBar",
    emits: ["logout"],
    props: {
        userEmail: {
            type: String as PropType<IUser["email"]>,
            default: ""
        }
    }
})
</script>
