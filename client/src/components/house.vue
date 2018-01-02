<template>
<div>
	<div class="columns">
		<div class="col has-text-centered">
			<figure class="image image is-square">
			  <img src="https://bulma.io/images/placeholders/256x256.png">
			</figure>
		</div>
		<div class="col">
			<h1 class="title">{{name}}</h1>
			<h2 class="subtitle">{{location}}</h2>
			<hr>
			<p>{{description}}</p>
			<div class="column">
				<div class="col"><i class="fa fa-bed"></i> Bedroom {{bedroom}}</div>
				<div class="col"><i class="fa fa-bath"></i> Bathroom {{bathroom}}</div>
				<div class="col"><i class="fa fa-spoon"></i> Kitchen {{kitchen}}</div>
			</div>
			<hr>
		</div>
	</div>
	<section class="hero">
	  <div class="hero-body">
	    <img :src="map" alt="map">
	  </div>
	</section>
	<nav class="level">
		<div class="level-left">
	   		<div class="level-item">
	   			Contact:
	   		</div>
	   	</div>
	   	<div class="level-right">
	   		<div class="level-item">
	   			<p>{{seller.name}}</p>
	   			<p>{{seller.phone}}</p>
	   		</div>
	   	</div>
	</nav>
</div>
</template>

<script>
import * as axios from 'axios';

export default {

  name: 'house',

  data () {
    return {
    	name: '',
    	description: '',
    	location: '',
    	image: '',
    	price: '',
    	bedroom: '',
    	bathroom: '',
    	kitchen: '',
    	map: '',
    	seller: [],
    }
  },
  created: function (){
  	let _this = this
  	axios.get(`http://localhost:3000/houses/${_this.$route.params.id}`)
  	.then( function (resp) {
  		_this.name = resp.data.data[0].name
  		_this.description = resp.data.data[0].description
  		_this.location = resp.data.data[0].location
  		_this.image = resp.data.data[0].image
  		_this.price = resp.data.data[0].price
  		_this.bedroom = resp.data.data[0].bedroom
  		_this.bathroom = resp.data.data[0].bathroom
  		_this.kitchen = resp.data.data[0].kitchen
  		_this.seller = resp.data.data[0].seller
  	})
  	axios.post(`http://maps.googleapis.com/maps/api/geocode/json?address=${_this.location}`)
  	.then( function (resp) {
  		_this.map="//maps.googleapis.com/maps/api/staticmap?size=1306x359&maptype=roadmap&key=&center="+resp.results[0].geometry.location.lat+","+resp.results[0].geometry.location.lng+"&markers=color:blue%7Clabel:S%7C"+resp.results[0].geometry.location.lat+"%7C"+resp.results[0].geometry.location.lng
  		
  	})
  }
}
</script>

<style lang="css" scoped>
</style>