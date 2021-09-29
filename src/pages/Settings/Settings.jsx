import Title from "../../components/Title";
import Image from "../../components/Image";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";

// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
  injectStyle();
}

function Settings() {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [gambar, setGambar] = useState();
  const userLocal = JSON.parse(localStorage.user);

  useEffect(() => {
    setUser({
      ...userLocal,
      birth_date: userLocal.birth_date.slice(0, 10),
    });
  }, []);

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    // console.log(gambar);
    const formData = new FormData();
    formData.append("file", gambar);
    formData.append("upload_preset", "unsigned-blazing");
    formData.append("cloud_name", "vikiyaputra");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/vikiyaputra/auto/upload",
        {
          method: "post",
          body: formData,
        }
      );
      const data = await res.json();

      setUser({ ...user, main_card_showoff: data.url });
      toast.dark("Upload image/video successful");
    } catch (err) {
      toast("Error uploading image/video");
    }
  };

  const changeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmitEdit = (e) => {
    axios({
      url: `https://final-project-user-profile.herokuapp.com/user/${user.id}`,
      method: "patch",
      headers: {
        "Content-Type": "application/json",
        access_token: JSON.parse(localStorage.user).access_token,
      },
      data: { ...user, birth_date: new Date(user.birth_date).toISOString() },
    })
      .then(({ data }) => {
        toast("Edit user profile successful");
      })
      .catch((err) => {
        toast("Error editing user profile");
      });
  };

  return (
    <div className="p-7">
      <Title name="Settings" />
      <div className="grid gap-3 lg:grid-cols-settings overflow-x-hidden">
        <div className="flex flex-col gap-3 mt-10">
          <p className="text-xl">Account Information</p>
          <div className="flex flex-col">
            <p>Full Name</p>
            <input
              value={user.full_name}
              onChange={changeInput}
              name="full_name"
              className="border-1 border-gray-200 rounded-md bg-gray-600 text-white px-3 py-2 w-full"
            />
          </div>
          <div className="flex flex-col">
            <p>Email</p>
            <span className="border-1 truncate border-gray-200 rounded-md bg-gray-600 text-white px-3 py-2">
              {user.email}
            </span>
          </div>
          <div className="flex flex-col">
            <p>Birth Date</p>
            <input
              value={user.birth_date}
              type="date"
              name="birth_date"
              onChange={changeInput}
              className="border-1 border-gray-200 rounded-md bg-gray-600 text-white px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <p>Role</p>
            <input
              className="border-1 border-gray-200 rounded-md bg-gray-600 text-white px-3 py-2 w-full"
              onChange={(e) => changeInput(e)}
              type="text"
              id="fname"
              name="register_as"
              placeholder="title"
              value={user.register_as}
            />
          </div>
          <div className="flex flex-col">
            <p>Social Media Link</p>
            <input
              value={user.social_media_link}
              onChange={changeInput}
              name="social_media_link"
              className="border-1 truncate border-gray-200 rounded-md bg-gray-600 text-white px-3 py-2 w-full"
            ></input>
          </div>
          <div className="flex flex-col">
            <p>Portfolio Link</p>
            <input
              value={user.portfolio_link}
              onChange={changeInput}
              name="portfolio_link"
              className="border-1 truncate border-gray-200 rounded-md bg-gray-600 text-white px-3 py-2 w-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-10 lg:ml-10">
          <p className="text-xl">Image or Video</p>

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

          {/* Mas Viki */}
          <div className="border-1 border-gray-200 rounded-md bg-gray-600 text-white px-3 py-2">
            <form onSubmit={handleSubmitFile} className="form">
              <input
                id="fileInput"
                type="file"
                name="image"
                onChange={(e) => {
                  setGambar(e.target.files[0]);
                }}
                className="form-input"
              ></input>
            </form>
          </div>
          <div className="flex flex-col">
            <button
              onClick={handleSubmitFile}
              className="border-1 border-blue-200 rounded-md bg-blue-600 text-white px-3 py-2 btn"
              type="submit"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-3 mt-10 border-t-2 border-gray-300 pt-10">
        <button
          onClick={(e) => handleSubmitEdit(e)}
          className="px-2 py-2 bg-green-400 rounded-md text-white hover:bg-green-500"
        >
          Save
        </button>
        <button
          onClick={(e) => history.push("/")}
          className="px-2 py-2 bg-red-400 rounded-md text-white hover:bg-red-500"
        >
          Cancel
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Settings;
