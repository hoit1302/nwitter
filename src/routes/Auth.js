import React, { useState } from "react";
import { authService } from "fbase";

// =>: arrow function. 모던 자바스크립의 종류. 이것 자체에 return이라는 뜻이 내재되어 있기에 return을 표시하지 않아도 된다.
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const onChange = (event) => {
        // event로부터 정보를 받아 옴. 그 중 하나의 정보가 target이고 target안에 들어있는 name과 value를 가져 옴
        const { target: { name, value }, } = event;
        if (name === "email") {
            setEmail(value); // input의 value는 state에 저장된다.
        } else if (name === "password") {
            setPassword(value); // input의 value는 state에 저장된다.
        }
    };
    const onSubmit = async (event) => {
        // submit시 default로 refresh 되는 것 방지.
        event.preventDefault(); // prevent default event

        try {
            // https://firebase.google.com/docs/reference/js/firebase.auth.EmailAuthProvider
            let data;
            if (newAccount) {
                // create
                // await (promise라서)은 async를 써야 작동한다.
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                // log in
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required
                    value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required
                    value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;