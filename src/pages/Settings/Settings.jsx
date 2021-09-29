import Title from "../../components/Title";
import { BiImageAdd } from "react-icons/bi";
import Image from "../../components/Image";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

const baseUrl = "https://final-project-user-profile.herokuapp.com";

function Settings() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios({
      url: baseUrl + "/user/1",
      method: "GET",
      headers: {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbF9uYW1lIjoiTXVsYWkgQmFydSIsImVtYWlsIjoidmlraS55YXB1dHJhQGdtYWlsLmNvbSIsImlzX3ByZW1pdW0iOmZhbHNlLCJpYXQiOjE2MzIyOTQ2MzV9.w1hDI9ruwUsEIFWocqiRmLbjkWaOo8r-5tjvQekkSWs",
      },
    })
      .then(({ data }) => {
        setUser({
          ...data,
          birth_date: moment(data.birth_date).format("DD/MM/YYYY"),
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-7">
      <Title name="Settings" />
      <div className="grid w-full gap-3 lg:grid-cols-settings">
        <div className="flex flex-col gap-3 mt-10">
          <p className="text-xl">Account Information</p>
          <div className="flex flex-col">
            <p>Full Name</p>
            <span className="border-1 border-gray-200 rounded-md bg-gray-600 text-white px-3 py-2 w-full">
              {user.full_name}
            </span>
          </div>
          <div className="flex flex-col">
            <p>Email</p>
            <span className="border-1 truncate border-gray-200 rounded-md bg-gray-600 text-white px-3 py-2">
              {user.email}
            </span>
          </div>
          <div className="flex flex-col">
            <p>Birth Date</p>
            <span className="border-1 border-gray-200 rounded-md bg-gray-600 text-white px-3 py-2">
              {user.birth_date}
            </span>
          </div>
          <div className="flex flex-col">
            <p>Social Media Link</p>
            <a
              href={user.social_media_link}
              target="_blank"
              rel="noreferrer"
              className="border-1 truncate border-gray-200 rounded-md bg-gray-600 text-white px-3 py-2 w-full"
            >
              {user.social_media_link}
            </a>
          </div>
          <div className="flex flex-col">
            <p>Portfolio Link</p>
            <a
              href={user.portfolio_link}
              target="_blank"
              rel="noreferrer"
              className="border-1 truncate border-gray-200 rounded-md bg-gray-600 text-white px-3 py-2 w-full"
            >
              {user.portfolio_link}
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-10 lg:ml-10">
          <p className="text-xl">Image or Video</p>
          <div className="flex justify-center items-center gap-2 border-2 border-custom-gray rounded-md bg-gray-100 h-32 cursor-pointer hover:bg-gray-300">
            <BiImageAdd size={30} />
            <span className="text-black">Upload Image or Video</span>
          </div>
          {user.main_card_showoff?.includes("video") && (
            <div className="bg-light-gray rounded-lg">
              <div className="bg-origin-border aspect-w-4 aspect-h-3 w-full bg-contain bg-no-repeat bg-center">
                <video controls="controls" src={user.main_card_showoff} />
              </div>
            </div>
          )}
          {user.main_card_showoff?.includes("image") && (
            <Image url={user.main_card_showoff} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
