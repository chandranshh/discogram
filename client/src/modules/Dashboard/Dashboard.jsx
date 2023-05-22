import React, { useState, useEffect } from "react";
import { Input, Button, Avatar, AvatarBadge } from "@chakra-ui/react";
import axios from "axios";

function Dashboard() {
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user:detail"));
    const fetchConvo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/convo/${loggedInUser.userId}`
        );
        const data = res.data;
        setConvo(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchConvo();
    fetchAllUsers();
  }, []);

  const [contacts, setContacts] = useState([]);

  const fetchAllUsers = async () => {
    const res = await axios.get("http://localhost:3001/api/users");
    const data = res.data;
    setContacts([...data]);
  };

  console.log(contacts);

  const [selectedUser, setSelectedUser] = useState({});
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user:detail"))
  );
  const [message, setMessage] = useState([]);

  const [convo, setConvo] = useState([]);
  const [convoId, setConvoId] = useState("");

  //console.log(user);

  const fetchMessages = async (conversationId) => {
    const res = await axios.get(
      `http://localhost:3001/api/message/${conversationId}`
    );
    const data = res.data;
    setMessage([...data]);
  };

  //console.log(message);

  const selectUserHandler = (key) => {
    setSelectedUser(key.user);
    if (key.conversationId !== "new") {
      fetchMessages(key.conversationId);
    } else {
      fetchMessages("new");
    }
    setConvoId(key.conversationId);
    setPeopleUser("");
  };

  // const newUserMsgHandler = async (e) => {
  //   e.preventDefault();
  //   const res = await axios.post(`http://localhost:3001/api/convo`, {
  //     senderId: user.userId,
  //     receiverId: selectedUser.userId,
  //   });
  //   const data = res.data;
  //   setConvoId(data._id);
  //   fetchMessages(data._id);
  // };

  const setContactHandler = (user) => {
    user.preventDefault();
    // setSelectedUser(user);
    console.log(user);
  };

  console.log(convo);
  console.log("ConvoID" + convoId);

  const [sendText, setSendText] = useState("");

  const setTextHandler = (e) => {
    e.preventDefault();
    setSendText(e.target.value);
  };

  const [peopleUser, setPeopleUser] = useState({});

  const selectPeopleHandler = (person) => {
    setPeopleUser(person);
    setSelectedUser("");
  };

  console.log(peopleUser);

  const sendMessageHandler = async () => {
    if (selectedUser) {
      const response = await axios.post(`http://localhost:3001/api/message`, {
        senderId: user.userId,
        receiverId: selectedUser.userId,
        text: sendText,
        conversationId: convoId,
      });
      if (convoId === "new") {
        setConvoId(response.data.conversationId);
      }
    } else {
      const response = await axios.post(`http://localhost:3001/api/message`, {
        senderId: user.userId,
        receiverId: peopleUser._id,
        text: sendText,
        conversationId: "new",
      });
      setConvoId(response.data.conversationId);
      setSelectedUser({ ...peopleUser, userId: response.data.receiverId });
    }
    setSendText("");
    fetchMessages(convoId);
  };

  // const sendMessageHandler = async (e) => {
  //   e.preventDefault();
  //   await axios.post(`http://localhost:3001/api/message`,{
  //     senderId: user.userId,
  //     receiverId: selectedUser.userId,
  //     text: sendText,
  //     conversationId: message.conversationId,
  //   });
  // };
  //console.log(contacts.map((person) => person.name));

  console.log(message.conversationId);

  return (
    <div className="w-screen h-screen flex ">
      <div className="w-[25%]  bg-[#f3f5ff]">
        <div className="flex items-center justify-center my-8">
          <Avatar
            size="lg"
            name={user.fullName}
            src="https://xsgames.co/randomusers/avatar.php?g=male"
          />
          <div className="ml-6">
            <h3 className="text-2xl">{user.fullName}</h3>
            <p className="text-xl font-light">My Account</p>
          </div>
        </div>
        <hr />
        <div className="my-3 text-lg text-center">Messages</div>
        <hr />
        <div>
          {convo.map((person) => (
            <div
              className="flex py-3 border-b border-b-gray-300 cursor-pointer"
              key={person.user.userId} //key={person._id}
              onClick={() => {
                selectUserHandler(person);
              }}
            >
              <Avatar
                className="ml-6 h-full"
                size="md"
                name={person.user.fullName}
                src={person.img}
              >
                <AvatarBadge
                  boxSize="1rem"
                  //bg={person.status === "online" ? "green.500" : "red.500"}
                />
              </Avatar>
              <p className="ml-4 h-full text-xl font-light flex-grow  self-center">
                {person.user.fullName}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[50%] bg-white flex flex-col items-center">
        {selectedUser ? (
          <div className="w-[75%] bg-[#f3f5ff] h-[80px] my-4 rounded-full flex items-center">
            <Avatar className="mx-3" size="lg" name={selectedUser?.fullName} />
            <div>
              <div className="text-xl text-bold">{selectedUser?.fullName}</div>
            </div>
          </div>
        ) : (
          <div className="w-[75%] bg-[#f3f5ff] h-[80px] my-4 rounded-full flex items-center">
            <Avatar className="mx-3" size="lg" name={peopleUser?.fullName} />
            <div>
              <div className="text-xl text-bold">{peopleUser?.fullName}</div>
            </div>
          </div>
        )}
        <div className="h-[75%] w-full ">
          <div className="p-8 overflow-y-scroll no-scrollbar">
            {message.map((msg) =>
              msg.user.userId === user.userId ? (
                <div className="h-auto w-fit max-w-[40%] text-white bg-[#1476ff] rounded-xl m-2 p-4 ml-auto">
                  {msg.text}
                </div>
              ) : (
                <div className="h-auto w-fit max-w-[40%] bg-[#f3f5ff] rounded-b-xl m-2 rounder-tr-xl p-4">
                  {msg.text}
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex p-5 w-full items-center gap-5 mt-6">
          <Input
            className="w-[90%]"
            size="lg"
            placeholder="type your text here"
            onChange={setTextHandler}
            value={sendText}
          />
          <Button onClick={sendMessageHandler} colorScheme="blue" size="lg">
            Send
          </Button>
        </div>
      </div>
      <div className="w-[25%] bg-[#f3f5ff]">
        <div className="my-3 text-lg text-center">{"People(s)"}</div>
        <hr />
        <div>
          {contacts
            .filter((person) => person._id !== user.userId)
            .map((person) => (
              <div
                className="flex py-3 border-b border-b-gray-300 cursor-pointer"
                key={person._id} //key={person._id}
                onClick={() => selectPeopleHandler(person)}
              >
                <Avatar
                  className="ml-6 h-full"
                  size="md"
                  name={person.fullName}
                  src={person.img}
                >
                  <AvatarBadge
                    boxSize="1rem"
                    //bg={person.status === "online" ? "green.500" : "red.500"}
                  />
                </Avatar>
                <p className="ml-4 h-full text-xl font-light flex-grow  self-center">
                  {person.fullName}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
