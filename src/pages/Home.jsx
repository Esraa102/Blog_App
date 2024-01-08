import { useQuery } from "@tanstack/react-query";
import { UseAuthContext } from "../utils/auth";
import { fetchData } from "../../data";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";

const Home = () => {
  const { user } = UseAuthContext();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchData(),
  });
  if (data) data.length = 10;
  if (isLoading) return <Loader miniLoading={false} />;
  if (isError) return "Error";

  return (
    <div className="section">
      <p className="text-3xl md:text-5xl font-semibold mb-6">
        Hello <span className="text-red capitalize">{user.name}</span>
      </p>
      <p className="text-xl md:text-2xl mb-6">Your Latest Posts</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-col-4 gap-8">
        {data.map((post) => (
          <PostCard
            key={post.title}
            id={post.id}
            title={post.title}
            body={post.body}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
