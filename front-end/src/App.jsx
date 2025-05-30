import { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { UserAuthForm } from "./login/UserAuthForm";
import { NavBar } from "./nav-bar/NavBar";
import { lookInSession } from "./common/Session";
import { Editor } from "./editor/Editor";
import { Home } from "./home/Home";

// createContext para compartir los datos del usuario en
// todas las rutas de la app
export const UserContext = createContext({});

const App = () => {

    // almacenando el user auth de forma global
    const [userAuth, setUserAuth] = useState({});

    // useEffect para renderizar solo una vez al contenido al iniciar la sesion
    useEffect(() => {
        let userInSession = lookInSession("user");

        userInSession 
        ? setUserAuth(JSON.parse(userInSession))
        : setUserAuth({ access_token: null })

    }, [])

    return (
        // componente global UserContext para mostrar el contenido de la sesion activa
        <UserContext.Provider value={{userAuth, setUserAuth}}>
            {/* // rutas establecidas */}
            <Routes>
                <Route path="/editor" element={<Editor />} />
                <Route path="/" element={<NavBar />}>
                    <Route index element={<Home />} />
                    <Route path="signin" element={ <UserAuthForm type="sign-in" /> } />
                    <Route path="signup" element={ <UserAuthForm type="sign-up" /> } />
                </Route>
            </Routes>
        </UserContext.Provider>
    )
}

export default App;