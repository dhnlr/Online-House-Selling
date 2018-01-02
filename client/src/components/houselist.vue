<template>
  <div>
    <div class="columns" v-for="house in houselist">
      <article class="media" @click="onehouse(house._id)">
        <figure class="media-left">
          <p class="image is-is-128x128">
            <img :src="house.image">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <h1 class="title">{{house.name}}</h1>
            <h2 class="subtitle">{{house.location}}</h2>
          </div>
        </div>
        <div class="media-right" v-if="house.seller._id == userId">
          <router-link 
            :to="{ path: '/edit' }" 
            :id="house._id"
            :name="house.name"
            :description="house.description"
            :location="house.location"
            :price="house.price"
            :image="house.image"
            :bedroom="house.bedroom"
            :bathroom="house.bathroom"
            :kitchen="house.kitchen"
            :token="token"
            >
            <i class="fa fa-edit" @click="edit()"></i>
          </router-link>
          <button class="delete" @click="destroy(house._id)"></button>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import * as axios from 'axios';

export default {
  name: 'houselist',
  props: ['houselist', 'token'],
  data () {
    return {
    }
  },
  methods : {
    onehouse: function (id) {
      this.$router.push({ name: 'house', params: { userId: id }})
    },
    destroy: function (id) {
      axios.delete(`http://localhost:3000/${id}`)
      .then( function (resp) {
        location.reload()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    border-left: 3px solid #31221F;
    color: #31221F;
  }
</style>
