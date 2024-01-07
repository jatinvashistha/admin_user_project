import { Avatar, Box, Button,  Grid, HStack, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr,  useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import cursor from '../../../assests/images/cursor.png'
import Sidebar from '../Sidebar'
import { RiDeleteBin7Fill} from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUsers, updateUserRole } from '../../../redux/actions/admin'
import { toast } from 'react-hot-toast'
import ChangePhotoBox from './ChangePhotoBox'
 import UpdateUserName from './UpdateUserName'
  

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

 

const User = () => {

  const { users, loading, error, message } = useSelector(state => state.admin)
  // console.log(users)
    
 
 const dispatch = useDispatch();

  const updateHandler = (userId) => {
      console.log(userId)
 dispatch(updateUserRole(userId))
  }
  
 

    const deleteButtonHandler =(userId)=>{
         dispatch(deleteUser(userId))
            }

   useEffect(()=>{
    if (error) {
        toast.error(error);
        dispatch({ type: 'clearError' });
      }
  
      if (message) {
        toast.success(message);
        dispatch({ type: 'clearMessage' });
      }

  dispatch(getAllUsers())
   }, [dispatch, error, message])
  
 
  
  return (
    <Grid 
    css={{
        cursor:`url(${cursor}), default`
    }}
    minH={'100vh'} 
    templateColumns={['1fr','5fr 1fr']}
    
    >
     
            <Box p={['0','8']} overflow={'auto'}>

            <Heading textTransform={"uppercase"}
                children="All Users"
                my={"16"}
                textAlign={["center","left"]}
                />
                <TableContainer 
                w={['100vw','full']}
                >
                    <Table variant={'simple'} size={'lg'}>
    
                  <TableCaption>
                    All available users in the database
                  </TableCaption>
    
                  <Thead>
                    <Tr>
                <Th>Id</Th>
                <Th>Image</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Mobile Number</Th>
                <Th>Role</Th>
                <Th isNumeric>Action</Th>
                    </Tr>
                  </Thead>
    
                  <Tbody>
                           {

                users && users.map(item =>
              {  
                return (
                                <Row
                             updateHandler={updateHandler}
                                 deleteButtonHandler={deleteButtonHandler}
                                key={item._id} 
                                item={item}
                             loading={loading}
                             
                                 />
                )}
                            
                )
                           }
                  </Tbody>
    
                    </Table>
    
                </TableContainer>
    
            </Box>
        
       
        <Sidebar/>

    </Grid>
  )
}

export default User

function Row({ item, updateHandler,
   deleteButtonHandler, loading }) {
  
   const {isOpen,onOpen,onClose} = useDisclosure()
     return(
      <Tr>
        

        <Td>#{item._id}</Td>
        <Td >
          <Avatar src={item.avatar.url} boxSize={'10'} />
          <Button
             
                   isLoading={loading} 
                   onClick={onOpen}
                   colorScheme='yellow' variant={'ghost'} >Update Image</Button>
        </Td>
        
        <Td>{item.name}
           
           <UpdateUserName item={item} loading={loading} />
            </Td>
        <Td>{item.email}</Td>
        <Td>{item.phoneNumber}</Td>
        <Td>{item.role}</Td>
             <Td isNumeric>
                <HStack justifyContent={'flex-end'}>

                    <Button 
                    isLoading={loading}
                    onClick={()=> updateHandler(item._id)}
                     variant={'outline'} color={"purple.500"}>
                        Change Role
                   </Button>
              
                    <Button
                    isLoading={loading}
                     onClick={()=> deleteButtonHandler(item._id)}
                    color={"purple.600"}>
                        <RiDeleteBin7Fill
                        />
                    </Button>

          </HStack>
           
          
           <ChangePhotoBox isOpen={isOpen} onClose={onClose}   
           loading={loading} item={item}
          />
          





            </Td>
         </Tr>
    )
}

// function LinkButton ({url,text,active,item}){
//       return(
//         <Link to= {`/admin/${url}`}> 
// <Button fontSize={'small'} variant={'ghost'} colorScheme={active?"yellow":''}>
//     {item}
//     {text}
//     </Button>
// </Link>
//       )
// }

// function ChangePhotoBox({
//   isOpen,
//   onClose,
//   updateUserDetails,
//    item,
//   loading
  
// }) {
//   const [image, setImage] = useState();
//     const [name, setName] = useState(item.name)
//   const [imagePrev, setImagePrev] = useState(item.avatar.url);
// // console.log(item.name)
//   const changeImage = e => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.readAsDataURL(file);

//     reader.onloadend = () => {
//       setImagePrev(reader.result);
//       setImage(file);
//     };
//   };

//   const closeHandler = () => {
//     onClose();
//     setImagePrev('');
//     setImage('');
//   };
//   return (
//     <Modal isOpen={isOpen} onClose={closeHandler}>
//       <ModalOverlay backdropFilter={'blur(10px)'} />
//       <ModalContent>
//         <ModalHeader>Update User Name Or Image</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <Container>
//             <form onSubmit={e => updateUserDetails(e, image, name, item._id)}>
//               {console.log(item.name)}
//               <VStack spacing={'8'}>
//                 {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}

//   <Input 
//    required
//     id='name'
//     value={name}              
//     onChange={e => setName(e.target.value)}
//     placeholder='Update user name'
//     type={'text'}
//     focusBorderColor='yellow.500'
// ></Input>

//                 <Input
//                   type={'file'}
//                   css={{ '&::file-selector-button': fileUploadCss }}
//                   onChange={changeImage}
//                 />

                
//                 <Button
//                   isLoading={loading}
//                   w="full"
//                   colorScheme={'yellow'}
//                   type="submit"
//                 >
//                   Update User Detail
//                 </Button>
//               </VStack>
//             </form>
//           </Container>
//         </ModalBody>

//         <ModalFooter>
//           <Button mr="3" onClick={closeHandler}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// }

 