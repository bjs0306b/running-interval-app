import { useNavigate } from "react-router-dom";

// styled components
import {
  LayoutWrapper,
  Header,
  PageArea,
  OptionArea,
  Button,
} from "../styling/MainLayout.styled";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <LayoutWrapper>
      <Header>Running Interval App</Header>
      <PageArea>{children}</PageArea>
      <OptionArea>
        <Button onClick={() => navigate("/")}>달리기</Button>
        <Button onClick={() => navigate("/record")}>기록</Button>
      </OptionArea>
    </LayoutWrapper>
  );
};

export default MainLayout;
