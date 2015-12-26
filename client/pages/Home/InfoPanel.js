/**
 * InfoPanel has the card's headline and a TextInput for the bikeshed title
 */
import { CardContent } from 'components/Card'
import { Headline } from 'components/Text'
import { TextInput } from 'components/TextInput'
import React, { PropTypes } from 'react'

export function InfoPanel ({ title, updateTitle }) {
  return (
    <CardContent>
      <Headline>
        Bikeshed builder
      </Headline>

      <TextInput
        label='Title'
        name='title'
        onChange={e => updateTitle(e.target.value)}
        value={title}
      />
    </CardContent>
  )
}

InfoPanel.propTypes = {
  title: PropTypes.string.isRequired,
  updateTitle: PropTypes.func.isRequired
}
