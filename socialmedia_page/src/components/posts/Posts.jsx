import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      makeRequest.get("/posts").then((res) => res.data),
  });

  return (
    <div className="posts">
      {error ? (
        "Something went wrong!"
      ) : isLoading ? (
        "Loading..."
      ) : data ? (
        data.map((post) => <Post post={post} key={post.id} />)
      ) : (
        "No data available"
      )}
    </div>
  );
};

export default Posts;
