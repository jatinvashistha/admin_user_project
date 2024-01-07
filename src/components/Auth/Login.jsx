import { Box, Button, Container, FormLabel, Heading, Input, VStack, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions/user';

const Login = () => {
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("email"); 
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    // Use either email or phone number based on user's choice
    dispatch(login(loginType === "email" ? identifier : "", loginType === "phone" ? identifier : "", password));
  };

  return (
    <Container h={'95vh'}>
      <VStack h={'full'} justifyContent="center" spacing='16'>
        <Heading children={"Welcome to the Official Website"} />
        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <Box my={'3'}>
            <FormLabel htmlFor='identifier' children="Email Address or Phone Number" />
            <Input
              required
              id='identifier'
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={loginType === "email" ? 'abc@gmail.com' : '+1234567890'}
              type={loginType === "email" ? 'email' : 'tel'}
              focusBorderColor='yellow.500'
            />
          </Box>

          <Box my={'3'}>
            <FormLabel children="Login Type" />
            <RadioGroup defaultValue={loginType} onChange={(e) => setLoginType(e)}>
              <Stack direction="row">
                <Radio value="email">Email</Radio>
                <Radio value="phone">Phone</Radio>
              </Stack>
            </RadioGroup>
          </Box>

          <Box my={'3'}>
            <FormLabel htmlFor='password' children="Enter Your Password" />
            <Input
              required
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              type='password'
              focusBorderColor='yellow.500'
            />
          </Box>

          

          <Button my={'4'} colorScheme='yellow' type='submit'>
            Login
          </Button>

          <Box my={'4'}>
            New User?{' '}
            <Link to="/register">
              <Button colorScheme='yellow' variant="link">
                Sign Up
              </Button>{" "}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
