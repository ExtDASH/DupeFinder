import api from './helper/api.js'
const app = new Vue({
	el: "#app",
	data: {
		csvDatPull: {},
		baseNums: {},
	},
	created: function(){
		api.CSVDATA()
			.then(obj => {
				this.csvDatPull = obj
			})
			
	},
	methods: {
		stripData: function(){
			for (var i = 0; i < this.csvDatPull.length; i++){
				this.baseNums["field1"] = this.csvDatPull[i]
				api.postBaseNums(this.baseNums)
			}
		},
	},
})