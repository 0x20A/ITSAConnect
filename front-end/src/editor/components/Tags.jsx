import { useContext } from "react"
import { EditorContext } from "../Editor"

// componente para la creacion de tags
export const Tag = ({ tag }) => {
  
  let { post, post: { tags }, setPost } = useContext(EditorContext);

  // borrar tag
  const handleTagDelete = () => {
    tags = tags.filter(t => t != tag);
    
    setPost({ ...post, tags });
  }


  return (
    <div className="relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-50 pr-10">
      <p className="outline-none">{ tag }</p>

      <button 
        className="mt-[2px] rounded-full absolute right-4 top-1/2 -translate-y-1/2 "
        onClick={ handleTagDelete }
      >
        <i className="fi fi-rs-circle-xmark text-xl pointer-events-none"></i>
      </button>
    </div>
  )
}