const viewGenerator = require('./plop-template/view/prompt')

module.exports = function (plop) {
    plop.setGenerator('view', viewGenerator)
}