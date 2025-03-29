import { Link } from 'react-router-dom';
import { PageAnimation } from "../common/PageAnimation";
import { Input } from "../components/Input";
// import googleicon from '../imgs/google.png';

export const UserAuthForm = ({ type }) => {

  // form component to change between sign-in and sign-up
  return (
    <PageAnimation keyValue={ type }>
      <section className="h-cover flex items-center justify-center">
        <form className="w-[80%] max-w-[400px]">
          {/* title */}
          <h1 className="md:text-4xl text-3xl normal-case text-center mb-[35px]">
            { 
              (type === "sign-in") 
              ? "¡Es bueno verte por aqui de vuelta! 😄" 
              : "¡Bienvenido a ITSAConnect! 😉" 
            }
          </h1>
          
          {/* Fullname input for sign-up only */}
          {
            (type != "sign-in")
            ? <Input  
                name="fullname"
                type="text"
                placeholder="Nombre completo"
                icon="fi-rr-user"
              />
            : ""
          }

          {/* email input for both */}
          
          <div className="inline-flex">
            <Input
              name="email"
              type="email"
              placeholder="Matricula"
              icon="fi-rr-envelope"
            />
            <span className="text-dark-grey px-4 mb-4 flex items-center bg-grey rounded-md rounded-l-none border-l-0">@cdacuna.tecnm.mx</span>
          </div>

          {/* password input for both */}
          <Input  
            name="password"
            type="password"
            placeholder="Contraseña"
            icon="fi-rr-lock"
          />

          {/* submit button */}
          <button className="btn-dark center mt-14 normal-case" type="submit">
            { 
              (type === "sign-in") 
              ? "Iniciar sesión" 
              : "Registrarse"  
            }
          </button>

          {/* GOOGLE SIGN */}
          {/* <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">

            <hr className="w-1/2 border-black" />
            <p>o</p>
            <hr className="w-1/2 border-black" />
          
          </div> */}

          {/* google sign button */}
          {/* <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
            <img src={ googleicon } alt="google logo" className="w-5"/>
            continua con Google
          </button> */}

          {/* signin - signup text */}
          {
            type === "sign-in"
            ? <p className="mt-6 text-dark-grey text-xl text-center">
                ¿No tienes una cuenta?
                <Link to="/signup" className="underline text-black text-xl ml-1">
                  Registrate aquí.
                </Link>
              </p>
            : <p className="mt-6 text-dark-grey text-xl text-center">
                ¿Ya estás registrado?
                <Link to="/signin" className="underline text-black text-xl ml-1">
                  Inicia sesión aquí.
                </Link>
              </p>
          }

        </form>

      </section>
    </PageAnimation>
  )
}
