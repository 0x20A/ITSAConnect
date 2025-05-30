
// config de EditorJS = exportando tools de EditorJS
import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Link from "@editorjs/link";
import Code from "@editorjs/code";

// funcion para subir imagenes al editor mediante links
const uploadImageByUrl = (e) => {
  let link = new Promise((resolve, reject) => {
    try {
      resolve(e)
    }
    catch(err) {
      reject(err)
    }
  })

  return link.then(url => {
    return {
      success: 1,
      file: { url }
    }
  })
}

// TODO: funcion para subir imagenes mediante pc
const uploadImageByFile = (e) => {
  return uploadImage(e).then(url => {
    if(url) {
      return {
        success: 1,
        file: { url }
      }
    }
  })
}


export const tools = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true
  },
  link: Link,
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByUrl,
        uploadByFile: uploadImageByFile
      }
    }
  },
  header: {
    class: Header,
    config: {
      placeholder: 'Escribe un titulo...',
      levels: [2, 3],
      defaultLevel: 2
    }
  },
  quote: {
    class: Quote,
    inlineToolbar: true
  },
  inlineCode: InlineCode,
  code: Code,
  marker: Marker,
}