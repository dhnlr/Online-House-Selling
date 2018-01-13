<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
    <div class="box is-radiusless">
      <div class="columns ">
        <div class="column is-two-fifths has-text-centered is-hidden-mobile">
            <img src="../assets/login.png" alt="Logo" class="gambar"> 
        </div>
        <div class="column has-text-centered">
            <!-- Login -->
            <h1 class="title">Welcome back</h1>
            <h2 class="subtitle">Time to manage your property</h2>
            <div class="message-body" v-if="warning">
              {{warning}}
            </div>
            <div class="field">
              <label class="label">Username</label>
              <p class="control has-icons-left">
                <input class="input is-rounded" :class="[goodusername ? '' : 'is-danger']" type="text" :disabled="isprocess" v-model="username">
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </p>
              <p class="help is-danger" v-if="!goodusername">Only alphabet and lowercase allowed</p>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <p class="control has-icons-left">
                <input class="input is-rounded" type="password" :disabled="isprocess" v-model="password">
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </p>
            </div>
            <div class="field is-grouped is-grouped-centered">
              <p class="control">
                <a class="button is-info is-rounded" :class="{ 'is-loading': isprocess }" :disabled="isprocess" @click="login()">
                  Signin
                </a>
              </p>
            </div>
            <!-- Login -->
            <p>Don't have an account yet? <router-link :to="{ path: '/signup' }">Sign Up</router-link></p>
        </div>
      </div>
    </div>
    </div>
    <router-link :to="{ path: '/' }"><button class="modal-close is-large" aria-label="close" ></button></router-link>
  </div>
</template>

<script>
import * as axios from 'axios';

export default {

  name: 'signin',
  props: ['token'],
  data () {
    return {
      isactive: true,
      username: '',
      password: null,
      isprocess: false,
      warning: null,
      goodusername: true
    }
  },
  methods: {
    login: function () {
      let _this = this
      _this.isprocess = true
      if ((/[a-z]/.test(this.username)) || this.username == this.username.toLowerCase()) {
        axios.post(`http://35.196.201.48/signin`, {
          username : _this.username,
          password : _this.password
        })
        .then( function (resp) {
          _this.username = ''
          _this.password = null
          localStorage.token = resp.data.data
          localStorage.userId = resp.data.userId
          _this.$emit('token', resp.data.data)
          _this.$emit('userId', resp.data.userId)
          _this.isprocess = false
          _this.warning = null
          _this.$router.push('/')
        })
      } else {
        _this.username = ''
        _this.password = null
        _this.isprocess = false
        _this.warning = "Only alphabet and lowercase allowed for username"
      }
    }
  },
  created: function (argument) {
    if (this.token) {
      this.$router.push('/')
    }
  },
  watch: {
    username: function () {
      if (this.username) {
        if (!(/[a-z]/.test(this.username)) || this.username !== this.username.toLowerCase()) {
          this.goodusername = false
        } else {
          this.goodusername = true
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
.title {
    color: #31221F;
}
.box {
  background-color: white;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  display: block;
  padding: 1.25rem;
}
.gambar {
  position: relative;
  height: auto;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
.button.is-rounded {
  border-radius: 290486px;
  padding-left: 1em;
  padding-right: 1em;
}
.input.is-rounded {
  border-radius: 290486px;
  padding-left: 1em;
  padding-right: 1em;
}
</style>