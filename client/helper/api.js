let getBaseList = () => {
	return fetch('/getnums/base')
		.then(res => {
			return res.json()
		})
}

let getYodelList = () => {
	return fetch('/getnums/yodel')
		.then(res => {
			return res.json()
		})
}

let getFileView = () => {
	return fetch('/uploads')
		.then(res => {
			return res.json()
		})
}

let getZips = () => {
	return fetch('/zips')
		.then(res => {
			return res.json()
		})
}

// 		initMain: function(){
// 			if (this.options == 'dupes') {
// 				this.loadDialog = true
// 				//MOVE TO BACKEND BELOW:
// 				//MOVE TO BACKEND BELOW:
// 				//MOVE TO BACKEND BELOW:
// 				//MOVE TO BACKEND BELOW:
// 				//MOVE TO BACKEND BELOW:
// 				//MOVE TO BACKEND BELOW:
// 				api.checkDupesFirst(app.fileSelector)
// 					.then(obj => {
// 						for(var i = 0; i < obj.length; i++){
// 							this.check.push(obj[i].field1)
// 						}
// 						setTimeout(() => (this.checker()), 1000)
// 						setTimeout(() => (this.checkerTwo(this.thashmap)), 1000)
// 					})
// 				setTimeout(() => (this.loadDialog = false), 2000)
// 				setTimeout(() => (this.dupesDialog = true), 2400)	
// checker: function(){
// 			//MOVE TO BACKEND BELOW:
// 			//MOVE TO BACKEND BELOW:
// 			//MOVE TO BACKEND BELOW:
// 			//MOVE TO BACKEND BELOW:
// 			//MOVE TO BACKEND BELOW:
// 			let hashmap = {}
// 			this.check.forEach(function(num) {
// 				hashmap[num] = true;
// 			})
// 			console.log(hashmap)
// 			this.thashmap = hashmap
// 		},
let checkDupesFirst = (file) => {
	return fetch(`/getnums/searchcsv?filename=${file}`)
		.then(res => {
			return res.json()
		})
}

let hasher = (main, check) => {
	fetch('/compute/hasher', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			check: check,
		}),
	})
	.then(res => { res.json() })
}
//Posted, now

let nextHasher = () => {
	return fetch('/compute/hasher')
	.then(res => { 
		return res.json() 
	})
}
// 		checkerTwo: function(map){
// 			//MOVE TO BACKEND BELOW:
// 			//MOVE TO BACKEND BELOW:
// 			//MOVE TO BACKEND BELOW:
// 			//MOVE TO BACKEND BELOW:
// 			//MOVE TO BACKEND BELOW:
// 			//MOVE TO BACKEND BELOW:
// 			let dupes = []
// 			for (let i = 0; i < this.yodelMainNums.length; i++){
// 				if(map[this.yodelMainNums[i]]) {
// 					app.tdupes.push(this.check[i]);
// 				} else {
// 					continue
// 				}
// 			}
// 		},

let postYodelList = data => {
	fetch('/getnums/yodel',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
	})
	.then(res => { res.send() })
}

let postBaseNums = data => {
	fetch('/getnums', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
	})
	.then(res => res.send())
}



let fileUpload = (file) => {
	fetch('/uploads', {
		method: 'POST',
		headers: {
			'Content-Type': 'text/csv'
		},
		body: file,
	})
	.then(res => {
		res.send()
	})
}

let putTheseNums = (file) => {
	return fetch(`/getnums/csvput?filename=${file}`)
		.then(res => {
			console.log(res.json)
			return res.json()
		})
}

//then...

let putNewNums = (data) => {
	fetch('/getnums/putem', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
	})
	.then(res => res.send())
}

let getFileNames = () => {
	return fetch('/fileGet')
		.then(res => {

			var obj = res.json()
			return obj
		})
}

let addDataOBLG = (file) => {
	fetch('/oblg', {
		
	})
}

let addZips = (file) => {
	fetch(`/zips?filename=${file}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(res => res.send())
}

let addDataLandline = (file) => {
	fetch(`/landline?filename=${file}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(res => res.send())
}

let addYodelNumbers = (file) => {
	fetch(`/getnums/post?filename=${file}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(res => res.send())
}

let checkZips = (listItem) => {
	return fetch(`/zips/check?listItem=${listItem}`)
		.then(res => {
			return res.json()
		})
}

let postMatched = (arr) => {
	fetch('/matched', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(arr)
	})
}

let scruber = () => {
	return fetch('/scrub')
		.then(res => {
			return res.json()
		})
}

export default {
	scruber,
	addYodelNumbers,
	postMatched,
	checkZips,
	getZips,
	getBaseList,
	addDataLandline,
	addZips,
	hasher,
	addDataOBLG,
	nextHasher,
	getFileNames,
	postBaseNums,
	checkDupesFirst,
	putTheseNums,
	putNewNums,
	getYodelList,
	postYodelList,
	fileUpload,
	getFileView,
}