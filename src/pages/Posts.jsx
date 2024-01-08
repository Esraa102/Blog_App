/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchData } from "../../data";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
const Posts = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", search],
    queryFn: () => fetchData(search),
  });

  if (isError)
    return (
      <p className="text-lg text-center text-[#3f3f3f] font-semibold">
        No Items Found
      </p>
    );
  return (
    <section className="section">
      <h1 className="header text-start mb-8">Your Posts</h1>
      <form className="w-full items-end md:w-[80%] mb-8 flex flex-col md:flex-row">
        <input
          type="search"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
          placeholder="Search Posts"
          className="w-full input text-lg h-[53px]"
        />
      </form>

      {isLoading && <Loader miniLoading={true} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-col-4 gap-8">
        {data?.map((post) => (
          <PostCard
            key={post.title}
            id={post.id}
            title={post.title}
            body={post.body}
          />
        ))}
      </div>
    </section>
  );
};

export default Posts;
