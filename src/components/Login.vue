<template class="bg-gray-700">
  <header>
  <div id="app" class='my-20 bg-gray-700'>
        <div id="nologin" v-if="!loggedin">
            <div id="loginform" class="w-2/5 m-auto">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 focus:outline-none focus:shadow-outline float-left rounded-tl-xl" @click="handleToggleLogIn">Login</button>
                <button class="bg-purple-500 hover:bg-purple-700 text-white font-bold px-4 focus:outline-none focus:shadow-outline float-left rounded-tr-xl" @click="handleToggleSignUp">Sign Up</button>
                <br/>
                <fieldset v-if="signupHidden" class="bg-white shadow-md rounded-3xl rounded-tl-none px-8 pb-8 mb-4 pt-9 bg-blue-500">
                  <img src="https://i.imgur.com/iL0DbSW.png" alt="Movie Mania Logo" class='mx-auto'>
                    <p class='text-white font-bold'>LOGIN</p>
                    <br/>
                    <span class="material-icons md-light md-36 align-middle mr-1">account_circle</span>
                    <input type="text" placeholder="username" v-model="loginUsername" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/5" /><br/><br/>
                    <span class="material-icons md-light md-36 align-middle mr-1">key</span>
                    <input type="password" placeholder="password" v-model="loginPassword" class="shadow appearance-none border rounded w-3/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br/><br/>
                    <button @click="handleLogin" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
                </fieldset>
                <fieldset v-if="loginHidden" class="bg-white shadow-md rounded-3xl rounded-tl-none px-8 pt-9 pb-8 mb-4 bg-purple-500">
                  <img src="https://i.imgur.com/iL0DbSW.png" alt="Movie Mania Logo" class='mx-auto'>
                    <p class='text-white font-bold'>SIGN UP</p>
                    <br/>
                    <span class="material-icons md-light md-36 align-middle mr-1">account_circle</span>
                    <input type="text" placeholder="username" v-model="createUsername" class="shadow appearance-none border rounded w-3/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br/><br/>
                    <span class="material-icons md-light md-36 align-middle mr-1">key</span>
                    <input type="password" placeholder="password" v-model="createPassword" class="shadow appearance-none border rounded w-3/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br/><br/>
                    <button @click="handleSignup" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</button>
                </fieldset>
            </div>
        </div>
        <div id="login" v-if="loggedin">
          <div class="flex flex-col h-screen overflow-hidden">
          <main class="flex-1 overflow-y-scroll">
            <p class="text-yellow-500 font-bold"><span class="text-indigo-400">Welcome</span> {{ user.username }}</p><br/>
            <Search />
            <details>
              <summary class="bg-white hover:bg-gray-400 text-gray-600 font-bold px-4 focus:outline-none focus:shadow-outline rounded-tr-3xl rounded-tl-3xl w-4/5 mx-auto">Closest Movie Theater</summary>
              <ShowTheaters />
            </details>
            <button @click="handleLogout" class="text-yellow-500 font-bold">Logout</button>
          </main>
          <footer class="w-full text-center border-t border-grey p-4"><Footer /></footer>
        </div>
        </div>
      </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import Search from './Search'
import ShowTheaters from './ShowTheaters'
import Footer from './Footer'

export default {
  components: { Search, ShowTheaters, Footer },
  setup () {
    const loggedin = ref(false)
    const JWT = ref('')
    const createUsername = ref('')
    const createPassword = ref('')
    const loginUsername = ref('')
    const loginPassword = ref('')
    const devURL = ref('http://localhost:3000')
    const prodURL = ref('https://railsmoviebackend.herokuapp.com')
    const user = ref(null)
    const token = ref(null)
    const URL = ref('')
    const signupHidden = ref(true)
    const loginHidden = ref(false)

    const handleToggleSignUp = () => {
      loginHidden.value = true
      signupHidden.value = false
    }

    const handleToggleLogIn = () => {
      signupHidden.value = true
      loginHidden.value = false
    }

    const handleLogin = () => {
      URL.value = prodURL.value ? prodURL.value : devURL.value
      user.value = { username: loginUsername.value, password: loginPassword.value }
      fetch(`${URL.value}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user.value)
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            alert('error logging in')
          } else {
            user.value = data.user
            token.value = data.token
            loggedin.value = true
            loginPassword.value = ''
            loginUsername.value = ''
            window.sessionStorage.setItem('login', JSON.stringify(data))
          }
        })
    }

    const handleLogout = () => {
      loggedin.value = false
      user.value = null
      token.value = null
      window.sessionStorage.removeItem('login')
    }

    const handleSignup = () => {
      URL.value = prodURL.value ? prodURL.value : devURL.value
      user.value = { username: createUsername.value, password: createPassword.value }
      fetch(`${URL.value}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user.value)
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            alert('Sign Up Unsuccessful')
          } else {
            user.value = data.user
            token.value = data.token
            loggedin.value = true
            createPassword.value = ''
            createUsername.value = ''
            window.sessionStorage.setItem('login', JSON.stringify(data))
            alert('Sign Up Successful')
          }
        })
    }

    return {
      loggedin,
      JWT,
      createUsername,
      createPassword,
      loginUsername,
      loginPassword,
      devURL,
      prodURL,
      user,
      token,
      URL,
      handleLogout,
      handleLogin,
      handleSignup,
      loginHidden,
      signupHidden,
      handleToggleLogIn,
      handleToggleSignUp
    }
  },

  created () {
    const getLogin = JSON.parse(window.sessionStorage.getItem('login'))
    if (getLogin) {
      this.user = getLogin.user
      this.token = getLogin.token
      this.loggedin = true
    }
  }

}

</script>
<style>
  @import 'https://fonts.googleapis.com/icon?family=Material+Icons';
</style>
