<template>
  <br/><br/>
  <div v-if="coordinates">
    <span class="material-icons md-light md-36">
      movie
    </span><p class="text-yellow-400">{{ place.candidates[0].name }}</p>
    <p class="text-white">{{ place.candidates[0].formatted_address }}</p>
    <p class="text-white">Rating: {{ place.candidates[0].rating }}</p>
    <p class="text-green-200" v-if="place.candidates[0].opening_hours.open_now">Open Now</p>
    <br/><br/>
  </div>
  <button @click="handlePlace" class="bg-white hover:bg-gray-400 text-gray-600 font-bold px-4 focus:outline-none focus:shadow-outline rounded-tr-3xl rounded-tl-3xl w-4/5 mx-auto py-2">Find</button>
  <GMapMap class='mx-auto'
      :center=center
      :zoom="5"
      ref="myMapRef"
      map-type-id="terrain"
      style="width: 80vw; height: 500px"
  >
  <GMapCluster :zoomOnClick="true">
    <GMapMarker v-if="coordinates"
        :position="{ lat: lat, lng: lng }"
        @click="center={ lat: lat, lng: lng }"
        :clickable="true"
    />
  </GMapCluster>
  </GMapMap>

</template>

<script >
import { ref } from 'vue'

const GOOGLE_MAPS_API_KEY = process.env.VUE_APP_GOOGLE_KEY

export default {
  setup () {
    const place = ref({})
    const lat = ref('')
    const lng = ref('')
    const coordinates = ref(false)

    const handlePlace = (e) => {
      fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=movie&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${GOOGLE_MAPS_API_KEY}`, {
        method: 'GET'
      }).then(response => response.json())
        .then(data => {
          place.value = data
          console.log(data)
          lat.value = data.candidates[0].geometry.location.lat
          lng.value = data.candidates[0].geometry.location.lng
          coordinates.value = true
        })
    }

    return {
      handlePlace,
      center: { lat: 39.8097343, lng: -98.5556199 },
      lat,
      lng,
      coordinates,
      place
    }
  }
}
</script>
