import React, { useState, useEffect } from "react";
import AppRouter from "components/Router"; //absolute path, https://create-react-app.dev/docs/importing-a-component/
import { authService } from "fbase";

function App() {
    const [init, setInit] = useState(false); // firebase가 초기화하는 것을 기다리기 위해
    const [userObj, setUserObj] = useState(null);
    // authService.currentUser에서는 실제로 로그인 된 것인지 로그아웃 한 것인 잘 모른다. 로그아웃이라고 알고있지만 firebase가 아직 시작되지 않았기 때문일 수 있다.
    // https://firebase.google.com/docs/reference/js/firebase.User
    useEffect(() => {
        // event Listener,  user의 변화 관찰
        authService.onAuthStateChanged((user) => { // 로그아웃, 로그인, 계정 생성, firebase 초기화 시
            if (user) {
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                    updateProfile: (args) => user.updateProfile(args),
                });
            } else {
                setUserObj(null);
            }
            setInit(true);
        });
    }, []);
    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
        });
    };

    return (
        <>
            {/* router에게 상태 전달, init이 false일 때 router 감추기 */}
            {init ? (
                <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} />
            ) : ("Initializing...")}
            <footer>
                &copy; {new Date().getFullYear()} Nwitter
            </footer>
        </>);
}

export default App;