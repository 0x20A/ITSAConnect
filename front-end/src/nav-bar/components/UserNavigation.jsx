import { Link } from 'react-router-dom';
import { PageAnimation } from "../../common/PageAnimation"
import { useContext } from 'react';
import { UserContext } from '../../App';
import { removeFromSession } from '../../common/Session';


// componente de nav al presionar foto de perfil
export const UserNavigation = () => {

  const { userAuth: { username }, setUserAuth } = useContext(UserContext);

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });
  }

  return (
    <PageAnimation 
      className="absolute right-0 z-50"
      transition={{ duration: 0.2 }}
    >

      <div className="bg-white absolute right-0 border border-grey w-60 duration-200 mt-8 mr-8">

        {/* post button on sm screens */}
        <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
          <i className="fi fi-rr-megaphone"></i>
          <p>Publicar</p>
        </Link>

        {/* profile button /user/${username}*/}
        <Link to="/" className="link pl-8 py-4">
          Perfil
        </Link>

        {/* dashboard button /dashboard/posts*/}
        <Link to="/" className="link pl-8 py-4">
          Mis publicaciones
        </Link>

        {/* settings button /settings/edit-profile*/}
        <Link to="/" className="link pl-8 py-4">
          Ajustes
        </Link>

        {/* sign-out button */}
        <span className="absolute border-t border-grey w-[100%]"></span>

        <button 
          className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
          onClick={ signOutUser }
        >
          <h1 className="font-bol text-xl">Cerrar sesión</h1>
          <p className="text-dark-grey">@{username}</p>
        </button>

      </div>
    </PageAnimation>
  )
}
