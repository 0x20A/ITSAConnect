import { Link } from "react-router-dom";
import logo from "../../resources/imgs/ITSAConnect Logo.svg"
import { PageAnimation } from "../../common/PageAnimation";
import defaultImage from "../../resources/imgs/portada.png"
import { useContext } from "react";
import { EditorContext } from "../Editor";

export const PostEditor = () => {

  let { post, post: {title, banner, content, tags, des}, setPost } = useContext(EditorContext);

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

  return (
    <>
      <nav className="navbar">
        {/* logo */}
        <Link to="/" className="flex-none">
          <img src={ logo } alt="Logo" className="md-w:full md:h-24"/>
        </Link>

        {/* titulo dinamico */}
        <p className="max-md:hidden text-black line-clamp-1 w-full text-xl">
          { title.length ? title : "Titulo" }
        </p>

        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2">
            Publicar
          </button>
          <button className="btn-light py-2 normal-case">
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
              placeholder="Titulo"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={ handleTitleKeyDown } 
              onChange={ handleTitleChange }
            >
            </textarea>

            <hr className="w-full opacity-10 my-5" />

            <div id="textEditor" className="font-gelasio ">

            </div>
          </div>
        </section>
      </PageAnimation>
      
    </>
  )
}
