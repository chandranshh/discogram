import React, { useState } from "react";
import {
  Stack,
  InputGroup,
  InputLeftAddon,
  Button,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Form() {
  const [isMember, setIsMember] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onClickHandler = () => {
    setIsMember(!isMember);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (isMember) {
      axios
        .post("http://localhost:3001/api/login", {
          username: username,
          password: password,
        })
        .then((res) => {
          const userData = res.data;

          localStorage.setItem("user:token", res.data.token);
          localStorage.setItem("user:detail", JSON.stringify(userData));
          window.location.href = "/dashboard";
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("http://localhost:3001/api/register", {
          username: username,
          password: password,
          fullName: fullName,
        })
        .then((res) => {
          const userData = res.data;

          localStorage.setItem("user:token", res.data.token);
          localStorage.setItem("user:detail", JSON.stringify(userData));
          window.location.href = "/dashboard";
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
    <div className="bg-[#e4ebf4] h-screen flex justify-center items-center">
      <div className="bg-white w-[600px] h-[800px] shadow-lg rounded-lg flex flex-col justify-center items-center">
        <div className="text-4xl font-extrabold">
          {isMember ? `Welcome Back` : `Welcome`}
        </div>
        <div
          className={
            "text-xl font-light " + (isMember ? `mb-[1.5rem]` : `mb-[2.5rem]`)
          }
        >
          {isMember ? " " : `Sign up now to get started!`}
        </div>

        <form action="submit" className="flex flex-col">
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
          <Button
            colorScheme="blue"
            variant="outline"
            className="mt-[1.5rem] self-center"
            onClick={onSubmitHandler}
          >
            {isMember ? `Login` : `Sign Up`}
          </Button>
        </form>

        <div className="mt-4 text-lg">
          {isMember ? `Don't have an accout?` : `Already have an account?`}
          <span
            onClick={onClickHandler}
            className="cursor-pointer hover:text-xl"
          >
            {!isMember ? ` Sign up` : ` Register now!`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Form;
