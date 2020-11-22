import React, { useState } from "react";
import { dbService } from "fbase";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false); // nweet을 수정하고 있는지 아닌지?
    const [newNweet, setNewNweet] = useState(nweetObj.text); // 수정하는 nweet
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet,
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    };
    return (

        <div>
            {editing ? (
                <>
                    {/* 수정하고 있고 */}

                    {isOwner && (
                        <>
                        {/* 주인이라면 form을 보여줘 */}
                            <form onSubmit={onSubmit}>
                                <input
                                    type="text"
                                    placeholder="Edit your nweet"
                                    value={newNweet}
                                    required
                                    onChange={onChange}
                                />
                                <input type="submit" value="Update Nweet" />
                            </form>
                            <button onClick={toggleEditing}>Cancel</button>
                        </>
                    )}
                </>
            ) : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {nweetObj.attachmentUrl && (
                            // attachmentUrl이 있을 때 img를 보여줘.
                            <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
                        )}
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete Nweet</button>
                                <button onClick={toggleEditing}>Edit Nweet</button>
                            </>
                        )}
                    </>)
            }
        </div>
    )
};

export default Nweet;
