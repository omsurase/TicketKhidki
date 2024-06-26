import React from 'react'

function Button({ title, onclick, variant, disabled, fullWidth, type }) {
  let className = "bg-primary p-1 text-white";

  if (fullWidth) {
    className += " w-full";
  }

  if (variant === 'outlined') {
    className = className.replace(
      "bg-primary",
      "border border-primary text-primary bg-white"
    );
  }


  return (
    <div>
      <button className={className} disabled={disabled} type={type} onClick={onclick}>
        {title}
      </button>
    </div>
  )
}

export default Button