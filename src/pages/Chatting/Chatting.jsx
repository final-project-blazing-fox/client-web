/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router";
import firebase from "firebase";
import { useEffect, useState } from "react";
import axios from "axios";

function Chatting() {
  const { uid } = useParams();
  const db = firebase.firestore();
  const userLocal = localStorage.user;
  const userdata = localStorage.firebase_user
    ? JSON.parse(localStorage.firebase_user)
    : null;
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userLocal) {
      axios({
        url: `https://final-project-user-profile.herokuapp.com/user/${userLocal.id}`,
        method: "GET",
        headers: {
          access_token: userLocal.access_token,
        },
      }).then(({ data }) => {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(data));
      });
    }
  }, []);

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
      <div className="flex flex-col m-3 h-screen">
        <div className="overflow-auto mb-4 py-2" style={{ height: "70%" }}>
          {chatUser
            ? chatUser.map((chat, index) => (
                <div
                  key={index}
                  style={{
                    textAlign:
                      chat.user_uid_1 === userdata.uid ? "right" : "left",
                  }}
                >
                  <p className="messageStyle bg-custom-green rounded-xl mb-2 px-4 py-1 text-white inline-block">
                    {chat.message}
                  </p>
                </div>
              ))
            : null}
        </div>
        <div>
          <textarea
            className="w-full border-2 border-custom-gray rounded-md p-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write Message"
          />
          <br />
          <button
            onClick={submitMessage}
            className="px-8 py-2 bg-blue-400 rounded-md text-white w-full"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default Chatting;
