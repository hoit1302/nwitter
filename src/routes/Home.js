import React, { useState, useEffect } from "react";
import { dbService } from "fbase";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    // for each를 사용한 옛날 방법(?)
    // const getNweets = async () => {
    //     const dbNweets = await dbService.collection("nweets").get();
    //     dbNweets.forEach((document) => {
    //         const nweetObject = {
    //             ...document.data(), // es6, spread attribute 기능
    //             id: document.id,
    //         };
    //         setNweets((prev) => [nweetObject, ...prev]);
    //         // set이 붙은 함수의 경우, 값 대신에 함수를 전달할 수 있다.
    //         // 만약 함수를 전달하면, 리액트는 이전 값에 접근할 수 있게 해준다.
    //     });
    // };
    useEffect(() => {
        // getNweets();
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("");
    };
    const onChange = (event) => {
        const { target: { value }, } = event; // event로부터 그 안에 target의 value를 줘
        setNweet(value);
    };
    console.log(nweets);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Home;