import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { Login, SignIn, Home, Post, Posts, EditPost } from "./pages";
import Header from "./components/Header";
import AddNewPost from "./pages/AddNewPost";

function App() {
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/posts"  element={<Posts />} />
            <Route path="/new-post"  element={<AddNewPost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/post/:id/edit" element={<EditPost />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
