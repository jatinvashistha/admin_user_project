import { Avatar, Button, Container, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import {   updateUserImage } from '../../../redux/actions/admin';
import { useDispatch } from 'react-redux';


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

 
 


const ChangePhotoBox = ({ isOpen,
 onClose,
   item,
  loading }) => {
  
     
     const dispatch = useDispatch();
     

      const updateUserDetails = async(e,image,userId) => {
    e.preventDefault();
       const myForm = new FormData();
    myForm.append('file', image);
     
 
        await dispatch(updateUserImage(userId, myForm));
         
   }
    

    const [image, setImage] = useState();
   const [imagePrev, setImagePrev] = useState(item.avatar.url);
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
        <ModalHeader>Update User Image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => updateUserDetails(e, image, item._id)}>
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
                  Update User Image
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

 

export default ChangePhotoBox