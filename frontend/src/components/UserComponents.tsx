import React from "react";
import { useParams } from "react-router-dom";
interface IUserComponentProps {}

const UserComponent: React.FC<IUserComponentProps> = ({}) => {
  const { login } = useParams();
  return <>Hello, {login}</>;
};

export { UserComponent };
