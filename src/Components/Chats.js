import "../Styles/Chats.css";
import "../Styles/ChatEngine.css"
import { BsChatLeftDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";


const Chats = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpeg", { type: 'image/jpeg' });
  };

  useEffect(() => {
    setLoading(true);

    if (!user) {
      navigate("/");
      return;
    }

    axios.get('https://api.chatengine.io/users/me', {
      headers: {
        "user-name": user.email,
        "user-secret": user.uid,
        "PRIVATE-KEY": "c4ac2513-ac03-4b22-926a-c167dd752652"
      },
    }).then(() => {
      setLoading(false);
    }).catch(() => {
      let formData = new FormData();
      formData.append('first_name', user.displayName)
      formData.append('email', user.email);
      formData.append('username', user.email);
      formData.append('secret', user.uid);

      getFile(user.photoURL).then((avatar) => {
        formData.append('avatar', avatar, avatar.name);

        axios.post(
          'https://api.chatengine.io/users/',
          formData,
          { headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY }}
        ).then(() => {
          setLoading(false);
        }).catch((error) => console.log(error));
      });
    }).catch(() => {
      console.log('Failed to fetch user photo');
    });
  }, [user, navigate]);

  if (!user || loading) {
    return (
      <div className="loading-chat-page">
        Loading...<BsChatLeftDots />
      </div>
    )
  }

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">
          ChatSweep
        </div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <div className="chat-engine">
        <ChatEngine
          height="calc(100vh - 66px)"
          projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
          userName={user.email}
          userSecret={user.uid}
        />
      </div>
    </div>
  );
};

export default Chats;
