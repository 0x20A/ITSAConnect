import { useState } from 'react';
import logo from '../imgs/logo-connect.svg';
import { Link } from 'react-router-dom';

export const NavBar = () => {

  // search box visibility function on md screens
  const [ searchBoxVisibility, setSearchBoxVisibility] = useState(false);

  const onSearchBox = () => {
    setSearchBoxVisibility(currentValue => !currentValue);
  }

  return (
    // starting the navbar
    <nav className="navbar">
      {/*logo */}
      <Link to="/" className="flex-none w-32 h-38">
          <img src={ logo } alt="Logo" className="w-38 h-38 mt-4" />
      </Link>

      {/* search input */}
      <div className={"absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " + ( searchBoxVisibility ? "show" : "hide")}>
        <input 
          type="text" 
          placeholder="Buscar" 
          className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
        />

        <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
      </div>

      {/* button search */}
      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <button 
          className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
          onClick={ onSearchBox }
        >
          <i className="fi fi-rr-search text-xl"> </i>
        </button>

        <Link to="/editor" className="hidden md:flex gap-2 link rounded-full">
            <i className="fi fi-rr-megaphone"></i>
            <p>Publicar</p>
        </Link>

        <Link to="/signin" className="btn-dark py-2 normal-case">
          Iniciar sesión
        </Link>

        <Link to="/signup" className="btn-light py-2 hidden md:block">
          Registrarse
        </Link>
        
      </div>

    </nav>
  )
}

export default NavBar;
