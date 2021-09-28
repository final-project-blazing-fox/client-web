import Container from "../../components/Container";
import Sidebar from "../../components/Sidebar";
import Settings from "./Settings";

function index() {
  return (
    <Container>
      <Sidebar />
      <Settings />
    </Container>
  );
}

export default index;
