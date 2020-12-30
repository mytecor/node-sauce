# node-sauce
SauceNao api wrapper that is able to circumvent the restrictions

## Usage example
```js
import Sauce from 'node-sauce'
// or
// let Sauce = reqire('node-sauce')

let sauce = new Sauce(process.env.YOUR_API_KEY)

// automaticly fetch indexes from https://saucenao.com/tools/examples/api/index_details.txt
sauce.dbmask = [5, 40]

// also accepts number
sauce.dbmask = 32 // 0x20 in hex

// predefine number of results
sauce.numres = 5

// from url
sauce('http://saucenao.com/images/static/banner.gif').then(console.log)

// streams and buffers are also supperted
sauce(stream).then(console.log)

sauce(buffer, {
	// any saucenao props...
	numres: 5,
	// ...
	// only numbers are allowed, use sauce.dbmask for runtime generation
	dbmask: 32
}).then(console.log)
```
