<template>
  <div class="w-screen h-screen flex flex-col items-center  bg-black">
    <div class="w-full md:w-6/12 xl:w-4/12 2xl:w-3/12 flex absolute top-16 flex-col justify-center items-center">
      <p class="text-white mt-3 mb-4 text-5xl font-bold">Login</p>
      <div class="w-10/12 flex flex-col justify-center items-center">
        <input class="p-3 m-3 rounded border-2 w-full focus:border-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          placeholder="Enter your email" type="email" v-model="email">
        <input class="p-3 m-3 rounded border-2 w-full focus:border-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          placeholder="Enter your password" type="password" v-model="password">
        <p v-if="errMsg" class="text-red-500">{{ errMsg }}</p>
        <button class="p-3 text-white rounded bg-sky-400 m-3 focus:outline-none hover:bg-sky-500 w-full"
          @click="login">Login</button>

      </div>
      <div class="flex justify-between w-full mt-5">
        <p class="text-sky-500 cursor-pointer" @click="loginWithGoogle">Login with Google</p>
        <router-link to="/signup" class="text-sky-500"> Register?</router-link>
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from "vue-router"
export default {
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const errMsg = ref()

    const login = () => {
      signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then(() => {
          console.log("successfully logged in")
          router.push('/todoApp')
        }).catch(err => {
          console.log(err)
          switch (err.code) {
            case 'auth/user-not-found':
              errMsg.value = 'User not found'
              break;
            case 'auth/wrong-password':
              errMsg.value = 'Wrong password'
              break;
            case 'auth/invalid-email':
              errMsg.value = 'Invalid email'
              break;
            default:
              errMsg.value = 'Something went wrong'
              break;
          }
        })
    }
    const loginWithGoogle = () => {
      const provider = new GoogleAuthProvider()
      signInWithPopup(getAuth(), provider)
        .then(res => {
          console.log(res.user)
          router.push('/todoApp')
        }).catch(err => {
          console.log(err)
        })
    }
    return {
      email,
      password,
      login,
      errMsg,
      loginWithGoogle
    }
  }
}
</script>

<style lang="scss" scoped>
</style>