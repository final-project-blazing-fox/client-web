import Card from "../../components/Card";
import SearchBox from "../../components/SearchBox";
import Title from "./Title";
import { useEffect, useState } from "react";
import axios from "axios";

function Content() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://final-project-user-profile.herokuapp.com/user", {
        method: "GET",
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZnVsbF9uYW1lIjoiVmlraSBZYXB1dHJhIiwiZW1haWwiOiJ2aWtpLnlhcHV0cmFAZ21haWwuY29tIiwiaXNfcHJlbWl1bSI6dHJ1ZSwiaWF0IjoxNjMyNTg1NTE0fQ.yjNe-7cOf98KNwHW9sHUg0IThu8BalLHauF-vI4B_M0",
        },
      })
      .then((results) => {
        setUsers(results.data);
      });
  }, []);

  return (
    <div>
      <div className="flex justify-between p-7">
        <Title />
        <SearchBox />
      </div>
      <hr className="mx-7 my-2" />
      <div className="grid grid-cols-2 gap-5 p-6">
        {users.map((user) => {
          return (
            <Card
              key={user.id}
              full_name={user.full_name}
              main_card_showoff={user.main_card_showoff}
              portfolio_link={user.portfolio_link}
              role={user.register_as}
              social_media_link={user.social_media_link}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Content;
