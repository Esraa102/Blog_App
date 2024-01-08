import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addPost, editPost } from "../../data";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PostForm = ({ id, edit, postTitle, postBody }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync: addNewPostMutation } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
  const { mutateAsync: editPostMutation } = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
  const [post, setPost] = useState({
    title: postTitle,
    body: postBody,
  });
  const handleChangeInput = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await editPostMutation({ id, post });
        navigate(`/post/${id}`);
      } else {
        await addNewPostMutation(post);
        navigate("/posts");
      }
    } catch (error) {
      console.log(error);
    }

    setPost({ title: "", body: "" });
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label htmlFor="title" className="label text-xl">
        Post Title
      </label>
      <input
        id="title"
        type="text"
        name="title"
        value={post.title}
        onChange={handleChangeInput}
        className="input w-[80%]  text-lg"
        required
        placeholder="Enter The Title"
      />
      <label htmlFor="body" className="label text-xl">
        Post Body
      </label>
      <textarea
        id="body"
        name="body"
        value={post.body}
        onChange={handleChangeInput}
        rows={8}
        className="input w-[80%]  text-lg"
        required
        placeholder="Enter The Body"
      ></textarea>
      <button type="submit" className="btn w-fit">
        {edit ? "Save Changes" : "Add New Post"}
      </button>
    </form>
  );
};

export default PostForm;
