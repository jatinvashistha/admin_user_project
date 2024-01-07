import { Avatar, Button, Container, HStack, Heading,  Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
 import { Link } from 'react-router-dom'
import { fileUploadCss } from '../Auth/Register'
import { useDispatch, useSelector } from 'react-redux'
import {  updateProfilePicture } from '../../redux/actions/profile'
import {  loadUser } from '../../redux/actions/user'
import { toast } from 'react-hot-toast'

const Profile = ({user}) => {
  const dispatch = useDispatch();

  const {loading,message,error} = useSelector(state => state.profile)
  

   
    const changeImageSubmitHandler = async (e, image) => {
      e.preventDefault();
      const myForm = new FormData();
      myForm.append('file', image);
      await dispatch(updateProfilePicture(myForm));
      dispatch(loadUser());
    };

    
  

    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({ type: 'clearError' });
      }
      if (message) {
        toast.success(message);
        dispatch({ type: 'clearMessage' });
      }
     
    }, [dispatch, error, message]);
    

    const {isOpen,onOpen,onClose} = useDisclosure()
  return (
    <Container minH={'90vh'} maxW={'container.lg'} py={'8'}>
        <Heading
         children="Profile" m={'8'} / >

        <Stack
        justifyContent={"flex-start"} 
        direction={['column','row']} 
        align={'center'}
        spacing={['8','16']}
        padding={'8'}
        >
         <VStack>
            <Avatar 
            src={user.avatar.url}
            boxSize={'48'} />
            <Button
            isLoading={loading} 
            onClick={onOpen}
            colorScheme='yellow' variant={'ghost'}>Change Photo</Button>
         </VStack>

         <VStack spacing={'4'} alignItems={['center','flex-start']}>

            <HStack>
                <Text children="Name" fontWeight={"bold"}/>
                <Text children={user.name}  />

            </HStack>

            <HStack>
                <Text children="Email" fontWeight={"bold"}/>
                <Text children={user.email}  />

          </HStack>
          
           <HStack>
                <Text children="Mobile Number" fontWeight={"bold"}/>
                <Text children={user.phoneNumber}  />

            </HStack>

            <HStack>
                <Text children="CreatedAt" fontWeight={"bold"}/>
                <Text children={user.createdAt.split('T')[0]}  />

          </HStack>
          
          

           

            <Stack direction={['column','row']} 
        align={'center'}>
             <Link to="/updateprofile">
                <Button>Update Profile</Button>
             </Link>

             <Link to="/changepassword">
                <Button>Change Password</Button>
             </Link>
            </Stack>
         </VStack>
        </Stack>
            <ChangePhotoBox isOpen={isOpen} onClose={onClose}  changeImageSubmitHandler={changeImageSubmitHandler}
           loading={loading}
           />

    </Container>
  )
}

export default Profile

function ChangePhotoBox({
  isOpen,
  onClose,
  changeImageSubmitHandler,
  loading
  
}) {
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const closeHandler = () => {
    onClose();
    setImagePrev('');
    setImage('');
  };
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
              <VStack spacing={'8'}>
                {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}

                <Input
                  type={'file'}
                  css={{ '&::file-selector-button': fileUploadCss }}
                  onChange={changeImage}
                />

                <Button
                  isLoading={loading}
                  w="full"
                  colorScheme={'yellow'}
                  type="submit"
                >
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>

        <ModalFooter>
          <Button mr="3" onClick={closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

 