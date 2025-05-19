import { createContext, useContext, useState } from "react"
import { UserContext } from "../App"
import { Navigate } from "react-router-dom";
import { PostEditor } from "./components/PostEditor";
import { PublishForm } from "./components/PublishForm";

// estructura de la publicacion
const postStructure = {
  title: '',
  banner: '',
  content: [],
  tags: [],
  des: '',
  author: { personal_info: {}}
}

// createContext para acceder a los useState desde cualquier componente
export const EditorContext = createContext({});

export const Editor = () => {

  const [post, setPost] = useState(postStructure);

  // estado para seleccionar la pagina a redirigir
  // entre editor o publicacion
  const [editorState, setEditorState] = useState("editor");

  const [textEditor, setTextEditor] = useState({ isReady: false });

  // useContext para validar la sesion activa y
  // para seleccionar la pagina a redirigir
  // entre editor o inicio de sesion
  let { userAuth: { access_token } } = useContext(UserContext);

  return (
    <EditorContext.Provider value={{ post, setPost, editorState, setEditorState, textEditor, setTextEditor }}>
      {  access_token === null
        ? <Navigate to="/signin" />
        : editorState === "editor"
          ? <PostEditor />
          : <PublishForm />
      }
    </EditorContext.Provider>
  )
}
