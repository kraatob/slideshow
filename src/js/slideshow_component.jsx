import React, { useState } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import KeyboardEventHandler from 'react-keyboard-event-handler'

function FadeInOut(props) {
  return <CSSTransition
    {...props}
    classNames="transition-fade"
    timeout={ { enter: 600, exit: 600 } }
  />
}

export default function SlideshowComponent({ slideshow, endSlideshow }) {
  const currentImage = slideshow.useCurrentImage()

  return <div className="slideshow">
    <KeyboardEventHandler
      handleKeys={['space']}
      onKeyEvent={() => slideshow.advance() } />
    <TransitionGroup component={ null }>
      { currentImage && 
        <FadeInOut key={ currentImage.key }>
          { currentImage &&
            <div className="slideshow--image-container">
              <img className="slideshow--image" src={ currentImage.asDataUrl } />
            </div>
          }
        </FadeInOut>
      }
    </TransitionGroup>
  </div>
}
