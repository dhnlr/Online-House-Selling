<template>
  <div>
      <h1 class="title">Add Property</h1>
      <div class="field">
        <label class="label">Name</label>
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Name" :disabled="isprocess" v-model="name">
          <span class="icon is-small is-left">
            <i class="fa fa-address-card"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Description" :disabled="isprocess" v-model="description">
          <span class="icon is-small is-left">
            <i class="fa fa-book"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Location</label>
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Location" :disabled="isprocess" v-model="location">
          <span class="icon is-small is-left">
            <i class="fa fa-map"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Price</label>
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Price" :disabled="isprocess" v-model="price">
          <span class="icon is-small is-left">
            <i class="fa fa-money"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Bedroom</label>
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Bedroom" :disabled="isprocess" v-model="bedroom">
          <span class="icon is-small is-left">
            <i class="fa fa-bed"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Bathroom</label>
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Bathroom" :disabled="isprocess" v-model="bathroom">
          <span class="icon is-small is-left">
            <i class="fa fa-bath"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Kitchen</label>
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Kitchen" :disabled="isprocess" v-model="kitchen">
          <span class="icon is-small is-left">
            <i class="fa fa-spoon"></i>
          </span>
        </p>
      </div>
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <div class="field">
              <div class="file is-boxed is-primary has-name">
                <label class="file-label">
                  <input class="file-input" type="file" name="resume" :disabled="isprocess" @change="onFileChange">
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fa fa-upload"></i>
                    </span>
                    <span class="file-label">
                      Upload
                    </span>
                  </span>
                  <span class="file-name">
                    <p v-if="!imageName">Choose File</p>
                    <p v-else>{{ imageName}}</p>
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div class="level-item">
            <figure class="image is-128x128">
              <img :src="image">
            </figure>
          </div>
        </div>
      </nav>
      <div class="field is-grouped">
      <p class="control">
        <a class="button is-success" :class="{ is-loading: isprocess }" :disabled="isprocess" @click="submit()">
          Add
        </a>
      </p>
      <p class="control">
        <a class="button is-danger" :disabled="isprocess" @click="reset()">
          Reset
        </a>
      </p>
      <p class="control">
        <a class="button is-light" :disabled="isprocess" @click="cancel()">
          Cancel
        </a>
      </p>  
    </div>
    </div>
</template>

<script>
import * as axios from 'axios';

export default {

  name: 'addform',
  props : ['token'],
  data () {
    return {
      name : '',
      description : '',
      location : '',
      price : '',
      image: '',
      imageName: null,
      imagemetada : null,
      bedroom : '',
      bathroom : '',
      kitchen : '',
      isprocess: false
    }
  },
  methods: {
    cancel: function () {
      this.$emit('normal', true)
    },
    reset: function () {
      this.name = ''
      this.description = ''
      this.location= ''
      this.price= ''
      this.image = ''
      this.imageName= null
      this.imagemetada = null
      this.bedroom = ''
      this.bathroom = ''
      this.kitchen = ''
      this.isprocess = true
    },
    onFileChange(e) {
      console.log(e)
      console.log(this.token)
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.imageName = files[0].name
      this.imagemetada = files[0];
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    submit: function () {
      let _this = this;
      _this.isprocess = true
      let formdata = new FormData()
      formdata.append('name', this.name)
      formdata.append('description', this.description)
      formdata.append('location', this.location)
      formdata.append('price', this.price)
      formdata.append('image', this.imagemetada)
      formdata.append('bedroom', this.bedroom)
      formdata.append('bathroom', this.bathroom)
      formdata.append('kitchen', this.kitchen)
      axios.post(`http://35.196.201.48/houses/add`, formdata, {headers: {
        'content-type': 'multipart/form-data',
        'token' : _this.token
      }})
      .then( function (resp) {
        _this.name = ''
        _this.description = ''
        _this.location= ''
        _this.price= ''
        _this.image = ''
        _this.imageName= null
        _this.imagemetada = null
        _this.bedroom = ''
        _this.bathroom = ''
        _this.kitchen = ''
        _this.isprocess = false
        _this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>