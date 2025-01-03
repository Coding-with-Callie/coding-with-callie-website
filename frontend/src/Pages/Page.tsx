import { useLoaderData } from "react-router-dom";

const Page = () => {
  const loaderData = useLoaderData();

  console.log("loaderData:", loaderData);

  return <div>PAGE</div>;
};

export default Page;
