<template>
  <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold px-4 focus:outline-none focus:shadow-outline rounded-tl-xl" @click="handleToggleMovie">Movies</button>
  <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold px-4 focus:outline-none focus:shadow-outline rounded-tr-xl"
   @click="handleToggleShowtimes">Showtimes</button>
  <div v-if="ShowtimeSearchHidden" class="bg-white shadow-inner shadow-xl rounded-3xl px-8 pb-8 mb-4 pt-9 w-2/5 m-auto md:w-3/5">
      <img src="https://i.imgur.com/iL0DbSW.png" alt="Movie Mania Logo" class='mx-auto'>
  <form @submit.prevent="handleUserSearch">
    <input type="text" v-model="userSearchInput" class="shadow appearance-none border rounded-l-3xl pl-9 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/5 rounded-r-none" placeholder="Search For a Movie"/>
    <button type="submit" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1.5 px-4 rounded-3xl focus:outline-none focus:shadow-outline rounded-l-none"><span class="material-icons md-light md-36 align-middle">search</span></button>
  </form>
  </div>
  <ShowTimings v-if="movieSearchHidden"/>
  <div v-if="movie.Title && ShowtimeSearchHidden">
    <br/><br/>
    <main class="grid place-items-center my-20">
      <section class="flex flex-col md:flex-row gap-11 py-10 px-5 bg-white rounded-md shadow-lg w-full md:max-w-6xl rounded-3xl">
        <div class="text-indigo-500 justify-between w-full">
          <img :src="movie.Poster" class='w-full' />
        </div>
        <div class="text-indigo-500">
          <h3 class="uppercase text-black text-2xl font-medium">{{ movie.Title }}</h3>
          <h3 class="text-2xl font-semibold mb-7">{{ movie.Year }}</h3>
          <small class="text-black">Plot: {{ movie.Plot }}</small>
          <div class="flex gap-0.5 mt-4">
            <details class="mx-auto">
              <summary class="bg-indigo-600 hover:bg-indigo-500 cursor-pointer focus:outline-none transition text-white uppercase px-8 py-3 mx-auto">More Details</summary><br/>
              <h2><span class='text-black'>Rated:</span> {{ movie.Rated }}</h2>
              <h3><span class='text-black'>Director:</span> {{ movie.Director }}</h3>
              <h3><span class='text-black'>Runtime:</span> {{ movie.Runtime }}</h3>
              <h3><span class='text-black'>Genre:</span> {{ movie.Genre }}</h3>
              <h3><span class='text-black'>Actors:</span> {{ movie.Actors }}</h3>
              <h3><span class='text-black'>Box Office:</span> {{ movie.BoxOffice }}</h3>
              <h3><span class='text-black'>Metascore:</span> {{ movie.Metascore }}</h3>
              <h3><span class='text-black'>Production:</span> {{ movie.Production }}</h3>
            </details>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue'
import ShowTimings from './ShowTimings'

export default {
  components: { ShowTimings },
  setup () {
    const userSearchInput = ref('')
    const movie = ref({})
    const movieSearchHidden = ref(true)
    const ShowtimeSearchHidden = ref(false)

    const handleToggleShowtimes = () => {
      movieSearchHidden.value = true
      ShowtimeSearchHidden.value = false
    }

    const handleToggleMovie = () => {
      movieSearchHidden.value = false
      ShowtimeSearchHidden.value = true
    }

    const handleUserSearch = (e) => {
      fetch(`http://www.omdbapi.com/?t=${userSearchInput.value.replace(/ /g, '+')}&plot=full&apikey=${process.env.VUE_APP_OMDBKEY}`, {
        method: 'GET'
      }).then(response => response.json())
        .then(data => {
          movie.value = data
        })
    }

    return {
      userSearchInput,
      handleUserSearch,
      movie,
      movieSearchHidden,
      ShowtimeSearchHidden,
      handleToggleShowtimes,
      handleToggleMovie
    }
  }
}
</script>
