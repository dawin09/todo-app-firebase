<template>
    <div class="absolute z-10 flex flex-col justify-center w-full p-5 mt-36 md:shadow-xl md:p-10 lg:p-20 md:w-1/2 2xl:w-1/4">
        <div class="mb-10 text-center">
            <h1 class="text-3xl font-bold text-gray-900 capitalize">{{ authLabel }}</h1>
            <p>Enter your information to {{ authLabel }}</p>
        </div>
        <Form @submit="isLogin ? signIn() : signUp()" v-slot="{ errors }">
            <div class="flex">
                <div class="w-full px-3 mb-5">
                    <label for="" class="px-1 text-xs font-semibold" :class="{ 'text-red-600' : errors.email }">Email</label>
                    <div class="flex flex-col">
                        <Field
                            v-model="email"
                            name="email"
                            rules="required|email"
                            type="email"
                            :class="{ 'border-red-600' : errors.email }"
                            class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg outline-none focus:border-indigo-500"
                            placeholder="johnsmith@example.com" />
                        <span class="pl-1 mt-1 text-red-600">{{ errors.email }}</span>
                    </div>
                </div>
            </div>
            <div class="flex">
                <div class="w-full px-3 mb-12">
                    <label for="" class="px-1 text-xs font-semibold" :class="{ 'text-red-600' : errors.password }">Password</label>
                    <div class="flex flex-col">
                        <Field
                            v-model="password"
                            name="password"
                            rules="required"
                            type="password"
                            :class="{ 'border-red-600' : errors.password }"
                            class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg outline-none focus:border-indigo-500"
                            placeholder="********" />
                        <span class="pl-1 mt-1 text-red-600">{{ errors.password }}</span>
                    </div>
                </div>
            </div>
            <p class="mb-6 text-center">{{`${isLogin ? 'Don\'t' : 'Already'} have an account?`}} <button type="button" class="text-indigo-600" @click="isLogin = !isLogin">Sign {{ isLogin ? 'up' : 'in'}}</button></p>
            <div class="flex">
                <div class="w-full px-3 mb-5">
                    <button class="block w-full max-w-xs px-3 py-3 mx-auto font-semibold text-white capitalize bg-indigo-500 rounded-lg hover:bg-indigo-700 focus:bg-indigo-700">{{ authLabel }}</button>
                </div>
            </div>
        </Form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import firebaseApp from "../config/firebase";
import { Field, Form } from "vee-validate";

export default defineComponent({
    name: "AuthForm",
    data() {
        return {
            isLogin: true,
            email: "",
            password: ""
        };
    },
    components: {
        Field,
        Form
    },
    computed: {
        authLabel(): string {
            return this.isLogin ? "sign in" : "sign up";
        }
    },
    methods: {
        signIn(): void {
            firebaseApp.auth().signInWithEmailAndPassword(this.email, this.password)
                .catch((error: Error) => {
                    alert(error.message);
                });
        },
        signUp(): void {
            firebaseApp.auth().createUserWithEmailAndPassword(this.email, this.password)
                .catch((error: Error) => {
                    alert(error.message);
                });
        }
    }
})
</script>
