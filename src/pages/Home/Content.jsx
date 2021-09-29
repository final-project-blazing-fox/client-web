import Card from "../../components/Card";
import SearchBox from "../../components/SearchBox";
import { useEffect, useState } from "react";
import axios from "axios";
import Title from "../../components/Title";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";

// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
  injectStyle();
}

const baseUrl = "https://blazing-matching-service.herokuapp.com";
const userUrl = "https://final-project-user-profile.herokuapp.com";

function Content() {
  const [users, setUsers] = useState([]);
  const [likes, setLikes] = useState([]);
  const user = JSON.parse(localStorage.user);

  const handleLike = async (id) => {
    setLikes([...likes, id]);
  };

  const notify = (name) =>
    toast(`You are matched and now can chat with ${name}!`);

  useEffect(() => {
    localStorage.setItem("likes", []);
    if (!localStorage.likes) {
      return;
    }
    return () => {
      return axios({
        url: `${baseUrl}/likes/${user.id}`,
        method: "PATCH",
        data: {
          likes:
            localStorage.likes &&
            localStorage.likes.split(",").map((like) => parseInt(like)),
        },
        headers: {
          "Content-Type": "application/json",
          access_token: user.access_token,
        },
      }).then(() => {
        return axios
          .get(`${baseUrl}/matches/${user.id}`, {
            method: "GET",
            headers: {
              access_token: user.acccess_token,
            },
          })
          .then((results) => {
            localStorage.setItem("matches", results.data.body.matches);
          });
      });
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("likes", likes);
  }, [likes]);

  useEffect(() => {
    axios
      .get(`${userUrl}/user`, {
        method: "GET",
        headers: {
          access_token: user.access_token,
        },
      })
      .then((results) => {
        setUsers(
          results.data.filter(
            (user) => user.id !== JSON.parse(localStorage.user).id
          )
        );
        axios
          .get(`${baseUrl}/matches/${user.id}`, {
            method: "GET",
            headers: {
              access_token: user.access_token,
            },
          })
          .then((matches) => {
            if (localStorage.matches) {
              let newMatches = matches.data.body.matches.filter(
                (x) => !localStorage.matches.includes(x)
              );
              newMatches.forEach((matchId) => {
                let matchedUser = results.data.filter(
                  (user) => +user.id === +matchId
                );
                notify(matchedUser.full_name);
              });
              localStorage.setItem("matches", matches.data.body.matches);
            } else {
              matches.data.body.matches.forEach((matchId) => {
                // console.log(matchId)
                let matchedUser = results.data.filter(
                  (user) => +user.id === +matchId
                )[0];
                notify(matchedUser.full_name);
              });
              localStorage.setItem("matches", matches.data.body.matches);
            }
          });
      });
  }, []);

  const onClickFav = (userId) => {
    const newUsers = users.filter((user) => user.id !== userId);
    setUsers(newUsers);
  };

  return (
    <div>
      <div className="flex justify-between p-7">
        <Title name="Find a Coder" />
        <SearchBox />
      </div>
      <hr className="mx-7 my-2" />
      <ToastContainer />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-6">
        {users.map((user) => {
          return (
            <Card
              key={user.id}
              onClickFav={onClickFav}
              full_name={user.full_name}
              main_card_showoff={user.main_card_showoff}
              portfolio_link={user.portfolio_link}
              role={user.register_as}
              social_media_link={user.social_media_link}
              id={user.id}
              onLike={handleLike}
              isPremium={JSON.parse(localStorage.user).is_premium}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Content;
