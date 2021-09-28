import Container from "../../components/Container";
import Sidebar from "../../components/Sidebar";
import Chatting from "./Chatting";

function index() {
  return (
    <Container>
      <Sidebar />
      <Chatting />
    </Container>
  );
}

export default index;
