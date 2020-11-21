import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onChange = (event) => {
        // event로부터 정보를 받아 옴. 그 중 하나의 정보가 target이고 target안에 들어있는 name과 value를 가져 옴
        const { target: { name, value }, } = event;
        if (name === "email") {
            setEmail(value); // input의 value는 state에 저장된다.
        } else if (name === "password") {
            setPassword(value); // input의 value는 state에 저장된다.
        }
    };
    const onSubmit = (event) => {
        // submit시 default로 refresh 되는 것 방지.
        event.preventDefault(); // prevent default event
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required
                    value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required
                    value={password} onChange={onChange} />
                <input type="submit" value="Log In" />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;