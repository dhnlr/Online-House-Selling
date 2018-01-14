<template>
  <div class="konten container is-fluid">
    <div class="columns" v-for="house in houselist">
      <div class="column column is-11 is-offset-1 is-mobile">
      <article class="media">
        <figure class="media-left" @click="onehouse(house._id)">
          <p class="image">
            <img :src="house.image" class="image">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <h1 class="title" @click="onehouse(house._id)">{{house.name}}</h1>
            <p class="subtitle" @click="onehouse(house._id)">{{house.location}}</p>
            <p @click="onehouse(house._id)">{{house.description}}</p>
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
    padding-left: 0.25em;
  }
  .column{
    padding: 0.75em 0 !important;
  }
  .konten{
    padding-top: 3em;
  }
  .media-content{
    width: 100%;
  }
  img{
    height: 100%;
    width: auto;
  }
  article{
    margin: 0 2em;
    padding: 1em;
    -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  }
  p{
    white-space: pre-wrap;
  }
  .image {
    height: 200px;
    width: 200px;
  }
</style>
