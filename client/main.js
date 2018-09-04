import api from './helper/api.js'
const app = new Vue({
	el: "#app",
	data: {
		strippedBase: [],
		baseNums: [],
		helpDialog: false,
		loadingBase: false,
		checkingDupes: false,
		numsDialog: false,
		loadedSnack: false,
		y: 'bottom',
		timeout: 2000,
		disabled: true,
		options: null,
		tdupes: null,
		thashmap: {},
		zeroTime: 0,
		dupesSnack: false,
		upldNewSnack: false,
		upldOwnedSnack: false,
		check: [],
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
				this.disabled = true
				this.dupesSnack = true
				this.disabled = false
			} else if (this.options == 'upldNewBase'){
				this.dupesSnack = false
				this.upldOwnedSnack = false
				this.upldNewSnack = false
				this.disabled = true
				this.upldNewSnack = true
				this.disabled = false
			} else if (this.options == 'upldOwned'){

			}
		},
		
	},
	methods: {
		getFile: function(){
			var uploader = document.querySelector('#myFile')
			uploader.click()
		},
		stripData: function(){
			for (let i = 0; i < this.baseNums.length; i++){
				this.strippedBase.push(this.baseNums[i].field1)
			}
		},
		initMain: function(){
			// this.loading = true
			if (this.options == 'dupes') {
				api.checkDupesFirst()
					.then(obj => {
						for(var i = 0; i < obj.length; i++){
							this.check.push(obj[i].field1)
						}
						this.checker()
						this.checkerTwo(this.thashmap)
					})
					
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
			this.thashmap = hashmap
		},

		checkerTwo: function(map){
			console.log("hi")
			// var strt = document.querySelector('#start')
			// strt.click()
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