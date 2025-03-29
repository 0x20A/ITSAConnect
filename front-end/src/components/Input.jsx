import { useState } from "react"

export const Input = ({ name, type, id, value, placeholder, icon }) => {

  const [passwordVisible, setPasswordVisible] = useState(false);

  // password visible icon function
  const onPasswordVisible = () => {
    setPasswordVisible( currentValue => !currentValue);
  }

  return (
    <div className="relative w-[100%] mb-4">
      {/* input structure */}
      <input
        name={ name }
        type={ 
          (type === "password")
          ? passwordVisible 
            ? "text" 
            : "password" 
          : type
        }
        placeholder={ placeholder }
        defaultValue={ value }
        id={ id }
        className={
          type != "email"
          ? "input-box"
          : "input-email"
        }
      />

      {/* icon for each input */}
      <i className={"fi " + icon + " input-icon"}></i>
      
      {/* password visible or invisible */}
      {
        (type === "password")
        ? <i 
            className={"fi fi-rr-eye" + (!passwordVisible ? "-crossed" : "") + " input-icon left-[auto] right-4 cursor-pointer"}
            onClick={onPasswordVisible}
          >
          </i>
        : ""
      }
    </div>
  )
}
