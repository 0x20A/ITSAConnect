import { useContext } from "react"
import { Tag } from "../components/Tags"
import logo from "../../resources/imgs/ITSAConnect Logo.svg"
import { PageAnimation } from "../../common/PageAnimation"
import {Toaster, toast} from "react-hot-toast"
import { EditorContext } from "../Editor"
import axios from "axios"
import { UserContext } from "../../App"
import { Link, Navigate, useNavigate } from "react-router-dom"

export const PublishForm = () => {

  let characterLimit = 200;
  let tagLimit = 2;
  
  let { post, post: { title, tags, des }, /*setEditorState,*/ setPost } = useContext(EditorContext);

  let { userAuth: {access_token}} = useContext(UserContext);

  let navigate = useNavigate();

  // cerrar publishForm
  const handleCloseEvent = () => {
    // setEditorState("editor");
    setTimeout(() => {
        navigate("/");
      }, 100);
  }

  // cambiar titulo en form
  const handlePostTitleChange = (e) => {
    let input = e.target;

    setPost({...post, title: input.value});
  }

  // cambiar descripcion en form
  const handlePostDesChange = (e) => {
    let input = e.target;

    setPost({ ...post, des: input.value});
  }

  // function para evitar enters en la descripcion
  const handleTitleKeyDown = (e) => {
    if(e.code === "Enter"){
      e.preventDefault();
    }
  }

  const handleKeyDown = (e) => {
    if(e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();

      let tag = e.target.value;

      if(tags.length < tagLimit){
        if(!tags.includes(tag) && tag.length){
          setPost({ ...post, tags: [...tags, tag]});
        }
      } else {
        toast.error("Máximo 2 tags.")
      }

      e.target.value = "";
    }
  }

  // evento para publicar post
  const publishPost = (e) => {
    if(e.target.className.includes("disable")){
      return;
    }

    // validando la info
    if(!title.length){
      return toast.error("Escribe un titulo antes de publicar.");
    }

    if(!des.length || des.length > characterLimit){
      return toast.error("Escribe una descripcion acerca de la publicación.");
    }

    if(!tags.length){
      return toast.error("Ingresa al menos un tag.");
    }

    let loadingToast = toast.loading("Publicando...");

    e.target.classList.add('disable');

    let postObj = {
      title, des, tags,
    }

    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-post", postObj, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then(() => {
      e.target.classList.remove('disable');

      toast.dismiss(loadingToast);
      toast.success("Publicado.");

      setTimeout(() => {
        navigate("/");
      }, 500);
    })
    .catch(({ response }) => {
      e.target.classList.remove('disable');
      toast.dismiss(loadingToast);

      return toast.error(response.data.error);
    })
  }
  
  return (
    <PageAnimation >
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
          <button className="btn-dark py-2 flex"
            onClick={ handleCloseEvent }
          >
            <i className="fi fi-rs-circle-xmark mr-2"></i>
            Cerrar
          </button>
        </div>
      </nav>

      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
        <Toaster/>

        <div className="max-w-[550px] center">
          <p className="text-dark-grey mb-1">Vista previa</p>

          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            { title }
          </h1>
            
          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
            {des}
          </p>
        </div>
        
        <div className="border-grey lg:border-1 pl-8">
          {/* titulo */}
          <p className="text-dark-grey mb-2 mt-9">Titulo</p>
          <input 
            type="text" 
            placeholder="Titulo" 
            defaultValue={ title }
            className="input-box pl-4"
            onChange={ handlePostTitleChange }
          />

          {/* Descripcion */}
          <p className="text-dark-grey mb-2 mt-9">Descripción</p>

          <textarea
            maxLength={ characterLimit }
            defaultValue={ des }
            className="h-40 resize-none leading-7 input-box pl-4"
            onChange={ handlePostDesChange }
            onKeyDown={ handleTitleKeyDown }
          ></textarea> 
          <p className="mt-1 text-dark-grey text-sm text-right">{ characterLimit - des.length }</p>
          
          {/* tags */}
          <p className="text-dark-grey mb-2 mt-9">Tags (máximo 2)</p>
          <div className="relative input-box pl-2 py-2 pb-4">
            <input 
              type="text"
              placeholder="Tags"
              className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
              onKeyDown={ handleKeyDown }
            />
            
            { 
              tags.map((tag, i) => {
                return <Tag tag={ tag } key={i}/>
              }) 
            }
            
          </div>

          <button 
            className="btn-dark px-8 mt-4"
            onClick={ publishPost }
          >
            Publicar
          </button>
        </div>

      </section>
    </PageAnimation>
  )
}
