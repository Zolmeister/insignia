z = require 'zorium'

ProjectList = require '../../components/project_list'

module.exports = class HomePage
  constructor: ->
    @state = z.state
      projects: new ProjectList()

  render: =>
    z 'div', @state().projects
