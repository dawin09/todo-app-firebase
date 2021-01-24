<template>
    <div class="absolute w-full bg-white border shadow-lg nav-bar">
        <div class="container flex items-center justify-between py-4 mx-auto my-auto">
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
import { defineComponent } from "vue"
export default defineComponent({
    name: "NavBar",
    props: {
        userEmail: {
            type: String,
            default: ""
        }
    }
})
</script>
