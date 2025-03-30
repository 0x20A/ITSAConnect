import { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { UserAuthForm } from "./login/UserAuthForm";
import { NavBar } from "./nav-bar/NavBar";
import { lookInSession } from "./common/Session";

export const UserContext = createContext({});

const App = () => {

    // useState to control the session
    const [userAuth, setUserAuth] = useState({});

    // useEffect to re-renderize just one time
    useEffect(() => {
        let userInSession = lookInSession("user");

        userInSession 
        ? setUserAuth(JSON.parse(userInSession))
        : setUserAuth({ access_token: null })

    }, [])

    return (
        <UserContext.Provider value={{userAuth, setUserAuth}}>
            {/* // setting up the routes */}
            <Routes>
                <Route path="/" element={<NavBar />}>
                    <Route path="signin" element={ <UserAuthForm type="sign-in" /> } />
                    <Route path="signup" element={ <UserAuthForm type="sign-up" /> } />
                </Route>
            </Routes>
        </UserContext.Provider>
    )
}

export default App;