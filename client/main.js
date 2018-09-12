import api from './helper/api.js'
const app = new Vue({
	el: "#app",
	data: {
		strippedBase: [],
		csvPull: [],
		baseNums: [],
		yodelMainNums: [],
		check: [],
		newNums: {},

		filesViewer: [],
		fileLi: [],
		file: {},
		filePath: null,
		fileName: null,
		fileSelector: null,

		database: 'yodels',
		selectedDB: null,

		addDialog: false,
		helpDialog: false,
		viewFilesDialog: false,
		loadingBase: false,
		switchDis: true,
		switchingDB: false,
		checkingDupes: false,
		numsDialog: false,
		dbDialog: false,
		uploadingFile: false,
		yodelNumsDialog: false,
		loadDialog: false,
		dupesDialog: false,

		optSnack: false,
		fileSelSnack: false,
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
		mTime: 10000,
		disabled: true,

		options: null,

		tdupes: [],
		thashmap: {},

		// split0: [],
		// split1: [],
		// split2: [],
		// split3: [],
		// split4: [],
		// split5: [],
		// split6: [],
		// split7: [],
		// split8: [],
		// split9: [],

	},

	//in the watcher, need to change the way db switching is done. its fine for now, but the snackbar text can be changed 'on the fly'
	created: function(){
		//for now leave these commented out.
		// this.loadingBase = true
		api.getBaseList()//for some reason this is taking FOREVER maybe I should load one or the other based on selected DB.
			.then(obj => {
				for (let i = 0; i < obj.length; i++){
					this.baseNums.push(obj[i].field1)
				}
			})

		api.getYodelList()
			.then(obj => {
				for(var i = 0; i < obj.length; i++){
					this.yodelMainNums.push(obj[i].field1)
				}
			})

		
		api.getFileNames()
			.then(obj => {
				for (var i = 0; i < obj.length; i++){
					this.filesViewer.push(obj[i].name)
				}
			})

			//file export

		// setTimeout(() => {(this.loadingBase = false)}, 4000)
		// setTimeout(() => (this.loadedSnack = true), 4400)
	},

	// computed: {
	// 	splitter: function(){
	// 		for (let i = 0; i < app.yodelMainNums.length; i++){
	// 			if (i < 8201){
	// 				app.split0.push(app.yodelMainNums[i])
	// 			}
	// 			if (i > 8201 && i < 16402){
	// 				app.split1.push(app.yodelMainNums[i])
	// 			}
	// 			if (i > 16402 && i < 24603){
	// 				app.split2.push(app.yodelMainNums[i])
	// 			}
	// 			if (i > 24603 && i < 32804){
	// 				app.split3.push(app.yodelMainNums[i])
	// 			}
	// 			if (i > 32804 && i < 41005 ){
	// 				app.split4.push(app.yodelMainNums[i])
	// 			}
	// 			if (i > 41005 && i < 49206){
	// 				app.split5.push(app.yodelMainNums[i])
	// 			}
	// 			if (i > 49206 && i < 57407){
	// 				app.split6.push(app.yodelMainNums[i])
	// 			}
	// 			if (i > 57407 && i < 65608){
	// 				app.split7.push(app.yodelMainNums[i])
	// 			}
	// 			if (i > 65608 && i < 73629){
	// 				app.split8.push(app.yodelMainNums[i])
	// 			}
	// 			if (i > 73629 && i < app.yodelMainNums.length){
	// 				app.split9.push(app.yodelMainNums[i])
	// 			}
	// 		}
	// 	},
	// },

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
		},

		yodelMainNums: function() {
			this.splitter()
		}
	},

	methods: {
		getFile: function(){
			var fselector = document.querySelector('#myFile')
			fselector.click()
		},

		setFile: function(){
			this.viewFilesDialog = false
			this.fileSelSnack = true
		},
		readFile: function(){
			const input = document.querySelector('#myFile')
			const reader = new FileReader()
			reader.onload = function() {
				let csvfile = new Blob([reader.result], { type: 'text/csv' })
				app.uploadingFile = true

				const form = new FormData()
				let sendName = input.files[0].name.split(/\W+/g)
				
				form.append('Ncsv', csvfile, `${sendName[0]}.csv`)
				const xhr = new XMLHttpRequest()
				xhr.open('POST', '/uploads', true)
				xhr.onreadystatechange = function() {
				    if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
				        form.delete('Ncsv')
				    }
				}
				xhr.send(form)
				
			}
			reader.readAsText(input.files[0])

			setTimeout(() => {
				api.getFileNames()
				.then(obj => {
					console.log(obj)
					for (let i = 0; i < obj.length; i++) {
						if (app.filesViewer.includes(obj[i].name)){
						} else {
							app.filesViewer.push(obj[i].name)
						}
					}
				})
			}, 4000)
			setTimeout(() => (app.uploadingFile = false), 10000)
			setTimeout(() => (app.fileSnack = true), 10200)
		},

		fileExport: function(){

			// let csvContent = "data:text/csv;charset=utf-8,";
			// this.tdupes.forEach(function(rowArray){
			// 	let row = rowArray.join(",");
			// 	csvContent += row + "\r\n";
			// }); 
			// var encodedUri = encodeURI(csvContent);
			// var link = document.createElement("a");
			// link.setAttribute("href", encodedUri);
			// link.setAttribute("download", "my_data.csv");
			// link.innerHTML= "Click Here to download";
			// document.body.appendChild(link); // Required for FF

			// link.click();
		},

		uploadFile: function(){
			this.uploadingFile = true
			setTimeout(() => (this.uploadingFile = false), 4000)
		},

		stripData: function(){
			for (let i = 0; i < this.baseNums.length; i++){
				this.strippedBase.push(this.baseNums[i].field1)
			}
		},

		initMain: function(){
			if (this.options == 'dupes') {
				this.loadDialog = true
				api.checkDupesFirst(app.fileSelector)
					.then(obj => {
						for(var i = 0; i < obj.length; i++){
							this.check.push(obj[i].field1)
						}
						setTimeout(() => (this.checker()), 1000)
						setTimeout(() => (this.checkerTwo(this.thashmap)), 1000)
					})
				setTimeout(() => (this.loadDialog = false), 2000)
				setTimeout(() => (this.dupesDialog = true), 2400)		
			} else if (this.options == 'addNewBase'){
				this.addDialog = true
				console.log(this.fileSelector)
				api.putTheseNums(app.fileSelector)
					.then(obj => {
						for (let i = 0; i < obj.length; i++){
							app.csvPull.push(obj[i])
						}
						api.putNewNums(app.csvPull)
					})
				setTimeout(() => (this.addDialog = false), 2000)
			} else if (this.options == 'upldOwned'){

			} else if (this.options == null){
				this.optSnack = true
			}
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
			this.check.forEach(function(num) {
				hashmap[num] = true;
			})
			console.log(hashmap)
			this.thashmap = hashmap
		},

		checkerTwo: function(map){
			var dupes = []
			for (var i = 0; i < this.yodelMainNums.length; i++){
				if(map[this.yodelMainNums[i]]) {
					app.tdupes.push(this.check[i]);
				} else {
					continue
				}
			}
		},

		closeSwitch: function(){
			this.dbDialog = false
			this.database = null
			this.switchDis = true
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