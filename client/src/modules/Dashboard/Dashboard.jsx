import React, { useState } from "react";
import {
  Input,
  Button,
  Avatar,
  AvatarBadge,
  AvatarGroup,
} from "@chakra-ui/react";

function Dashboard() {
  const contacts = [
    {
      _id: "",
      name: "Jane Doe",
      status: "online",
      img: "https://xsgames.co/randomusers/avatar.php?g=male",
    },
    {
      _id: "",
      name: "Alex Monroe",
      status: "offline",
      img: "https://xsgames.co/randomusers/avatar.php?g=male",
    },
    {
      _id: "",
      name: "Chandler Bing",
      status: "online",
      img: "https://xsgames.co/randomusers/avatar.php?g=male",
    },
    {
      _id: "",
      name: "Larry Page",
      status: "offline",
      img: "https://xsgames.co/randomusers/avatar.php?g=male",
    },
    {
      _id: "",
      name: "Bravo Six Going Dark",
      status: "offline",
      img: "https://xsgames.co/randomusers/avatar.php?g=male",
    },
    {
      _id: "",
      name: "Patrick Jackson",
      status: "online",
      img: "https://xsgames.co/randomusers/avatar.php?g=male",
    },
  ];

  const [selectedUser, setSelectedUser] = useState({});

  const selectUserHandler = (key) => {
    setSelectedUser(contacts[key]);
  };

  console.log(selectedUser);

  //console.log(contacts.map((person) => person.name));

  return (
    <div className="w-screen h-screen flex ">
      <div className="w-[25%]  bg-[#f3f5ff]">
        <div className="flex items-center justify-center my-8">
          <Avatar
            size="lg"
            name="John Doe"
            src="https://xsgames.co/randomusers/avatar.php?g=male"
          />
          <div className="ml-6">
            <h3 className="text-2xl">John Doe</h3>
            <p className="text-xl font-light">My Account</p>
          </div>
        </div>
        <hr />
        <div className="my-3 text-lg text-center">Messages</div>
        <hr />
        <div>
          {contacts.map((person, index) => (
            <div
              className="flex py-3 border-b border-b-gray-300 cursor-pointer"
              key={index} //key={person._id}
              onClick={() => {
                selectUserHandler(index);
              }}
            >
              <Avatar
                className="ml-6 h-full"
                size="md"
                name={person.name}
                src={person.img}
              >
                <AvatarBadge
                  boxSize="1rem"
                  bg={person.status === "online" ? "green.500" : "red.500"}
                />
              </Avatar>
              <p className="ml-4 h-full text-xl font-light flex-grow  self-center">
                {person.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[50%] bg-white flex flex-col items-center">
        <div className="w-[75%] bg-[#f3f5ff] h-[80px] my-4 rounded-full flex items-center">
          <Avatar
            className="mx-3"
            size="lg"
            name={selectedUser.name}
            src={selectedUser.img}
          />
          <div>
            <div className="text-xl text-bold">{selectedUser.name}</div>
            <div>{selectedUser.status}</div>
          </div>
        </div>
        <div className="h-[75%] w-full ">
          <div className="p-8 overflow-y-scroll no-scrollbar">
            <div className="h-auto w-fit max-w-[40%] bg-[#f3f5ff] rounded-b-xl m-2 rounder-tr-xl p-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni
              odio at eveniet in, placeat, eaque nemo pariatur sint molestiae
              earum aliquid laboriosam? Asperiores!
            </div>
            <div className="h-auto w-fit max-w-[40%] text-white bg-[#1476ff] rounded-xl m-2 p-4 ml-auto">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet,
              assumenda!
            </div>
          </div>
        </div>
        <div className="flex p-5 w-full items-center gap-5 mt-6">
          <Input
            className="w-[90%]"
            size="lg"
            placeholder="type your text here"
          />
          <Button colorScheme="blue" size="lg">
            Send
          </Button>
        </div>
      </div>
      <div className="w-[25%]"></div>
    </div>
  );
}

export default Dashboard;
