import { useContext, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Input } from "./components/Input";
import { PageAnimation } from "../common/PageAnimation";
import {toast, Toaster} from "react-hot-toast";
import axios from 'axios';
import { storeInSession } from '../common/Session';
import { UserContext } from '../App';

export const UserAuthForm = ({ type }) => {

  // access_token para almacenar la sesion actual
  let { userAuth: { access_token }, setUserAuth } = useContext(UserContext);

  // funcion para enviar la info al server
  const userAuthThroughServer = (serverRoute, formData) => {

    // request con axios
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
      .then(({data}) => {
        storeInSession("user", JSON.stringify(data));
        
        setUserAuth(data);
      })
      .catch((err) => {
        console.log(err);

        if (err.response && err.response.data){
          toast.error( err.response.data.error );
        } else {
          toast.error("Ha ocurrido un error inesperado.")
        }
      });

  }

  // submit inicio de sesion o signup
  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type === "sign-in" ? "/signin" : "/signup";

    let emailRegex = /^[0-9]{4}[a-z]{1}[0-9]{5}$/; // regex email/matricula
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex password

    // form data
    let form = new FormData( formElement );
    const formData = {};

    for(let [key, value] of form.entries()){
      formData[key] = value;
    }

    // validaciones en front
    let { fullname, matricula, password } = formData;

    if(fullname){
      if(fullname.length < 4){
        return toast.error("El nombre debe de ser de al menos 4 caracteres.");
      }
    }
    
    if(!matricula.length){
      return toast.error("Ingresa la matricula");
    }
    
    if(!emailRegex.test(matricula)){
      return toast.error("Matricula invalida.");
    }
    
   
    if(!passwordRegex.test(password)){
      return toast.error("La contraseña debe de ser de 6 a 20 caracteres, incluyendo un número, una letra minuscula y 1 letra mayuscula.");
    }

    userAuthThroughServer(serverRoute, formData);

  }

  // form component para cambiar entre sign-in and sign-up
  return (
    access_token ? <Navigate to="/" />
    :
    <PageAnimation keyValue={ type }>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form id="formElement" className="w-[80%] max-w-[400px]">
          {/* titulo */}
          <h1 className="text-4xl normal-case text-center mb-[35px]">
            { 
              (type === "sign-in") 
              ? "¡Es bueno verte de vuelta por aquí! 😄" 
              : "¡Bienvenido a ITSAConnect! 😉" 
            }
          </h1>
          
          {/* Fullname input para signup solo */}
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

          {/* email input para ambos */}
          
          <div className="inline-flex">
            <Input
              name="matricula"
              type="text"
              placeholder="Matricula"
              icon="fi-rr-envelope"
            />
            <span className="text-dark-grey px-4 mb-4 flex items-center bg-grey rounded-md rounded-l-none border-l-0">@cdacuna.tecnm.mx</span>
          </div>

          {/* password input para ambos */}
          <Input  
            name="password"
            type="password"
            placeholder="Contraseña"
            icon="fi-rr-lock"
          />

          {/* submit button */}
          <button 
            className="btn-dark center mt-14 normal-case" 
            type="submit"
            onClick={ handleSubmit }
          >
            { 
              (type === "sign-in") 
              ? "Iniciar sesión" 
              : "Registrarse"  
            }
          </button>

          {/* signin - signup texto de abajo */}
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
