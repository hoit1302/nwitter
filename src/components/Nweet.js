import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false); // nweet을 수정하고 있는지 아닌지?
    const [newNweet, setNewNweet] = useState(nweetObj.text); // 수정하는 nweet
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
            // document를 수정하거나 삭제할 때에도 reference의 요소가 필요해!!!
            // firebase로 url을 보내고 storage 안에서 reference를 찾아
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

        <div className="nweet">
            {editing ? (
                <>
                    {/* 수정하고 있고 */}

                    {isOwner && (
                        <>
                            {/* 주인이라면 form을 보여줘 */}
                            <form onSubmit={onSubmit} className="container nweetEdit">
                                <input
                                    type="text"
                                    placeholder="Edit your nweet"
                                    value={newNweet}
                                    required
                                    onChange={onChange}
                                />
                                <input type="submit" value="Update Nweet" className="formBtn" />
                            </form>
                            <span onClick={toggleEditing} className="formBtn cancelBtn">
                                Cancel
                            </span>
                        </>
                    )}
                </>
            ) : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {nweetObj.attachmentUrl &&
                            // attachmentUrl이 있을 때 img를 보여줘.
                            <img src={nweetObj.attachmentUrl} />
                        }
                        {isOwner && (
                            <div class="nweet__actions">
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                <span onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                            </div>
                        )}
                    </>)
            }
        </div>
    )
};

export default Nweet;
