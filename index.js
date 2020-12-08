
let FormData = require('multi-part-lite')
let Limiter = require('sweet-limiter')
let fetch = require('node-fetch')
let qs = require('querystring')

module.exports = function Sauce(api_key, rps) {
	let dbmask = 32 // pixiv
	let limiter = new Limiter(rps || 6 / 30) // default rate limit

	async function sauce(file, params) {
		// wait until our chance comes
		await limiter.next()

		let config
		let req = {
			api_key,
			dbmask: await dbmask,
			...params,
			output_type: 2
		}

		if(typeof file == 'object') {
			let fd = (new FormData).append('file', file)
			config = {method: 'post', headers: fd.headers, body: fd.stream()}
		}
		else req.url = file

		let {results, header} = await fetch('https://saucenao.com/search.php?' + qs.stringify(req), config).then(res => res.json())

		// replace rate limit for premium accounts
		if(!rps) limiter.limit = header.short_limit / 30

		return (results || []).map(({data, header}) => Object.assign(data, header))
	}

	// getting a fresh list of indexes once
	async function dbindexes() {
		let res = await fetch('https://saucenao.com/tools/examples/api/index_details.txt').then(res => res.text())

		let db = []
		for(let [_, mask, index] of res.matchAll(/(0x\d+).*#(\d+)/g))
			db[index] = Number.parseInt(mask, 16)

		dbindexes = () => db
		return db
	}

	Object.defineProperty(sauce, 'dbmask', {
		set(mask) {
			if(typeof indexes == 'number') return dbmask = mask

			dbmask = (async () => {
				let indexes = await dbindexes()
				return mask.reduce((acc, index) => acc ^ indexes[index], 0)
			})()
		},

		get: () => dbmask
	})

	return sauce
}
