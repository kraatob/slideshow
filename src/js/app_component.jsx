import React, { useState } from 'react'

import SlideshowComponent from './slideshow_component'
import SlideshowStarterComponent from './slideshow_starter_component'

export default function AppComponent() {
  const [currentSlideshow, setCurrentSlideshow] = useState(null)

  function endSlideshow() {
    setCurrentSlideshow(null)
  }

  if (currentSlideshow) {
    return <SlideshowComponent slideshow={ currentSlideshow } endSlideshow={ endSlideshow } />
  } else {
    return <SlideshowStarterComponent startSlideshow={ setCurrentSlideshow } />
  }
}
