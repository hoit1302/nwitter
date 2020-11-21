import React, { useState } from "react";
import AppRouter from "components/Router"; //absolute path, https://create-react-app.dev/docs/importing-a-component/
import { authService } from "fbase";

function App() {
    console.log(authService.currentUser);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <>
            <AppRouter isLoggedIn={isLoggedIn} /> 
            {/* router에게 상태 전달 */}
            <footer>
                &copy; {new Date().getFullYear()} Nwitter
            </footer>
        </>);
}

export default App;