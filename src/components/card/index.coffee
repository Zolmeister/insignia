z = require 'zorium'

styles = require './index.styl'

module.exports = class Card
  constructor: ({title, description, actions, image, isImageLight}) ->
    styles.use()

    @state = z.state
      title: title
      description: description
      actions: actions
      image: image
      isImageLight: isImageLight

  render: =>
    {title, description, actions, image, isImageLight} = @state()
    z '.z-card',
      if image then \
        z '.image-container',
          z ".title#{if isImageLight then '.is-dark' else ''}", title
          z '.image-scrim'
          z "img.image[src=#{image}]"
      z '.content',
        unless image
          z '.title', title
        z '.description', description
      z '.divider'
      z '.actions', actions
