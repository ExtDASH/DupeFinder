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
		zips: [],
		withMatchingZips: [],

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
		zipsDialog1: false,
		zipsDialog2: false,
		matchedZipsDialog: false,

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



	},
	created: function(){
		this.loadingBase = true
		api.getBaseList()
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
				this.loadingBase = false
			})
		api.getFileNames()
			.then(obj => {
				for (var i = 0; i < obj.length; i++){
					this.filesViewer.push(obj[i].name)
				}
			})
		api.getZips()
			.then(obj => {
				// console.log(obj.data[0].zips)
				for (var i = 0; i < obj.data[0].zips.length; i++){
					app.zips.push(obj.data[0].zips[i])
				}		
			})
	},
	watch: {
		options: function(){
			if (this.options == 'dupes') {
				this.dupesSnack = false
				this.upldNewSnack = false
				this.upldOwnedSnack = false
				this.disabled = true
				if(this.fileSelector == null){
					this.dupesSnack = true
				}
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
			} else if (this.database == 'oblg'){
				this.selectedDB = 'OBLG Database'
				this.switchDis = false
			} else if (this.database == 'zips'){
				this.selectedDB = 'Zipcodes Database'
				this.switchDis = false
			} else if (this.database == 'npa'){
				this.selectedDB = 'NPA Database'
				this.switchDis = false
			} else if (this.database == 'landline'){
				this.selectedDB = 'Landlines Database'
				this.switchDis = false
			}
		},
		fileSelector: function(){
			if (this.fileSelector != null){
				this.dupesSnack = false
			}
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
			const xhr = new XMLHttpRequest()

			const input = document.querySelector('#myFile')
			const reader = new FileReader()
			reader.onload = function() {
				let csvfile = new Blob([reader.result], { type: 'text/csv' })
				app.uploadingFile = true

				const form = new FormData()
				let sendName = input.files[0].name.split(/\W+/g)
				
				form.append('Ncsv', csvfile, `${sendName[0]}.csv`)
				xhr.open('POST', '/uploads', true)
				xhr.onreadystatechange = function() {
				    if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
				        form.delete('Ncsv')
				    }
				}
				xhr.send(form)
			}
				// console.log("hi")
				// let userFile = input.files[0]
				// getSignedRequest(userFile)
				// function getSignedRequest(file){

				// xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
				// console.log("hi")
				//   xhr.onreadystatechange = () => {
				//     if(xhr.readyState === 4){
				//       if(xhr.status === 200){
				//         const response = JSON.parse(xhr.responseText);
				//         uploadFile(file, response.signedRequest, response.url);
				//       }
				//       else{
				//         alert('Could not get signed URL.');
				//       }
				//     }
				//   };
				//   xhr.send();
				// }
				// function uploadFile(file, signedRequest, url){
				//   const xhr = new XMLHttpRequest();
				//   xhr.open('POST', signedRequest);
				//   xhr.onreadystatechange = () => {
				//     if(xhr.readyState === 4){
				//       if(xhr.status === 200){
				//         document.getElementById('preview').src = url;
				//         document.getElementById('avatar-url').value = url;
				//       }
				//       else{
				//         alert('Could not upload file.');
				//       }
				//     }
				//   };
				//   xhr.setRequestHeader('Accept', 'text/csv')
				//   xhr.send(file);
				// }
			
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

		checkZips: function(){

		},

		fileExport: function(){
			let csvContent = "data:text/csv;charset=utf-8,";
			let rows = []
			app.tdupes.forEach(function(el){
				rows.push(el)
			})
			console.log(rows)
			let output = rows.join(','+'\r\n')
			console.log(output)
			csvContent += output
			let encodedUri = encodeURI(csvContent);
			let link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", "dupes.csv");
			link.innerHTML= "Click Here to download";
			document.body.appendChild(link);

			link.click();
		},

		postMatched: function(){
			api.postMatched(this.withMatchingZips)
		},

		uploadAFile: function(){
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
				if (app.tdupes.length != 0){
					while (app.tdupes.length != 0){
						app.tdupes.pop()
					}
				}
				api.checkDupesFirst(app.fileSelector)
					.then(obj => {
						for(var i = 0; i < obj.length; i++){
							this.check.push(obj[i].field1)
						}
						setTimeout(() => (this.checker()), 5000)
						setTimeout(() => (this.checkerTwo()), 7000)
					})
						
			} else if (this.options == 'addNewData' && this.database == 'landline'){
				this.addDialog = true
				console.log(this.fileSelector)
				api.addDataLandline(app.fileSelector)
					// .then(obj => {
						// for (let i = 0; i < obj.length; i++){
						// 	app.csvPull.push(obj[i])
						// }
						// api.putNewNums(app.csvPull)
				
					// })
				
			} else if (this.options == 'addNewData' && this.database == 'zips'){
				this.addDialog = true
				api.addZips(app.fileSelector)
					setTimeout(() => (this.addDialog = false), 2000)
			} else if (this.options == 'checkZips'){
				let match = []
				console.log("zips2 = true")
				this.zipsDialog2 = true
				app.zips.forEach(element =>{
					api.checkZips(element)
						.then(obj => {
							obj.data.forEach(el => {
								app.withMatchingZips.push(el)
							})
						})
				})
				setTimeout(() => { 
					this.zipsDialog2 = false 
					console.log(app.withMatchingZips)
					this.matchedZipsDialog = true
				}, 300000)
			} else if (this.options == 'scrub') {
				api.scruber()
					.then(obj => {
						console.log(obj)
					})
			} else if (this.options == 'addNewData' && this.database == 'yodels'){
				this.addDialog = true
				api.addYodelNumbers(app.fileSelector)
				.then(() => {
					this.addDialog = false
				})
			}
			// } else if (this.options == null){
			// 	this.optSnack = true
			// }
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
			console.log("hi from checker function")
			api.hasher(this.yodelMainNums, this.check)
		},
		checkerTwo: function(){
		console.log("hi from checkerTwo function")
			api.nextHasher()
				.then(arr => {
					for(var i = 0; i < arr.length; i++){
						app.tdupes.push(arr[i].toString())
					}
					setTimeout(() => (app.loadDialog = false), 2000)
					setTimeout(() => (app.dupesDialog = true), 2400)
				})
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