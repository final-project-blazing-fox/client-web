import Card from "../../components/Card";
import SearchBox from "../../components/SearchBox";
import { useEffect, useState } from "react";
import axios from "axios";
import Title from "../../components/Title";
import { ToastContainer, toast } from "react-toastify";

function Content() {
  const [users, setUsers] = useState([]);
  const [likes, setLikes] = useState([]);

  const handleLike = async (id) => {
    setLikes([...likes, id]);
  };

  const notify = (name) =>
    toast(`You are matched and now can chat with ${name}!`);

  useEffect(() => {
    return () => {
      console.log(localStorage.likes.split(","));
      return axios({
        url: `https://blazing-matching-service.herokuapp.com/likes/1`,
        method: "PATCH",
        data: {
          likes: localStorage.likes.split(",").map((like) => parseInt(like)),
        },
        headers: {
          "Content-Type": "application/json",
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbF9uYW1lIjoiTW9oYW1tYWQgSWRoYW0iLCJlbWFpbCI6Im1vaGFtbWFkaWRoYW0xNEBnbWFpbC5jb20iLCJpc19wcmVtaXVtIjp0cnVlLCJpYXQiOjE2MzI4MjQwMDF9.PkXy_5UOWEd8mcdcoJ8kPRmz6fzeLViVkY6THcoGw7Q",
        },
      }).then(() => {
        return axios
          .get(`http://blazing-matching-service.herokuapp.com/matches/1`, {
            method: "GET",
            headers: {
              access_token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbF9uYW1lIjoiTW9oYW1tYWQgSWRoYW0iLCJlbWFpbCI6Im1vaGFtbWFkaWRoYW0xNEBnbWFpbC5jb20iLCJpc19wcmVtaXVtIjp0cnVlLCJpYXQiOjE2MzI4MjQwMDF9.PkXy_5UOWEd8mcdcoJ8kPRmz6fzeLViVkY6THcoGw7Q",
            },
          })
          .then((results) => {
            console.log(results.data.body);
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
      .get("https://final-project-user-profile.herokuapp.com/user", {
        method: "GET",
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbF9uYW1lIjoiTW9oYW1tYWQgSWRoYW0iLCJlbWFpbCI6Im1vaGFtbWFkaWRoYW0xNEBnbWFpbC5jb20iLCJpc19wcmVtaXVtIjp0cnVlLCJpYXQiOjE2MzI4MjQwMDF9.PkXy_5UOWEd8mcdcoJ8kPRmz6fzeLViVkY6THcoGw7Q",
        },
      })
      .then((results) => {
        setUsers(results.data);
        axios
          .get(`http://blazing-matching-service.herokuapp.com/matches/1`, {
            method: "GET",
            headers: {
              access_token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbF9uYW1lIjoiTW9oYW1tYWQgSWRoYW0iLCJlbWFpbCI6Im1vaGFtbWFkaWRoYW0xNEBnbWFpbC5jb20iLCJpc19wcmVtaXVtIjp0cnVlLCJpYXQiOjE2MzI4MjQwMDF9.PkXy_5UOWEd8mcdcoJ8kPRmz6fzeLViVkY6THcoGw7Q",
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
                console.log(matchId);
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
            />
          );
        })}
      </div>
    </div>
  );
}

export default Content;
