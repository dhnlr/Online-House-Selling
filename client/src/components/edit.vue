<template>
  <div>
      <h1 class="title">Add Property</h1>
      <div class="field">
        <label class="label">Name</label>
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Name" v-model="name">
          <span class="icon is-small is-left">
            <i class="fa fa-address-card"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Description" v-model="description">
          <span class="icon is-small is-left">
            <i class="fa fa-book"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Location</label>
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Location" v-model="location">
          <span class="icon is-small is-left">
            <i class="fa fa-map"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Price</label>
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Price" v-model="price">
          <span class="icon is-small is-left">
            <i class="fa fa-money"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Bedroom</label>
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Bedroom" v-model="bedroom">
          <span class="icon is-small is-left">
            <i class="fa fa-bed"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Bathroom</label>
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Bathroom" v-model="bathroom">
          <span class="icon is-small is-left">
            <i class="fa fa-bath"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Kitchen</label>
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Kitchen" v-model="kitchen">
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
              <div class="file is-boxed is-success has-name">
                <label class="file-label">
                  <input class="file-input" type="file" name="resume" @change="onFileChange">
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
        <a class="button is-warning" @click="submit()">
          Edit
        </a>
      </p>
      <p class="control">
        <router-link :to="/" class="button is-light">Cancel</router-link>
      </p> 
    </div>
    </div>
</template>

<script>
import * as axios from 'axios';

export default {

  name: 'edit',
  props : ['token', 'name', 'description', 'location', 'price', 'image', 'bedroom', 'bathroom', 'kitchen'], 
  data () {
    return {
      imageName: null,
      imagemetada : null,
    }
  },
  methods: {
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
      let formdata = new FormData()
      formdata.append('name', this.name)
      formdata.append('description', this.description)
      formdata.append('location', this.location)
      formdata.append('image', this.imagemetada)
      formdata.append('bedroom', this.bedroom)
      formdata.append('bathroom', this.bathroom)
      formdata.append('kitchen', this.kitchen)
      axios.put(`http://localhost:3000/houses/${_this.id}`, formdata, {headers: {
        'content-type': 'multipart/form-data',
        'token' : _this.token
      }})
      .then( function (resp) {
        console.log(resp)
        _this.$emit('normal', true)
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
        _this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>