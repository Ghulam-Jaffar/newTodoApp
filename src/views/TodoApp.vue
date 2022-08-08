<template>
    <div class="w-screen h-screen flex flex-col items-center  bg-black">
        <div class="absolute right-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white cursor-pointer mr-2 mt-2 md:mr-7 md:mt-5"
                viewBox="0 0 20 20" fill="currentColor" @click="handleSignOut" v-if="isLoggedIn">
                <path fill-rule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clip-rule="evenodd" />
            </svg>
        </div>
        <div
            class="w-full md:w-6/12 xl:w-4/12 2xl:w-3/12 flex absolute top-16 flex-col justify-center items-center bg-black">
            <div class="flex w-full flex-col items-center">
                <p class='text-5xl font-bold w-full  mt-10 text-white'>Todo App</p>

            </div>
            <div class="flex flex-col justify-center items-center mt-10">
                <TodoTable />
            </div>
        </div>

    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from "vue-router"
import TodoTable from '@/components/TodoTable.vue'

export default {
    name: "TodoApp",
    setup() {
        let auth;
        const isLoggedIn = ref(false);
        const router = useRouter();
        onMounted(() => {
            auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                console.log(isLoggedIn.value);
                if (user) {
                    console.log(user);
                    isLoggedIn.value = true;
                    console.log(isLoggedIn.value);
                }
                else {
                    isLoggedIn.value = false;
                }
            });
        });
        const handleSignOut = () => {
            signOut(auth).then(() => {
                router.push("/");
            });
        };

        return {

            handleSignOut,
            isLoggedIn
        };
    },
    components: { TodoTable }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
