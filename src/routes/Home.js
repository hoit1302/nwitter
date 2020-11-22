import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState(""); // 입력받는 nweet
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState();

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
        let attachmentUrl = "";
        if (attachment != "") {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`); // 1. 파일에 대한 reference를 만든다. 파일 업로드. 보통 child에 image의 path를 넣는데, 이는 folder를 만듦, uuid는 랜덤으로 이름생성함. npm install uuid하고 import 해주어야함
            const response = await attachmentRef.putString(attachment, "data_url"); // 2. 파일 데이터를 reference로 보냄.
            attachmentUrl = await response.ref.getDownloadURL(); // 3. url 다운로드하고 문자열 다운로드받은 url로 업데이트, 문서를 보면 reference안에 있기에! - 잘 봐야 함, promise를 return (기달려달란 의미)하기에 await
            // console.log(response);
        }
        // nweet의 모양
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("");
    };
    const onChange = (event) => {
        const { target: { value }, } = event; // event로부터 그 안에 target의 value를 줘
        setNweet(value);
    };
    const onFileChange = (event) => {
        const { target: { files }, } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // # 이게 실행됨.
            const { currentTarget: { result }, } = finishedEvent;
            setAttachment(result); // attachment의 string은 이미지 전체.
        };
        reader.readAsDataURL(theFile); // #이게 끝나면 
    };
    const onClearAttachment = () => setAttachment(null);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" alt="사진" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
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