import { Heading, Stack, VStack,Text,  Image  } from '@chakra-ui/react'
import React from 'react'
import "./home.css"
 import vg from "../../assests/images/bg.png"
 

const Home = ({isAuthenticated =false,user}) => {
  return  (
  <section className='home'>
    <div className="container">
    <Stack direction={['column','row']}
    height="100%"
    justifyContent={["center","space-between"]}
    alignItems="center"
    spacing={['16','56']}
    >
   <VStack
   width={"full"} alignItems={['center','flex-end']}
   >
   <Heading   children="LEARN FROM JATIN" size={"xl"}/>

   <Text fontFamily="cursive"  children="<-- Go To Header Section For Login And SignUp  "/>
     
   </VStack>
<Image className='vector-graphics' boxSize={"sm"} src={vg} objectFit={"contain"} />


        </Stack>
    </div>
    
 
    
  </section>
  )
}

export default Home