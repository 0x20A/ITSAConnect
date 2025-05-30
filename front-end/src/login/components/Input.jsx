import { useState } from "react"

export const Input = ({ name, type, id, value, placeholder, icon }) => {

  const [passwordVisible, setPasswordVisible] = useState(false);

  // funcion para hacer visible la password
  const onPasswordVisible = () => {
    setPasswordVisible( currentValue => !currentValue);
  }

  return (
    <div className="relative w-[100%] mb-4">
      {/* estructura */}
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
          name != "matricula"
          ? "input-box"
          : "input-email"
        }
      />

      {/* icon por cada input */}
      <i className={"fi " + icon + " input-icon"}></i>
      
      {/* password visible o invisible */}
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
