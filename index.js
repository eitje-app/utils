// import * as UI from 'src/ui'
const path = require('path');
const my_path = path.join(__dirname, 'src', 'date.js')
console.log(my_path)
const date = require(my_path) 
// import * as string from 'src/string'
// import * as collections from 'src/collections'
// import * as general from 'src/general'
// import * as dev from 'src/dev'
// import * as number from 'src/number'

const func = () => {console.log("workin")}
console.log(date)
module.exports = {func}

// ...UI, ...string, ...collections, ...general, ...dev, ...number