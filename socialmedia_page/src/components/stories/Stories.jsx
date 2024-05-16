import React, { useContext } from 'react'
import "./stories.scss"
import { AuthContext } from '../context/authContext';

const Stories = () => {
    
    const { currentUser } = useContext(AuthContext);
    

    const stories = [
        {
            id: 1,
            name: "maryam",
            img: "https://images.pexels.com/photos/22065623/pexels-photo-22065623/free-photo-of-woman-sitting-with-leaf-over-face.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

        },
        {
            id: 2,
            name: "jane doe",
            img: "https://images.pexels.com/photos/18717344/pexels-photo-18717344/free-photo-of-the-treasury-behind-canyon-in-petra.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
        },
        {
            id: 3,
            name: "john doe",
            img: "https://images.pexels.com/photos/10234901/pexels-photo-10234901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
    ]
    return (
        <div className='stories'>
            <div className="story">
                <img src={currentUser.profilePic} alt="" />
                <span>{currentUser.name}</span>
                <button>+</button>
            </div>
            {stories.map(story => (
                < div className="story" key={story.id} >
                    <img src={story.img} alt="" />
                    <span>{story.name}</span>
                </div>
            ))}
        </div>
    )
}

export default Stories
