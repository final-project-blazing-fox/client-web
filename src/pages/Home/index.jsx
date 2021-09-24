import MainContainer from "./MainContainer";
import Sidebar from "../../components/Sidebar";
import Content from "./Content";

function Home() {
  return (
    <MainContainer>
      <Sidebar />
      <Content />
    </MainContainer>
  );
}

export default Home;
