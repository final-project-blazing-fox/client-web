import Title from "../../components/Title";
import { BiImageAdd } from "react-icons/bi";
import Image from "../../components/Image";

function Settings() {
  return (
    <div className="p-7">
      <Title name="Settings" />
      <div
        className="grid w-full gap-3"
        style={{ gridTemplateColumns: "30% 1fr" }}
      >
        <div className="flex flex-col gap-3 mt-10">
          <p className="text-xl">Account Information</p>
          <div className="flex flex-col">
            <p>Full Name</p>
            <span className="border-1 border-gray-200 rounded-md bg-gray-600 text-white px-3 py-2 w-full">
              Ari Juanda
            </span>
          </div>
          <div className="flex flex-col">
            <p>Email</p>
            <span className="border-1 border-gray-200 rounded-md bg-gray-600 text-white px-3 py-2">
              arjun@gmail.com
            </span>
          </div>
          <div className="flex flex-col">
            <p>Birth Date</p>
            <span className="border-1 border-gray-200 rounded-md bg-gray-600 text-white px-3 py-2">
              01/01/1970
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-10 ml-10">
          <p className="text-xl">Images</p>
          <div className="flex justify-center items-center gap-2 border-2 border-custom-gray rounded-md bg-gray-100 h-32 cursor-pointer hover:bg-gray-300">
            <BiImageAdd size={30} />
            <span className="text-black">Upload Images</span>
          </div>
          <Image url="https://i.stack.imgur.com/AZUmQ.jpg" />
          <Image url="https://i.stack.imgur.com/AZUmQ.jpg" />
        </div>
      </div>
    </div>
  );
}

export default Settings;
