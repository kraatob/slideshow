import React from 'react'

export default function LayoutComponent({ children }) {
  return <div className="center-vertically">
    <div className="center-vertically--content">
      <div className="container">
        { children }
      </div>
    </div>
  </div>
}
