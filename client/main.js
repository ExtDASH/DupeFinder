import api from './helper/api.js'
const app = new Vue({
	el: "#app",
	data: {
		
	},
	created: function(){},
	methods: {
		postData: function(){
			api.CSVDATA().then(res => console.log(res))
		},
	},
})