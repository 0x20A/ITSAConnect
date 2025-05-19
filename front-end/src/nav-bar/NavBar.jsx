import { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../resources/imgs/ITSAConnect Logo.svg';
import { UserContext } from '../App';
import { UserNavigation } from './components/UserNavigation';

export const NavBar = () => {

  // search box visibility function on sm screens
  const [ searchBoxVisibility, setSearchBoxVisibility] = useState(false);

  // user navigation state
  const [ userNavPanel, setUserNavPanel ] = useState(false);

  const onSearchBox = () => {
    setSearchBoxVisibility(currentValue => !currentValue);
  }

  const handleUserNavPanel = () => {
    setUserNavPanel(currentValue => !currentValue);
  }

  // function to get out of focus the nav panel when clicking outside
  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  }
 
  const { userAuth, userAuth: { access_token, profile_img } } = useContext(UserContext);

  return (
    // starting the navbar
    <>
      <nav className="navbar">
        {/*logo */}
        <Link to="/" className="flex-none">
            <img src={ logo } alt="Logo" className="md:w-full md:h-20" />
        </Link>

        {/* input de busqueda */}
        <div className={"absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " + ( searchBoxVisibility ? "show" : "hide")}>
          <input 
            type="text" 
            placeholder="Buscar" 
            className="w-full md:w-[625px] bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
          />

          <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
        </div>

        {/* boton busqueda */}
        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          <button 
            className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
            onClick={ onSearchBox }
          >
            <i className="fi fi-rr-search text-xl"> </i>
          </button>

          {/* boton publicar */}
          <Link to="/editor" className="hidden md:flex gap-2 link rounded-full">
              <i className="fi fi-rr-megaphone"></i>
              <p>Publicar</p>
          </Link>

          {
            access_token ?
            <>
              {/* notification button */}
              <Link to="/dashboard/notification">
                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                  <i className="fi fi-rr-bell text-2xl block mt-1"></i>
                </button>
              </Link>

              {/* profile picture button */}
              <div className="relative" onClick={ handleUserNavPanel } onBlur={ handleBlur }>
                <button 
                  className="w-12 h-12 mt-1">
                  <img src={ profile_img } alt="profile-pic" className="w-full h-full object-cover rounded-full" />
                </button>
              </div>
              
              {
                userNavPanel
                ? <UserNavigation />
                : ""
              }
              
            </>
            :
            <>
              {/* signin button */}
              <Link to="/signin" className="btn-dark py-2 normal-case">
                Iniciar sesión
              </Link>

              {/* signup button */}
              <Link to="/signup" className="btn-light py-2 hidden md:block">
                Registrarse
              </Link>
            </>
          }
          
        </div>
      </nav>

      {/* outlet for routing */}
      <Outlet />
    </>
  )
}
