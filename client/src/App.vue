<template>
  <div id="app">
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </a>
      <button class="button navbar-burger" data-target="navMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div class="navbar-menu navbar-end" id="navMenu">
      <router-link :to="{ path: '/signin' }" v-if="!token" class="navbar-item">Signin</router-link>
      <router-link :to="{ path: '/signup' }" v-if="!token" class="navbar-item">Signup</router-link>
      <a href="" v-show="token" @click="signout()" class="navbar-item">Signout</a>
    </div>
  </nav>
  <span class="lines-bg"></span>
  <section class="hero is-bold is-fullheight">
    <div class="hero-body">
      <div class="container is-fluid">
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title">
                  Online House Selling
                </h1>
            <div class="field has-addons search">
              <p class="control is-expanded">
                <input class="input cari" type="text" placeholder="Find a property" v-model="searchque">
                <div class="select cari">
                  <select class="cari" v-model="searchcat">
                    <option>Location</option>
                    <option>Name</option>
                  </select>
                </div>
              </p>
              <p class="control">
                <a class="button is-info cari" @click="searchfun">
                  Search
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="container is-fluid badan">
    <div class="field is-grouped is-grouped-right tambah" v-show="token">
      <p class="control">
        <a class="button is-primary" @click="addform()">
          Add
        </a>
      </p>
      <p class="control">
        <a class="button is-primary" @click="alllist()">
          All List
        </a>
      </p>
      <p class="control">
        <a class="button is-primary" @click="mylist()">
          My List
        </a>
      </p>
    </div>
    <router-view :houselist="houses" :token="token" @token="token = $event" @userId="userId = $event"v-show="normal" ></router-view>
    <addform v-if="!normal" @normal="normal = $event" :token="token"></addform>
  </div>
</div>

</template>

<script>
import * as axios from 'axios';
import addform from './components/addform.vue'

export default {
  name: 'app',
  components: {
    addform,
  },
  data () {
    return {
      houses: [],
      token: null,
      userId: null,
      normal: true,
      searchque: '',
      searchcat: 'Location',
    }
  },
  methods: {
    addform: function () {
      this.normal = false
    },
    signout: function () {
      this.token = null
      this.userId = null
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    },
    alllist: function () {
      let _this = this
      axios.get(`http://localhost:3000/houses`)
      .then(function (resp) {
        _this.houses = resp.data.data
      })
    },
    mylist: function () {
      let _this = this
      axios.get(`http://localhost:3000/houses/seller/${_this.userId}`)
      .then(function (resp) {
        _this.houses = resp.data.data
      })
    },
    searchfun: function () {
      let _this = this
      if (_this.searchcat == 'Location') {
        axios.get(`http://localhost:3000/location?q=${_this.searchque}`)
        .then(function (resp) {
          _this.houses = resp.data.data
        })
      } else if (_this.searchcat == 'Name') {
        axios.get(`http://localhost:3000/name?q=${_this.searchque}`)
        .then(function (resp) {
          _this.houses = resp.data.data
        })
      }
    },
  },
  mounted: function () {
    let _this = this;
    document.addEventListener('DOMContentLoaded', function () {
      var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(function ($el) {
          $el.addEventListener('click', function () {
            // Get the target from the "data-target" attribute
            var target = $el.dataset.target;
            var $target = document.getElementById(target);
            // Toggle the class on both the "navbar-burger" and the "navbar-menu"
            $el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
          });
        });
      }
    })
  },
  created: function () {
    let _this = this;
    _this.token = localStorage.getItem('token')
    _this.userId = localStorage.getItem('userId')
    axios.get(`http://localhost:3000/houses`)
    .then(function (resp) {
      _this.houses = resp.data.data
    })
  }
}
</script>

<style>
  .lines-bg{
    position: absolute;
    opacity: .25;
    background-size: cover;
    width: 100%;
    height: 100%;
    z-index: -999;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-image: url('./assets/background.jpeg');
  }
  @media only screen and (max-device-width: 1024px) {
      .lines-bg {
          background-attachment: scroll;
      }
  }
  @media only screen and (max-device-width: 400px){
    .search {
        max-width: 100% !important;
      }
  }
  .search {
    max-width: 80%;
    margin: 2rem auto;
    box-shadow: 0 2px 4px 0 rgba(228,228,228,0.5);
  }
  .title {
    color: #31221F;
  }
  .input.cari {
    height: 3em;
    border: 0px;
  }
  .button.cari{
    height: 3em;
  }
  select.cari{
    height: 3em;
    border: 0px;
  }
  .select.cari{
    height: 3em;
    border: 0px;
  }
  .badan {
    padding-top: 1em;
  }
  .tambah {
    border-top: 1px dashed #ccc;
    border-bottom: 1px dashed #ccc;
    padding: 5px 0;
  }
</style>
