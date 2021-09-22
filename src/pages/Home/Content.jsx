import SearchBox from "../../components/SearchBox";
import Title from "./Title";

function Content() {
  return (
    <div>
      <div className="flex justify-between p-7">
        <Title />
        <SearchBox />
      </div>
    </div>
  );
}

export default Content;
