import { getDay } from "./Date";
import { Link } from "react-router-dom";

// card de post component
export const PostCard = ({ content, author}) => {
  
  // desestructurando info a mostrar en la card del contenido
  let { publishedAt, tags, title, des, activity: { total_likes }, post_id: id} = content;

  // usuario
  let { fullname, profile_img, username } = author;
  
  return (
    <div className="flex gap-8 items-center border-b border-grey pb-5 mb-4">
      <div className="w-full">

        {/* info perfil */}
        <div className="flex gap-2 items-center mb-7 ">
          <img src={ profile_img} className="w-6 h-6 rounded-full" />
          <p className="line-clamp-1 capitalize">{ fullname } @{username}</p>
          <p className="min-w-fit">{ getDay(publishedAt) }</p>
        </div>

        {/* titulo y descripcion */}
        <h1 className="blog-title">{ title }</h1>
        <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">{ des }</p>

        {/* tags y boton de like */}
        <div className="flex gap-4 mt-7">
          <span className="btn-light py-1 px-4">{ tags[0] }</span>
          <div className="btn-light py-1 px-2 cursor-pointer">
            <span className="ml-1 flex items-center gap-2 text-dark-grey">
              <i className="fi fi-br-social-network text-xl"></i>
              { total_likes }
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}