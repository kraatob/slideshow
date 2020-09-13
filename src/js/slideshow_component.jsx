import React from 'react'

export default function SlideshowComponent({ slideshow, endSlideshow }) {
  const currentImage = slideshow.useCurrentImage()

  return <div className="slideshow">
    { currentImage &&
      <img className="slideshow--image" src={ currentImage.asDataUrl } />
    }
  </div>
}
