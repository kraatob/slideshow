import React, { useState } from 'react'

let idCounter = 0

function getUniqueId() {
  return `input-${idCounter++}`
}

export function FileInputComponent({ directory, binding }) {
  const [numberOfFilesChosen, setNumberOfFilesChosen] = useState(0)

  const id = getUniqueId()

  function onInput({ target }) {
    setNumberOfFilesChosen(target.files.length)
    binding.value = target.files
  }

  return <div className="form-group">
    <div className="custom-file">
      <input type="file" className="custom-file-input" id={ id } webkitdirectory={ directory } onInput={ onInput }/>
      <label className="custom-file-label" htmlFor={ id }>
        { numberOfFilesChosen == 0
          ? <>Choose directory</>
          : <>{numberOfFilesChosen} file(s) selected</>
        }
      </label>
    </div>
  </div>
}

export function TextInputComponent({ binding, label }) {
  const id = getUniqueId()

  return <div className="form-group">
    <label htmlFor={ id }>{ label }</label>
    <input type="text" className="form-control" id={ id } value={ binding.value } onChange={ ({ target }) => binding.value = target.value }/>
  </div>
}

export function CheckboxComponent({ binding, label }) {
  const id = getUniqueId()

  return <div className="form-check">
    <input type="checkbox" className="form-check-input" id={ id } checked={ binding.value } onChange={ ({ target }) => binding.value = target.checked }/>
    <label className="form-check-label" htmlFor={ id }>{ label }</label>
  </div>
}
