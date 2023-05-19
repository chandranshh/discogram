import React, { useState } from "react";
import {
  Stack,
  InputGroup,
  InputLeftAddon,
  Button,
  ButtonGroup,
  Input,
} from "@chakra-ui/react";

function Form() {
  const [isMember, setIsMember] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onClickHandler = () => {
    setIsMember(!isMember);
  };

  const setFullNameHandler = (ev) => {
    setFullName(ev.target.value);
  };

  const setUsernameHandler = (ev) => {
    setUsername(ev.target.value);
  };

  const setPasswordHandler = (ev) => {
    setPassword(ev.target.value);
  };

  return (
    <div className="bg-white w-[600px] h-[800px] shadow-lg rounded-lg flex flex-col justify-center items-center">
      <div className="text-4xl font-extrabold">
        {isMember ? `Welcome Back` : `Welcome`}
      </div>
      <div className="text-xl font-light mb-6">
        {isMember ? "Login to explore further" : `Sign up now to get started!`}
      </div>

      <Stack spacing={4}>
        {!isMember && (
          <InputGroup>
            <InputLeftAddon children="Full Name" width="110px" />
            <Input
              value={fullName}
              type="name"
              placeholder="enter full name here"
              onChange={setFullNameHandler}
            />
          </InputGroup>
        )}
        <InputGroup>
          <InputLeftAddon children="Username" width="110px" />
          <Input
            value={username}
            type="username"
            placeholder="enter your username here"
            onChange={setUsernameHandler}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Password" width="110px" />
          <Input
            value={password}
            type="password"
            placeholder="enter your password here"
            onChange={setPasswordHandler}
          />
        </InputGroup>
      </Stack>
      <Button colorScheme="blue" variant="outline" className="mt-5">
        {isMember ? `Login` : `Sign Up`}
      </Button>

      <div className="mt-4 text-lg">
        {isMember ? `Don't have an accout?` : `Already have an account?`}
        <span onClick={onClickHandler} className="cursor-pointer hover:text-xl">
          {!isMember ? ` Sign up` : ` Register now!`}
        </span>
      </div>
    </div>
  );
}

export default Form;
