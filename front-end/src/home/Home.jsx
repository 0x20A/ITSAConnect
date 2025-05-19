import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { Loader } from "./components/Loader";
import { Hero } from "../Hero/Hero";
import { PageAnimation } from "../common/PageAnimation";
import { InPageNavigation } from "./components/InPageNavigation";
import axios from "axios";
import { PostCard } from "./components/PostCard";

export const Home = () => {

  const [posts, setPosts] = useState(null);

  // access_token para verificar la sesion actual
  let { userAuth: { access_token }, setUserAuth } = useContext(UserContext);

  // mostrando los posts
  const fetchLatestPosts = () => {
    axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-posts")
    .then(( {data} ) => {
      setPosts(data.posts);
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchLatestPosts();
  }, []);
  

  return (
    access_token === null ? <Hero />
    :
    <PageAnimation> 
      <section className="h-cover flex justify-center gap-10">
        
        {/* ultimos posts */}
        <div className="w-full">
          <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">

            <button  
              className="p-4 px-5 capitalize text-black"
            >
              Inicio
            </button>
            <hr className="absolute bottom-0 duration-300" />
          </div>

          {/* renderizando los ultimos 10 posts */}
          <>
            {
              posts === null ? <Loader /> :
              posts.map((post, i) => {
                return <PageAnimation transition={{ duration: 1, delay: i*.1}} key={i}>

                  <PostCard content={ post } author={post.author.personal_info}/>
                </PageAnimation>
              })
            }
          </>
        </div>

        {/* filtros y tendencias */}
        <div>
          
        </div>
      </section>
    </PageAnimation>
  )
}
