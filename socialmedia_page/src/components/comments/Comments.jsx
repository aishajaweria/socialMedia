import { useContext, useState } from "react"; // Import useState correctly
import "./comments.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Comments = ({ postId }) => {
    console.log("Rendering Comments component");
    const [description, setDesc] = useState("");
    const { currentUser } = useContext(AuthContext);
    const { isLoading, error, data } = useQuery({
        queryKey: ["comments", postId],
        queryFn: () =>
            makeRequest.get("/comments?postId=" + postId).then((res) => res.data),
    });
    console.log("isLoading:", isLoading);
console.log("error:", error);
console.log("data:", data);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newComment) => makeRequest.post("/comments", newComment),
        onSuccess: () => queryClient.invalidateQueries(["comments"]),
        onError: (error) => setErrorMessage(error.message || "An error occurred while adding the post."),
    });

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ description, postId });
        setDesc("");
    };

    return (
        <div className="comments">
            <div className="write">
                <img src={currentUser.profilePic} alt="" />
                <input
                    type="text"
                    placeholder="write a comment"
                    value={description}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <button onClick={handleClick}>Send</button>
            </div>
            {error ? (
                "Something went wrong"
            ) : isLoading ? (
                "Loading"
            ) : data ? (
                data.map((comment) => (
                    <div className="comment" key={comment.id}>
                        <img src={comment.profilePic} alt="" />
                        <div className="info">
                            <span>{comment.name}</span>
                            <p>{comment.description}</p>
                        </div>
                        <span className="date">{moment(comment.createdAt).fromNow()}</span>
                    </div>
                ))
            ) : (
                "No comments"
            )}
        </div>
    );
};

export default Comments;
