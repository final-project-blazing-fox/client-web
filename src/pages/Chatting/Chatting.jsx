import { useParams } from "react-router";
import firebase from "firebase";
import { useEffect, useState } from "react";

function Chatting() {
  const { uid } = useParams();
  const db = firebase.firestore();
  const userdata = localStorage.firebase_user
    ? JSON.parse(localStorage.firebase_user)
    : null;
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    db.collection("conversations")
      .where("user_uid_1", "in", [userdata.uid, uid])
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const conversations = [];

        querySnapshot.forEach((doc) => {
          if (
            (doc.data().user_uid_1 === userdata.uid &&
              doc.data().user_uid_2 === uid) ||
            (doc.data().user_uid_1 === uid &&
              doc.data().user_uid_2 === userdata.uid)
          ) {
            conversations.push(doc.data());
          }
        });

        setChatUser(conversations);
      });
  }, [uid]);

  const submitMessage = (e) => {
    const msgObj = {
      user_uid_1: userdata.uid,
      user_uid_2: uid,
      message,
    };

    db.collection("conversations")
      .add({
        ...msgObj,
        isView: false,
        createdAt: new Date(),
      })
      .then((data) => {
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div style={{ margin: "30px" }}>
        {chatUser
          ? chatUser.map((chat, index) => (
              <div
                key={index}
                style={{
                  textAlign:
                    chat.user_uid_1 === userdata.uid ? "right" : "left",
                }}
              >
                <p className="messageStyle">{chat.message}</p>
              </div>
            ))
          : null}
        <textarea
          style={{ border: "1px solid black" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write Message"
        />
        <br />
        <button onClick={submitMessage} style={{ border: "1px solid black" }}>
          Send
        </button>
      </div>
    </>
  );
}

export default Chatting;
