import React from "react";
import { useParams } from "@remix-run/react";

const Name: React.FC = () => {
  const { id } = useParams();

  return <div>fetch me by uuid {id}</div>;
};

export default Name;
