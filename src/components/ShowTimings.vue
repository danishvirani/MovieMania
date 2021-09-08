<template>
  <div class="bg-white shadow-inner shadow-xl rounded-3xl px-8 pb-8 mb-4 pt-9 w-2/5 m-auto md:w-3/5">
      <img src="https://i.imgur.com/iL0DbSW.png" alt="Movie Mania Logo" class='mx-auto'>
  <form @submit.prevent="handleUserZip">
    <input type="text" class="shadow appearance-none border rounded-l-3xl pl-9 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/5 rounded-r-none" placeholder="ZIPCODE" v-model="userZipInput">
    <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1.5 px-4 rounded-3xl focus:outline-none focus:shadow-outline rounded-l-none" type="submit"><span class="material-icons md-light md-36 align-middle">search</span></button>
  </form>
</div>
  <div class="flex justify-center items-center py-20 mx-auto">
  <div class="md:px-4 md:flex md:flex-cols-2 lg:flex-cols-3 gap-5 space-y-4 md:space-y-0 flex-wrap mx-20 h-24">
    <div v-for="timing in timings" :key="timing" class="h-auto">
    <div class="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
      <h2 class="mb-3 text-2xl font-bold text-indigo-600">{{ timing.title }}</h2>
      <div class="my-4">
        <div class="flex space-x-1 items-center">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <p>Release Date: {{ timing.releaseDate }}</p>
        </div><br/>
        <div class="flex space-x-1 items-center">
          <p class='text-left'>{{ timing.longDescription }}</p>
        </div>
        <details>
          <summary class="mt-4 text-xl w-full text-white bg-indigo-600 py-1.5 rounded-xl shadow-lg">Show Times</summary><br/>
          <div v-for="showtime in timing.showtimes" :key="showtime">
            <p class="font-bold text-indigo-600">{{ showtime.theatre.name }}</p><br/>
            <p>{{ showtime.quals }}</p>
            <p class="font-bold">{{ showtime.dateTime.replace(/T/g,' ') }}</p>
            <br/>
            <a :href="showtime.ticketURI" class="mt-4 text-md w-full text-white bg-indigo-600 py-1.5 px-1.5 rounded-xl shadow-lg ">Buy Tickets</a>
            <br/><br/>
          </div>
        </details>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const userZipInput = ref('')
    const date = ref('')
    const timings = ref([])

    const handleUserZip = (e) => {
      currentDate()
      fetch(`http://data.tmsapi.com/v1.1/movies/showings?startDate=${date.value}&zip=${userZipInput.value}&api_key=${process.env.VUE_APP_TMSKEY}`, {
        method: 'GET'
      }).then(response => response.json())
        .then(data => {
          timings.value = data
          console.log(timings)
        })
    }

    const currentDate = () => {
      const current = new Date()
      date.value = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
    }

    return {
      userZipInput,
      handleUserZip,
      date,
      currentDate,
      timings
    }
  }
}
</script>
