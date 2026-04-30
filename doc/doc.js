const info = require("./infoDoc.js")
const internal = require("./internal/internal.js")
const components = require("./components/components.js")

module.exports ={
        ...info,
        ...internal,
        ...components

}