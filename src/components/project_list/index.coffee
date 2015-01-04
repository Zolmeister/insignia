z = require 'zorium'

Card = require '../card'
Project = require '../../models/project'
styles = require './index.styl'

module.exports = class ProjectList
  constructor: ->
    styles.use()

    email = atob('em9saWthaGFuQGdtYWlsLmNvbQ==')

    @state = z.state
      header: new Card
        title: 'Zolmeister'
        description: 'Zoli Kahan'
        actions: [
          z "a.z-project-list-action[href=mailto:#{email}]",
            z 'i.fa.fa-envelope-square'
          z 'a.z-project-list-action' +
            '[href=https://zolmeister.com][rel=prefetch]',
            z 'i.fa.fa-rss-square'
          z 'a.z-project-list-action' +
            '[href=https://github.com/Zolmeister][rel=prefetch]',
            z 'i.fa.fa-github-square'
        ]
        image: '/images/Z.jpg'
      projects: z.observe Project.getAll().then (projects) ->
        _.map projects, ({
          title, description, blogLink, gitHubLink, pubLink, image, isImageLight
          }) ->
          gitHubActive = if gitHubLink then '.active' else '.inactive'
          pubActive = if pubLink then '.active' else '.inactive'
          blogActive = if blogLink then '.active' else '.inactive'

          actions = [
            z "a.z-project-list-action[href=#{pubLink}][rel=prefetch]",
              z "i.fa.fa-external-link-square#{pubActive}"
            z "a.z-project-list-action[href=#{gitHubLink}]",
              z "i.fa.fa-github-square#{gitHubActive}"
            z "a.z-project-list-action[href=#{blogLink}]",
              z "i.fa.fa-rss-square#{blogActive}"
          ]

          new Card {title, description, actions, image, isImageLight}

  onMount: ($el) ->
    $($el).freetile()

  render: =>
    projects = [@state().header].concat(@state().projects)
    z '.z-project-list', projects.map (project) ->
      z '.project', project
