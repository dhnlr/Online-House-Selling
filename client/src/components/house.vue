<template>
<div>
	<div class="columns">
		<div class="column has-text-centered">
			<figure class="image image is-square">
			  <img :src="image">
			</figure>
		</div>
		<div class="column">
			<h1 class="title">{{name}}</h1>
			<h2 class="subtitle">{{location}}</h2>
			<hr>
			<p class="subtitle">{{description}}</p>
			<hr>
			<nav class="level">
			  <div class="level-item has-text-centered">
			    <div>
			      <p class="heading"><i class="fa fa-bed"></i><br>Bedroom</p>
			      <p class="title">{{bedroom}}</p>
			    </div>
			  </div>
			  <div class="level-item has-text-centered">
			    <div>
			      <p class="heading"><i class="fa fa-bath"></i><br>Bathroom</p>
			      <p class="title">{{bathroom}}</p>
			    </div>
			  </div>
			  <div class="level-item has-text-centered">
			    <div>
			      <p class="heading"><i class="fa fa-spoon"></i><br>Kitchen</p>
			      <p class="title">{{kitchen}}</p>
			    </div>
			  </div>
			</nav>
			<hr>
			<img :src="map" alt="map">
			<hr>
			<p class="heading">Contact</p>
			<nav class="level">
				<div class="level-left">
			   		<div class="level-item">
			   			<p class="subtitle">{{seller.fullname}}</p>
			   		</div>
			   	</div>
			   	<div class="level-right">
			   		<div class="level-item has-text-centered">
	   					<p class="subtitle">{{seller.phone}}</p>
			   		</div>
			   	</div>
			</nav>
		</div>
	</div>
	
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
  	axios.get(`http://35.196.201.48/houses/${_this.$route.params.id}`)
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
  		let locationMap = _this.location.split(' ').join('+')
  	 	axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
	        params: {
	          address: _this.location
	        }
	      })
	  	.then( function (resp) {
	  		_this.map= '//maps.googleapis.com/maps/api/staticmap?size=900x200&maptype=roadmap&key=AIzaSyAos5IQmvJk_VoKzQuHQM1debRTobqELV4&center="'+resp.data.results[0].geometry.location.lat+","+resp.data.results[0].geometry.location.lng+'"&markers=color:blue%7Clabel:LOCATION%7C'+resp.data.results[0].geometry.location.lat+','+resp.data.results[0].geometry.location.lng
	  	})
  	})
  }
}
</script>

<style lang="css" scoped>
  .columns{
    padding: 2em 0;
  }
</style>