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

  const onClickHandler = () => {
    setIsMember(true);
  };

  return (
    <div className="bg-white w-[600px] h-[800px] shadow-lg rounded-lg flex flex-col justify-center items-center">
      {!isMember && (
        <div className="flex flex-col">
          <div className="text-center text-4xl font-extrabold">Welcome</div>
          <div className="text-xl font-light mb-6">
            Sign up now to get started!
          </div>
        </div>
      )}
      <Stack spacing={4}>
        {!isMember && (
          <InputGroup>
            <InputLeftAddon children="Full Name" width="110px" />
            <Input type="name" placeholder="enter full name here" />
          </InputGroup>
        )}
        <InputGroup>
          <InputLeftAddon children="Email" width="110px" />
          <Input type="email" placeholder="enter your email here" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Password" width="110px" />
          <Input type="password" placeholder="enter your password here" />
        </InputGroup>
      </Stack>
      <Button colorScheme="blue" variant="outline" className="mt-5">
        {isMember ? `Login` : `Sign Up`}
      </Button>
      {!isMember && (
        <div className="mt-4 text-lg">
          Already have an account?{" "}
          <span
            onClick={onClickHandler}
            className="cursor-pointer hover:text-xl"
          >
            Sign in
          </span>
        </div>
      )}
    </div>
  );
}

export default Form;
