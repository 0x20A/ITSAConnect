import { Link, useNavigate } from "react-router-dom";
import logo from "../../resources/imgs/ITSAConnect Logo.svg"
import {toast} from "react-hot-toast";
import { PageAnimation } from "../../common/PageAnimation";
import defaultImage from "../../resources/imgs/portada.png";
import { useContext, useEffect } from "react";
import { EditorContext } from "../Editor";
import EditorJS from '@editorjs/editorjs';
import { tools } from "./Tools";
import axios from "axios";
import { UserContext } from "../../App";

export const PostEditor = () => {

  let { post, post: {title, banner, content, tags, des}, setPost, textEditor, setTextEditor, setEditorState } = useContext(EditorContext);

  let { userAuth: access_token } = useContext(UserContext);

  let navigate = useNavigate();

  // useEffect para renderizar el editor de texto
  // solo una vez []
  useEffect(() => {
    if(!textEditor.isReady){
      setTextEditor(new EditorJS({
      holderId: "textEditor",
      data: content,
      tools: tools,
      placeholder: "Escribe aquí..."
    }))
    }
  }, []);

  // funcion para subir la foto de portada
  const handleBannerUpload = (e) => {
    let img = e.target.files[0];
    console.log(img);
  }

  // function para evitar enters en el titulo
  const handleTitleKeyDown = (e) => {
    if(e.code === "Enter"){
      e.preventDefault();
    }
  }

  // funcion para cambiar el titulo de la navbar
  const handleTitleChange = (e) => {
    let input = e.target;
    
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + "px";

    setPost({ ...post, title: input.value });
  }

  // funcion para publicar posts
  const handlePublishEvent = () => {
    if(!title.length){
      return toast.error("Escribe un titulo...");
    }

    if(textEditor.isReady){
      textEditor.save().then(data => {
        if(data.blocks.length){
          setPost({ ...post, content: data });
          setEditorState("publicar");
        } else {
          return toast.error("Es necesario escribir una descripción.")
        }
      }).catch((err) => {
        console.log(err);
      })
    }
    
  }

  // evento para guardar borrador
  const handleSaveDraft = (e) => {
    if(e.target.className.includes("disable")){
      return;
    }

    // validando la info
    if(!title.length){
      return toast.error("Escribe un titulo antes de guardar como borrador.");
    }

    let loadingToast = toast.loading("Guardando borrador...");

    e.target.classList.add('disable');

    if(textEditor.isReady){
      textEditor.save().then( content => {
        
        let postObj = {
          title, banner, des, content, tags, draft: true
        }
        
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-post", postObj, {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        })
        .then(() => {
          e.target.classList.remove('disable');

          toast.dismiss(loadingToast);
          toast.success("Guardado.");

          setTimeout(() => {
          navigate("/");
          }, 500);
        })
        .catch(({ response }) => {
          e.target.classList.remove('disable');
          toast.dismiss(loadingToast);

          return toast.error(response.data.error);
        })
      })
    }
  }

  return (
    <>
      <nav className="navbar">
        {/* logo */}
        <Link to="/" className="flex-none">
          <img src={ logo } alt="Logo" className="md-w:full md:h-20"/>
        </Link>

        {/* titulo dinamico */}
        <p className="max-md:hidden text-black line-clamp-1 w-full text-xl">
          { title.length ? title : "Titulo" }
        </p>

        <div className="flex gap-4 ml-auto">
          <button 
            className="btn-dark py-2"
            onClick={ handlePublishEvent }
          >
            Publicar
          </button>
          <button 
            className="btn-light py-2 normal-case"
            onClick={ handleSaveDraft }
          >
            Guardar borrador
          </button>
        </div>
      </nav>

      {/* inicio del editor de texto/posts */}
      <PageAnimation>
        <section>
          <div className="mx-auto max-w-[900px] w-full">

            {/* text area para el titulo dentro del editor de texto */}
            <textarea
              defaultValue={ title }
              placeholder="Titulo"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={ handleTitleKeyDown } 
              onChange={ handleTitleChange }
            >
            </textarea>

            <hr className="w-full opacity-10 my-5" />

            {/* editor de texto  */}
            <div id="textEditor" className="font-gelasio ">

            </div>
          </div>
        </section>
      </PageAnimation>
      
    </>
  )
}
