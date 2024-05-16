import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlaceIcon from "@mui/icons-material/Place";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../components/context/authContext";

const profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["user", userId], // Pass userId as part of the query key
    queryFn: () =>
      makeRequest.get("/users/find/" + userId).then((res) => res.data), // Use userId in the URL
  });
  const {isLoading:rIsLoading,data: relationshipData} = useQuery({
    queryKey: ["relationship"],
    queryFn: () =>
      makeRequest.get("/relationships?followedUserId" + userId).then((res) => res.data),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) return makeRequest.delete("/relationship?userId=" + userId);
      return makeRequest.post("/relationship", { userId });
    },
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
    },
  
})
  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };





  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            {data && data.coverPic && <img src={data.coverPic} alt="" className="cover" />}
            {data && data.profilePic && <img src={data.profilePic} alt="" className="profilePic" />}
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                {data?.name && <span>{data.name}</span>}
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    {data?.city && <span>{data.city}</span>}
                  </div>
                </div>
                {rIsLoading ? (
                  "loading"
                ) : userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default profile;