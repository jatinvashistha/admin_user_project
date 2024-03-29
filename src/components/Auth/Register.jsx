import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../../redux/actions/user'

export const fileUploadCss =
    {
        cursor:"pointer",
        marginLeft:"-5%",
        width:"110%",
        border:"none",
        height:"100%",
        color:"#ECC94B",
        backgroundColor:"white"
    }


const fileUploadStyle = {
    "&::file-selector-button": fileUploadCss,
}

const Register = () => {
        

    const [name, setName] = useState("")
    
    const [email, setEmail] = useState("")

    const [phoneNumber, setPhoneNumber] = useState("")

    const [password,setPassword] = useState("")

    const [imagePrev,setImagePrev] = useState("")

    const [image,setImage] = useState("")



    const changeImageHandler = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = ()=>{
            setImagePrev(reader.result);
            setImage(file);
        }
    }

    const dispatch = useDispatch();

   const submitHandler = (e)=>{
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("name",name)
    myForm.append("email", email)
    myForm.append("phoneNumber",phoneNumber)
    myForm.append("password",password)
    myForm.append("file",image)

    dispatch(register(myForm));

   }

  return ( 
  <Container h={'100%'}   >
  
  <VStack h={'full'} justifyContent="center"   spacing='10'    >

    <Heading textTransform="uppercase" children={"Registration"} padding={'5'}/>

    <form 
    onSubmit={submitHandler}
     style={{width:'100%'}}>

        <Box display={'flex'} justifyContent={'center'} my={'3'}>
           <Avatar src={imagePrev} size={'xl'}/>
        </Box>

    <Box my={'3'}>
 <FormLabel htmlFor='name' children="Enter Your Name"/>
<Input 
   required
    id='name'
    value={name}
    onChange={e => setName(e.target.value)}
    placeholder='abc'
    type={'text'}
    focusBorderColor='yellow.500'
/>
 </Box>

 <Box my={'3'}>
 <FormLabel htmlFor='email' children="Email Address"/>
<Input 
required
id='email'
value={email}
onChange={e => setEmail(e.target.value)}
placeholder='abc@gmail.com'
type={'email'}
focusBorderColor='yellow.500'
/>
                  </Box>
                  
                   <Box my={'3'}>
 <FormLabel htmlFor='email' children="Moblie Number"/>
<Input 
required
id='phoneNumber'
value={phoneNumber}
onChange={e => setPhoneNumber(e.target.value)}
placeholder='+0123456789'
type={'phoneNumber'}
focusBorderColor='yellow.500'
/>
 </Box>

 <Box my={'3'}>
 <FormLabel htmlFor='password' children="Enter Your Password"/>
<Input 
required
id='password'
value={password}
onChange={e => setPassword(e.target.value)}
placeholder='Password'
type={'password'}
focusBorderColor='yellow.500'
/>
 </Box>

 <Box my={'3'}>
 <FormLabel htmlFor='chooseAvatar' children="Choose Avatart"/>
<Input 
required
id='chooseAvatar'
 accept='image/*'
type={'file'}
focusBorderColor='yellow.500'
css={fileUploadStyle}
onChange={changeImageHandler}
/>
 </Box>

 

 <Button my={'3'} colorScheme='yellow' type='submit'>Sign Up</Button>

 <Box my={'3'}>
    Already Signed Up?{' '}
   <Link to="/login"><Button colorScheme='yellow' variant="link"> Login</Button>{" "}
   here
   </Link>
 </Box>
    </form>
  </VStack>

  </Container>)
}
export default Register