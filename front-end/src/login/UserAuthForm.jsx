import { useContext, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Input } from "./components/Input";
import { PageAnimation } from "../common/PageAnimation";
import {toast, Toaster} from "react-hot-toast";
import axios from 'axios';
import { storeInSession } from '../common/Session';
import { UserContext } from '../App';
// import googleicon from '../imgs/google.png';

export const UserAuthForm = ({ type }) => {

  // access_token to store the actual session
  let { userAuth: { access_token }, setUserAuth } = useContext(UserContext);

  // function to send data to the server
  const userAuthThroughServer = (serverRoute, formData) => {

    // making a request using axios library
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

  // function submit to login
  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type === "sign-in" ? "/signin" : "/signup";

    let emailRegex = /^[0-9]{4}[a-z]{1}[0-9]{5}$/; // regex for email/matricula
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    // form data
    let form = new FormData( formElement );
    const formData = {};

    for(let [key, value] of form.entries()){
      formData[key] = value;
    }

    // form validations

    let { fullname, matricula, password } = formData;

    // validating the data from frontend
    // name lenght > 4 characters
    if(fullname){
      if(fullname.length < 4){
        return toast.error("El nombre debe de ser de al menos 4 caracteres.");
      }
    }
    // matricula length > 0
    if(!matricula.length){
      return toast.error("Ingresa la matricula");
    }
    // matricula pattern should match
    if(!emailRegex.test(matricula)){
      return toast.error("Matricula invalida.");
    }
    
    // password pattern should match
    if(!passwordRegex.test(password)){
      return toast.error("La contraseña debe de ser de 6 a 20 caracteres, incluyendo un número, una letra minuscula y 1 letra mayuscula.");
    }

    userAuthThroughServer(serverRoute, formData);

  }

  // form component to change between sign-in and sign-up
  return (
    access_token ?
    <Navigate to="/" />
    :
    <PageAnimation keyValue={ type }>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form id="formElement" className="w-[80%] max-w-[400px]">
          {/* title */}
          <h1 className="text-4xl normal-case text-center mb-[35px]">
            { 
              (type === "sign-in") 
              ? "¡Es bueno verte de vuelta por aquí! 😄" 
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
              name="matricula"
              type="text"
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

          {/* signin - signup bottom text */}
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
