import React, { useState } from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
    // https://reactrouter.com/web/api/Hooks/usehistory
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/"); // logout 후 다시 home으로 돌아갈 수 있도록 url 바꿔 redirect
    };
    const onChange = (event) => {
        const {
          target: { value },
        } = event;
        setNewDisplayName(value);
      };
      const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
          await userObj.updateProfile({
            displayName: newDisplayName,
          });
          refreshUser();
        }
    };
    // const getMyNweets = async () => {
    //     // noSQL이라서 쿼리 실행이 안된다. 그래서 firestore에게 query를 사용한다고 알려줘야 한다.
    //     // error가 뜨는데 누르면 create a composite index 창이 뜬 곳으로 이동.
    //     const nweets = await dbService
    //         .collection("nweets")
    //         .where("creatorId", "==", userObj.uid) // filtering, 바로 뒤에 .where을 써서 더 filtering 가능
    //         .orderBy("createdAt")
    //         .get();
    //     console.log(nweets.docs.map((doc) => doc.data()));
    // };
    // useEffect(() => {
    //     getMyNweets();
    // }, []);
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};