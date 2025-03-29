import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { UserAuthForm } from "./pages/UserAuthForm";

const App = () => {
    return (
        // setting up the routes
        <Routes>
            <Route path="/" element={<NavBar/>}>
                <Route path="signin" element={ <UserAuthForm type="sign-in" /> } />
                <Route path="signup" element={ <UserAuthForm type="sign-up" /> } />
            </Route>
        </Routes>
    )
}

export default App;