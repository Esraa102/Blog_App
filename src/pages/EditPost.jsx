import { useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../data";
import Loader from "../components/Loader";

const EditPost = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["editPost", Number(id)],
    queryFn: () => getPost(Number(id)),
  });
  if (isLoading) return <Loader miniLoading={false} />;
  return (
    <section className="section ">
      <h1 className="header text-start mb-6">Edit Your Post</h1>
      <PostForm
        edit={true}
        id={Number(id)}
        postTitle={data?.title}
        postBody={data?.body}
      />
    </section>
  );
};

export default EditPost;
