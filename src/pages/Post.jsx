import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getPost } from "../../data";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getPost", Number(id)],
    queryFn: () => getPost(Number(id)),
  });
  const { mutateAsync: deletePostMutation } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
  const handleDelete = async () => {
    try {
      await deletePostMutation(Number(id));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) return <Loader miniLoader={false} />;
  if (isError) return "Error";
  return (
    <section className="section">
      <h1 className="header text-start">{data?.title}</h1>
      <p className="text-xl my-8 font-semibold w-full md:w-[70%] break-words">
        {data?.body}
      </p>
      <div className="flex gap-4 items-center">
        <button type="button" className="btn flex gap-1" onClick={handleDelete}>
          <span>Delete</span> <DeleteIcon />
        </button>
        <Link to={`/post/${id}/edit`} className="btn flex gap-1">
          <span>Edit</span> <EditNoteIcon />
        </Link>
      </div>
    </section>
  );
};

export default Post;
