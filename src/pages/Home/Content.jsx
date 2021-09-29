import Card from "../../components/Card";
import SearchBox from "../../components/SearchBox";
import { useEffect, useState } from "react";
import axios from "axios";
import Title from "../../components/Title";

function Content() {
  const [users, setUsers] = useState([]);
  const [likes, setLikes] = useState([]);

  const handleLike = async (id) => {
    setLikes([...likes, id]);
  };

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
      });
  }, []);

  return (
    <div>
      <div className="flex justify-between p-7">
        <Title name="Find a Coder" />
        <SearchBox />
      </div>
      <hr className="mx-7 my-2" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-6">
        {users.map((user) => {
          return (
            <Card
              key={user.id}
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
