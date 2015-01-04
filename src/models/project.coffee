projects = require '../projects'

class Project
  getAll: -> Promise.resolve projects


module.exports = new Project()
