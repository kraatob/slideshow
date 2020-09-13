import React, { useState, useEffect } from 'react'

import LayoutComponent from './layout_component'
import { FileInputComponent } from './input_components'

import Slideshow from './slideshow'

export default function SlideshowStarterComponent({ startSlideshow }) {
  console.log(startSlideshow)
  const [slideshowSettings, setSlideshowSettings] = useState({})

  const valid = !!slideshowSettings.files

  function onSubmit(event) {
    event.preventDefault()
    startSlideshow(new Slideshow(slideshowSettings))
  }

  return <LayoutComponent>
    <form onSubmit={ onSubmit }>
      <FileInputComponent directory="true" filesChosen={ (files) => setSlideshowSettings({ ...slideshowSettings, files }) } />
      <button type="submit" className="btn btn-primary" disabled={ !valid }>Start slideshow</button>
    </form>
  </LayoutComponent>
}
