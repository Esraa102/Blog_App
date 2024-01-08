import PostForm from "../components/PostForm";

const AddNewPost = () => {
  return (
    <section className="section">
      <h1 className="header mb-6 text-start">Add New Post</h1>
      <PostForm edit={false} postTitle={""} postBody={""} />
    </section>
  );
};

export default AddNewPost;
