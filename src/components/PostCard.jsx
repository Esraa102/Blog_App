/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../data";
const PostCard = ({ id, title, body }) => {
  const queryClient = useQueryClient();
  const { mutateAsync: deletePostMutation } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
  const handleDelete = async () => {
    try {
      await deletePostMutation(id);
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="bg-[#3f3f3f] p-4 
    rounded-md flex flex-col gap-4 
    justify-between hover:scale-105 transition duration-300"
    >
      <div>
        <Link
          to={`/post/${id}`}
          className="text-xl  font-semibold hover:text-red hover:underline transition"
        >
          {title}
        </Link>
        <p className="break-words mt-4">
          {body.length >= 250 ? `${body.slice(0, 250)}....` : body}
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <button
          type="button"
          className="hover:text-red transition"
          onClick={handleDelete}
        >
          <DeleteIcon sx={{ fontSize: "30px" }} />
        </button>
        <Link to={`/post/${id}/edit`} className="hover:text-red transition">
          <EditNoteIcon sx={{ fontSize: "30px" }} />
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
