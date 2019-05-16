class LocalForageMock {
	constructor() {
	  this.store = {}
	}
  
	clear() {
	  this.store = {}
    return new Promise((resolve, reject) => {
      resolve(this.store)
    })
	}
  
	getItem(key) {
    return new Promise((resolve, reject) => {
      resolve(this.store[key] || null)
    })
	}
  
	setItem(key, value) {
    this.store[key] = value;
    return new Promise((resolve, reject) => {
      resolve(this.store[key])
    })
	}
  
	removeItem(key) {
	  delete this.store[key]
    return new Promise((resolve, reject) => {
      resolve(true)
    })
	}
}
export default new LocalForageMock();