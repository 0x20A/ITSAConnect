import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import cors from 'cors';

// importacion de los schemas
import User from './Schema/User.js';
import Posts from './Schema/Posts.js'
import { nanoid } from 'nanoid';


// server a puerto 3000
const server = express();
let PORT = 3000;

let emailRegex = /^[0-9]{4}[a-z]{1}[0-9]{5}$/; // regex email/matricula

let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex password

// habilitando json data del frontend
server.use(express.json());
server.use(cors());

// conexion a la db
mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true
})

// funcion para verificar la existencia del token en las rutas
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if(token === null){
    return res.status(401).json({ error: "No access token" });
  }

  jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, user) => {
    if(err){
      return res.status(403).json({ error: "Token invalida." });
    }

    req.user = user.id;
    next();
  })
}

// funcion para enviar info al frontend
const formatDataToSend = (user) => {

  const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY);

  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname
  }
}

// making routes
// post => registro
server.post("/signup", (req, res) => {
  
  const { fullname, matricula, password } = req.body;

  // validaciones
  if(fullname.length < 4){
    return res.status(403).json({"error": "El nombre debe de ser de al menos 4 caracteres."}); // invalidation status
  }

  if(!matricula.length){
    return res.status(403).json({"error": "Ingresa la matricula"});
  }
  
  if(!emailRegex.test(matricula)){
    return res.status(403).json({"error": "Matricula invalida."});
  }
  
  if(!passwordRegex.test(password)){
    return res.status(403).json({"error": "La contraseña debe de ser de 6 a 20 caracteres, incluyendo un número, una letra minuscula y 1 letra mayuscula."});
  }
  
  // concat matricula + address = email
  const email = `${matricula}@cdacuna.tecnm.mx`;

  // creando username = matricula 
  const username = matricula;

  // creando el user object
  let user = new User({
    personal_info: { fullname, email, password, username}
  });

  // guardando en db con promise por si falla el envio
  user.save().then((u) => {

    return res.status(200).json(formatDataToSend(u));

  })
  .catch(err => {

    if(err.code === 11000){
      return res.status(500).json({"error": "Ese correo ya existe."});
    }

    return res.status(500).json({"error": err.message });
  })
})

// post => signin/login
server.post("/signin", (req, res) => {

  const { matricula, password } = req.body;

  // concat matricula + address = email
  const email = `${matricula}@cdacuna.tecnm.mx`;

  // validacion para que no se repita el email
  User.findOne({ "personal_info.email": email })
    .then((user) => {

      if(!user){
        return res.status(403).json({ "error": "El correo no existe" });
      }

      // login en caso de que ya exista el usuario
      if(password != user.personal_info.password){
        return res.status(403).json({ "error": "Contraseña incorrecta." });
      } else {
        return res.status(200).json(formatDataToSend(user));
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ "error": err.message });
    })

})

// get => mostrar los posts
server.get('/latest-posts', (req, res) => {

  let maxLimit = 10;

  Posts.find()
  .populate("author", "personal_info.profile_img personal_info.username personal_info.fullname -_id")
  .sort({ "publishedAt": -1 })
  .select("post_id title des activity tags publishedAt -_id")
  .limit(maxLimit)
  .then(posts => {
    return res.status(200).json({ posts })
  })
  .catch(err => {
    return res.status(500).json({ error: err.message })
  })
})

// pots => crear post nuevo
server.post('/create-post', verifyJWT, (req, res) => {
  let authorId = req.user;

  let { title, des, tags} = req.body;

  // validaciones
  if(!title.length){
    return res.status(403).json({ error: "Es necesario incluir un titulo" });
  }

  if(!des.length || des.length > 200){
  return res.status(401).json({ error: "La descripcion debe tener menos de 200 caracteres" });
  }

  if(!tags.length || tags.length > 2){
    return res.status(403).json({ error: "Debe haber tags" });
  }

  // convertir tags a lc
  tags = tags.map(tag => tag.toLowerCase());

  // post_id en la ruta para cada post nuevo
  let post_id = title.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, "-").trim() + nanoid();

  // estructura del post
  let post = new Posts(
    {
      title, 
      des, 
      tags, 
      author: authorId, 
      post_id
    }
  );

  // guardando en db
  post.save().then(post => {
    let incrementVal = 1;

    User.findOneAndUpdate({ _id: authorId }, { $inc : {"account_info.total_posts" : incrementVal}, $push : { "posts": post._id } })
    .then(user => {
      return res.status(200).json({ id: post.post_id });
    })
    .catch(err => {
      return res.status(500).json({ error: "Error al actualizar el numero de posts." });
    })
  })
  .catch(err => {
    return res.status(500).json({ error: err.message });
  })

})

// inicializando el serverd
server.listen(PORT, () => {
  console.log('listeningggg on port -> ' + PORT);
})