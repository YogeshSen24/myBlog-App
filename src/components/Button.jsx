import React from 'react'

function Button(
    {
        children,
        type = "button",
        className = "",
        ...props
   }
) {
  return (
    <button {...props} className={`${className}`}>
      {children}
    </button>
  )
}

export default Button
