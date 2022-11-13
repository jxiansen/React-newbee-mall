import { Button, Empty } from "@douyinfe/semi-ui";
import { IllustrationNotFound } from "@douyinfe/semi-illustrations";
import { IllustrationNotFoundDark } from "@douyinfe/semi-illustrations";
import { useNavigate } from "react-router-dom";
import "./index.less";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="notfound-page-container">
      <Empty
        image={<IllustrationNotFound />}
        darkModeImage={<IllustrationNotFoundDark />}
        description="Sorry, the page you visited does not exist."
      />
      <Button
        theme="solid"
        style={{ marginTop: "30px" }}
        onClick={() => navigate("/")}
      >
        Go Back Home
      </Button>
    </div>
  );
};
export default NotFound;
