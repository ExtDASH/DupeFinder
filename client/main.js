import api from './helper/api.js'
const app = new Vue({
	el: "#app",
	data: {
		strippedBase: [],
		csvPull: {},
		baseNums: [],
		yodelMainNums: [],
		check: [],
		newNums: {},

		file: null,

		database: null,
		selectedDB: null,

		helpDialog: false,
		loadingBase: false,
		switchDis: true,
		switchingDB: false,
		checkingDupes: false,
		numsDialog: false,
		dbDialog: false,

		zeroTime: 0,
		dupesSnack: false,
		switchedDerek: false,
		switchedYodel: false,
		fileSnack: false,
		upldNewSnack: false,
		upldOwnedSnack: false,
		loadedSnack: false,
		y: 'bottom',
		timeout: 2000,
		disabled: true,

		options: null,

		tdupes: null,
		thashmap: {},

		fileName: null,

	},

	//in the watcher, need to change the way db switching is done. its fine for now, but the snackbar text can be changed 'on the fly'
	created: function(){
		//for now leave these commented out.
		// this.loadingBase = true
		api.getBaseList()
			.then(obj => {
				for (var i = 0; i < obj.length; i++)
					this.baseNums.push(obj[i].field1)
			})

		api.getYodelList()
			.then (obj => {
				let tCsvPull = {}
				obj.forEach(function(num) {
					tCsvPull["field1"] = num
				})
				console.log(tCsvPull)
				this.csvPull = tCsvPull

				//GET THIS WORKING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				//GET THIS WORKING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				//GET THIS WORKING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				//GET THIS WORKING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				//GET THIS WORKING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				//GET THIS WORKING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				//GET THIS WORKING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				
		// api.postYodelList(this.csvPull)
			// .then(obj => {
			// 	for (var i = 0; i < obj.length; i++)
			// 		this.yodelMainNums.push(obj[i].field1)
			// })
		// setTimeout(() => {(this.loadingBase = false)}, 4000)
		// setTimeout(() => (this.loadedSnack = true), 4400)
		
		})
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
		database: function(){
			if (this.database == 'dereks'){
				this.selectedDB = 'Dereks Toll Free Numbers'
				this.switchDis = false
			} else if (this.database == 'yodels'){
				this.selectedDB = 'Yodels Global Batch'
				this.switchDis = false
			}
		}
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

		uploadFile: function(){
			let fileSel = document.querySelector('#myFile').files[0]
			this.file = fileSel
			
			api.fileUpload(this.file)

				
		},

		fileData: function(e){
			this.file = e.target.files[0]
		},

		subFile: function(){
			api.fileUpload(this.file)
				
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

		closeSwitch: function(){
			this.dbDialog = false
			this.database = null
			this.switchDis = true
		},

		checkerTwo: function(map){
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

		switchTo: function(){
			this.dbDialog = false
			this.switchingDB = true
			setTimeout(() => (this.switchingDB = false), 4000)
			if(this.database == 'dereks'){
				this.switchedYodel = false
				setTimeout(() => (this.switchedDerek = true), 4400)
			} else if (this.database == 'yodels'){
				this.switchedDereks = false
				setTimeout(() => (this.switchedYodel = true), 4400)
			}
		},
	},
})