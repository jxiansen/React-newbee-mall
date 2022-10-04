import { useRoutes } from "react-router-dom";
import routes from "@/routes";

export default () => {
  const elememt = useRoutes(routes);
  return elememt;
};
