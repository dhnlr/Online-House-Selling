<template>
  <div class="konten">
    <div class="columns" v-for="house in houselist">
      <article class="media">
        <figure class="media-left" @click="onehouse(house._id)">
          <p class="image is-128x128">
            <img :src="house.image">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <h1 class="title" @click="onehouse(house._id)">{{house.name}}</h1>
            <p @click="onehouse(house._id)">{{house.location}}</p>
          </div>
        </div>
        <div class="media-right" v-if="house.seller._id == userId">
          <router-link 
            :token="token"
            :to="{ name: 'edit', params: { id: house._id }}" 
            >
            <i class="fa fa-edit"></i>
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
  props: ['houselist', 'token', 'userId'],
  data () {
    return {
    }
  },
  methods : {
    onehouse: function (id) {
      console.log(id)
      this.$router.push({ name: 'house', params: { id: id }})
    },
    destroy: function (id) {
      axios.delete(`http://35.196.201.48/${id}`)
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
  .konten{
    padding-top: 2em;
  }
  .media{
    width: 100%;
  }
  .media-content{
    width: 100%;
  }
</style>
