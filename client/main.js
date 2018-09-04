import api from './helper/api.js'
const app = new Vue({
	el: "#app",
	data: {
		strippedBase: [],
		baseNums: [],
		helpDialog: false,
		loading: false,
		numsDialog: false,
		loadedSnack: false,
		y: 'bottom',
		timeout: 2000,
		options: '',
		tdupes: null,
		zeroTime: 0,
		dupesSnack: false,
		upldNewSnack: false,
		upldOwnedSnack: false,
		check: [],
		thashmap: {},
		newNums: {},
	},
	created: function(){
		this.loading = true
		api.getBaseList()
			.then(obj => {
				for (var i = 0; i < obj.length; i++)
					this.baseNums.push(obj[i].field1)
			})
		setTimeout(() => {(this.loading = false)}, 4000)
		setTimeout(() => (this.loadedSnack = true), 4400)
		// setTimeout(() => (this.loadedSnack = true), 400)
		
	},
	watch: {
		options: function(){
			if (this.options == 'dupes') {
				this.dupesSnack = false
				this.upldNewSnack = false
				this.upldOwnedSnack = false
				this.dupesSnack = true
			} else if (this.options == 'upldNewBase'){
				this.dupesSnack = false
				this.upldOwnedSnack = false
				this.upldNewSnack = false
				this.upldNewSnack = true
			} else if (this.options == 'upldOwned'){

			}
		}
	},
	methods: {
		stripData: function(){
			for (let i = 0; i < this.baseNums.length; i++){
				this.strippedBase.push(this.baseNums[i].field1)
			}
		},
		initMain: function(){
			if (this.options == 'dupes') {
				api.checkDupesFirst()
					.then(obj => {
						for(var i = 0; i < obj.length; i++)
							this.check.push(obj[i].field1)
					})
					this.checker()
			} else if (this.options == 'upldNewBase'){

			} else if (this.options == 'upldOwned'){

			} else if (this.options == null){

			}
		},
		putThese: function(){
			api.putTheseNums()
				.then(obj => {
					this.newNums = obj
				})
		},

		checker: function(){
			var hashmap = {}
			this.baseNums.forEach(function(basenum) {
				hashmap[basenum] = true;
			})
			this.checkerTwo(hashmap)
		},

		checkerTwo: function(map){
			var dupes = []

			for (var i = 0; i < this.check.length; i++){
				console.log("hi")
				if(map[this.check[i]]) {
					dupes.push(this.check[i]);
				} else {
					continue
				}
			}

			this.tdupes = []
			this.tdupes = dupes
			
		},

		viewNums: function(){

		},

		postStuff: function(){
			console.log('hi')
			for (let i = 0; i < this.newNums.length; i++){
				console.log(this.newNums[i])
				this.baseNums["field1"] = this.newNums[i]
				api.putNewNums(this.baseNums)
			}
		},
	},
})