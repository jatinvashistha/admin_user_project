import { Button, VStack } from '@chakra-ui/react'
import React from 'react'
import {  RiUser3Fill } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
const location = useLocation();

  return (
   <VStack
    spacing={'8'} 
   boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
   p={'10'}
   >
  

 <LinkButton Icon={RiUser3Fill} text="Users" 
 url={'users'}
 active={location.pathname==="/admin/users"}
 />
 


   </VStack>
  )
}

export default Sidebar

function LinkButton ({url,Icon,text,active}){
      return(
        <Link to= {`/admin/${url}`}>
<Button fontSize={'larger'} variant={'ghost'} colorScheme={active?"purple":''}>
    < Icon style={{margin:'4px'}}/>   
    {text}
    </Button>
</Link>
      )
}