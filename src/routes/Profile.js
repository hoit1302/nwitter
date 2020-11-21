import React from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

export default () => {
    // https://reactrouter.com/web/api/Hooks/usehistory
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/"); // logout 후 다시 home으로 돌아갈 수 있도록 url 바꿔 redirect
    };
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};