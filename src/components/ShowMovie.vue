<template>
  <div>
    <h1>Movie</h1>
    <button @click="printmovie">Movie</button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    movie: Object
  },
  setup () {
    const printmovie = () => {
      console.log(movie)
    }

    return { printmovie }
  }
}

</script>
