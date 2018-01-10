<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box is-radiusless">
      <div class="columns">
        <div class="column is-two-fifths has-text-centered is-hidden-mobile">
            <img src="../assets/login.png" alt="Logo" class="gambar"> 
        </div>
        <div class="column has-text-centered">
            <!-- Login -->
            <h1 class="title">Join us</h1>
            <h2 class="subtitle">Publish your property advertising.</h2>
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
              <label class="label">Fullname</label>
              <p class="control has-icons-left">
                <input class="input is-rounded" type="text" :disabled="isprocess" v-model="fullname">
                <span class="icon is-small is-left">
                  <i class="fa fa-id-card"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <label class="label">Phone Number</label>
              <div class="control has-icons-left">
                <input class="input is-rounded" type="text" :disabled="isprocess" v-model="contact">
                <span class="icon is-small is-left">
                  <i class="fa fa-phone"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <p class="control has-icons-left">
                <input class="input is-rounded" :class="[samepassword ? '' : 'is-danger']" type="password" :disabled="isprocess" v-model="password">
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <label class="label">Verification Password</label>
              <p class="control has-icons-left">
                <input class="input is-rounded" :class="[samepassword ? '' : 'is-danger']" type="password" :disabled="isprocess" v-model="verifpassword">
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </p>
              <p class="help is-danger" v-if="!samepassword">Password not confirmed</p>
            </div>
            <div class="field is-grouped is-grouped-centered">
              <p class="control">
                <a class="button is-primary is-rounded" :class="{ is-loading: isprocess }" :disabled="isprocess" @click="signup()">
                  Signup
                </a>
              </p>
            </div>
            <!-- Login -->
            <p>Already have an account? <router-link :to="{ path: '/signin' }">Sign In</router-link></p>
        </div>
      </div>
    </div>
    </div>
    <router-link :to="{ path: '/' }"><button class="modal-close is-large" aria-label="close"></button></router-link>
  </div>
</template>

<script>
import * as axios from 'axios';

export default {

  name: 'signup',

  data () {
    return {
      username: null,
      fullname: null,
      contact: null,
      password: null,
      verifpassword: null,
      samepassword: true,
      goodusername: true,
    }
  },
  methods: {
    signup: function () {
      let _this = this
      if (this.username && this.fullname && this.contact && this.password && this.verifpassword) {
        if ((/[a-z]/.test(this.username)) || this.username == this.username.toLowerCase()) {
          if (_this.password == _this.verifpassword) {
            axios.post(`http://35.196.201.48/signup`, {
              username: _this.username,
              fullname: _this.fullname,
              contact: _this.contact,
              password: _this.password
            })
            .then(function () {
              _this.password = null
              _this.verifpassword = null
              _this.username = null
              _this.contact = null
              _this.fullname = null
            })
            .catch(error => {
              _this.isprocess = false
              _this.warning = error.response.data.error.errors.username.message
            })
          } else {
            _this.samepassword = true
            _this.goodusername = true
            _this.password = null
            _this.verifpassword = null
            _this.username = null
            _this.contact = null
            _this.fullname = null
            _this.isprocess = false
            _this.warning = "Make sure confirmation password same as your password"
          }
        } else {
          _this.samepassword = true
          _this.goodusername = true
          _this.password = null
          _this.verifpassword = null
          _this.username = null
          _this.contact = null
          _this.fullname = null
          _this.isprocess = false
          _this.warning = "Only alphabet and lowercase allowed for username"
        }
      } else {
        _this.samepassword = true
        _this.goodusername = true
        _this.isprocess = false
        _this.warning = "All column is required."
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