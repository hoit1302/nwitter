import React, { useEffect } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";

export default ({ userObj }) => {
    // https://reactrouter.com/web/api/Hooks/usehistory
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/"); // logout 후 다시 home으로 돌아갈 수 있도록 url 바꿔 redirect
    };
    const getMyNweets = async () => {
        // noSQL이라서 쿼리 실행이 안된다. 그래서 firestore에게 query를 사용한다고 알려줘야 한다.
        // error가 뜨는데 누르면 create a composite index 창이 뜬 곳으로 이동.
        const nweets = await dbService
            .collection("nweets")
            .where("creatorId", "==", userObj.uid) // filtering, 바로 뒤에 .where을 써서 더 filtering 가능
            .orderBy("createdAt")
            .get();
        console.log(nweets.docs.map((doc) => doc.data()));
    };

    useEffect(() => {
        getMyNweets();
    }, []);
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};