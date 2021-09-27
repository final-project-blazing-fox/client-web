import Card from "../../components/Card";
import SearchBox from "../../components/SearchBox";
import Title from "../../components/Title";

function Content() {
  return (
    <div>
      <div className="flex justify-between p-7">
        <Title name="Find a Coder" />
        <SearchBox />
      </div>
      <hr className="mx-7 my-2" />
      <div className="grid grid-cols-2 gap-5 p-6">
        <Card role="Coder" />
        <Card role="Designer" />
        <Card />
        <Card role="Designer" />
      </div>
    </div>
  );
}

export default Content;
