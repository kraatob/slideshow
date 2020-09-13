import { useState, useEffect } from 'react'

class Image {
  constructor(file, asDataUrl) {
    this.file = file
    this.asDataUrl = asDataUrl
  }
}

export default class Slideshow {
  constructor({ files }) {
    this.images = this._filterFiles(files)
    this.remainingImages = []
    this.delay = 6000

    this.currentImageSetters = []
    this.start()
  }

  start() {
    this._chooseNextImage()
    this.interval = setInterval(() => {
      this._chooseNextImage()
    }, this.delay)
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

  _chooseNextImage() {
    if (this.remainingImages.length == 0) {
      this.remainingImages = [...this.images]
    }
    if (this.remainingImages.length > 0) {
      const randomIndex = Math.floor(Math.random(this.remainingImages.length))
      this._loadImage(this.remainingImages.splice(randomIndex, 1)[0])
    }
  }

  _loadImage(file) {
    const reader  = new FileReader()
    reader.onload = ({ target }) => {
			const image = new Image(file, target.result)
			this._setImage(image)
		}
		reader.readAsDataURL(file)
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
