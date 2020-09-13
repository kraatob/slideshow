import { useState, useEffect } from 'react'

class Image {
  constructor(file, asDataUrl) {
    this.file = file
    this.asDataUrl = asDataUrl
  }

  get key() {
    return this.file.webkitRelativePath
  }
}

export default class Slideshow {
  constructor({ files, delay, shuffle, autoAdvance }) {
    this.images = this._filterFiles(files).sort()
    this.remainingImages = []
    this.delay = delay
    this.shuffle = shuffle
    this.autoAdvance = autoAdvance

    this.currentImageSetters = []
    this.start()
  }

  start() {
    this._chooseNextImage()
    this.advance()
  }

  useCurrentImage() {
    const [currentImage, setCurrentImage] = useState(null)
    useEffect(() => {
      this.currentImageSetters.push(setCurrentImage)
      return () => {
        this.currentImageSetters = this.currentImageSetters.filter((setter) => setter !== setCurrentImage)
      }
    }, [])
    return currentImage
  }

  async advance() {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout)
    }
    const image = await this.nextImagePromise
    this._setImage(image)
    this._chooseNextImage()
    if (this.autoAdvance) {
      this.currentTimeout = setTimeout(() => {
        this.currentTimeout = undefined
        this.advance()
      }, this.delay)
    }
  }

  _chooseNextImage() {
    if (this.remainingImages.length == 0) {
      this.remainingImages = [...this.images]
    }
    if (this.remainingImages.length > 0) {
      let index
      if (this.shuffle) {
        index = Math.floor(Math.random() * this.remainingImages.length)
      } else {
        index = 0
      }
      this._loadImage(this.remainingImages.splice(index, 1)[0])
    }
  }

  _loadImage(file) {
    this.nextImagePromise = new Promise((resolve) => {
      const reader  = new FileReader()
      reader.onload = ({ target }) => {
        const image = new Image(file, target.result)
        resolve(image)
      }
      reader.readAsDataURL(file)
    })
  }

	_setImage(image) {
		this.currentImage = image
    for (const setter of this.currentImageSetters) {
      setter(image)
    }
	}

	_filterFiles(files) {
    return [...files].filter(file => file.name.match(/\.(png|jpg|jpeg)/))
  }
}
