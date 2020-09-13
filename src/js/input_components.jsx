import React, { useState } from 'react'

let idCounter = 0

function getUniqueId() {
  return `input-${idCounter++}`
}

export function FileInputComponent({ directory, filesChosen }) {
  const [numberOfFilesChosen, setNumberOfFilesChosen] = useState(0)

  const id = getUniqueId()

  function onInput({ target }) {
    setNumberOfFilesChosen(target.files.length)
    if (filesChosen) {
      filesChosen(target.files)
    }
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
