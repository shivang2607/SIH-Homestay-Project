
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'


function Reviewstars() {
     return (
<>
<Box padding='6' boxShadow='lg' bg='white' margin='2rem'>
  <SkeletonCircle size='10' />
  <SkeletonText mt='4' noOfLines={4} spacing='4' />
</Box>


<Box padding='6' boxShadow='lg' bg='white' margin='2rem'>
  <SkeletonCircle size='10' />
  <SkeletonText mt='4' noOfLines={6} spacing='4' />
</Box>


<Box padding='6' boxShadow='lg' bg='white' margin='2rem'>
  <SkeletonCircle size='10' />
  <SkeletonText mt='4' noOfLines={10} spacing='4' />
</Box>
</>




     )
     }
     export default Reviewstars