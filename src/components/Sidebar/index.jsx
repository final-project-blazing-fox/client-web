import MainContainer from "./MainContainer";
import Title from "./Title";
import CreatePostContainer from "./CreatePostContainer";
import Menu from "./Menu";

function Sidebar() {
  return (
    <MainContainer>
      <Title />
      <CreatePostContainer />
      <Menu />
    </MainContainer>
  );
}

export default Sidebar;
