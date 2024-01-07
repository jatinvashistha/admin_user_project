import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateUserName } from '../../../redux/actions/admin';
 import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,Button,Input,Container, useDisclosure
} from '@chakra-ui/react'
 const UpdateUserName = ({ item,loading }) => {
    
 
    const [newName, setNewName] = useState(item.name)
    const dispatch = useDispatch();
    const handle = (e) => {
        e.preventDefault();
        if (newName) {
              const myForm = new FormData();
            myForm.append('name', newName);
            dispatch(updateUserName(item._id, myForm))
         }
        else {
            alert('Enter new name')
        }
    }

    const {isOpen,onOpen,onClose } = useDisclosure();
  return (
      <div>
          
           
 
           <Button onClick={onOpen}>Change Name</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update User Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <Container>
                                
                                  <Input  value = {newName}  onChange = {(e) => {setNewName(e.target.value)}}>
                                      
                                  </Input>
                                  
                              </Container>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={handle} isLoading={loading}>Update Name</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

          
    </div>
  )
}

export default UpdateUserName

