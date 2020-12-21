import React, { useState } from "react";
import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";

// =>: arrow function. 모던 자바스크립의 종류. 이것 자체에 return이라는 뜻이 내재되어 있기에 return을 표시하지 않아도 된다.
const Auth = () => {
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);
    };

    return (
        <div>
            <AuthForm />
            <div>
                <button onClick={onSocialClick} name="google">
                    Continue with Google
                </button>
                <button onClick={onSocialClick} name="github">
                    Continue with Github
                </button>
            </div>
        </div>
    );
};

export default Auth;