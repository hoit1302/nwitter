import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState(""); // 입력받는 nweet
    const [nweets, setNweets] = useState([]);

    useEffect(() => {

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
        }); // nweet의 모양
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
                    // Nweet component는 2개의 props(nweetObj, isOwner)을 가짐
                    // nweetObj는 nweet의 모든 데이터이고 - text, createdAt, creatorId
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;