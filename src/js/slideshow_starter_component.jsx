import React, { useState, useEffect } from 'react'

import LayoutComponent from './layout_component'
import { TextInputComponent, CheckboxComponent, FileInputComponent } from './input_components'

import Slideshow from './slideshow'

const defaults = {
  delay: 6000,
  shuffle: true,
  autoAdvance: true,
}

function noop(value) {
  return value
}

function deepBinder(baseValue, setBaseValue) {
  function forKey(key, { serialize, deserialize } = {}) {
    serialize = serialize || noop
    deserialize = deserialize || noop
    return {
      get value() {
        return serialize(baseValue[key])
      },
      set value(value) {
        setBaseValue({ ...baseValue, [key]: deserialize(value) })
      },
    }
  }

  return {
    forKey(key) {
      return forKey(key)
    },
    forNumberKey(key) {
      return forKey(key, {
        serialize(value) {
          return '' + value
        },
        deserialize(string) {
          return Number(string)
        }
      })
    }
  }
}


export default function SlideshowStarterComponent({ startSlideshow }) {
  const [slideshowSettings, setSlideshowSettings] = useState(defaults)

  const valid = !!slideshowSettings.files

  function onSubmit(event) {
    event.preventDefault()
    startSlideshow(new Slideshow(slideshowSettings))
  }

  const binder = deepBinder(slideshowSettings, setSlideshowSettings)

  return <LayoutComponent>
    <form onSubmit={ onSubmit }>
      <FileInputComponent directory="true" binding={ binder.forKey('files') } />
      <TextInputComponent label="Delay" binding={ binder.forNumberKey('delay') } />
      <CheckboxComponent label="Shuffle" binding={ binder.forKey('shuffle') } />
      <CheckboxComponent label="Auto-advance" binding={ binder.forKey('autoAdvance') } />
      <button type="submit" className="btn btn-primary mt-3" disabled={ !valid }>Start slideshow</button>
    </form>
  </LayoutComponent>
}
