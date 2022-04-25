import React from 'react'
import { Box } from '@chakra-ui/react'
import ava0 from '../images/ava0.png'
import ava1 from '../images/ava1.png'
import ava2 from '../images/ava2.png'
import ava3 from '../images/ava3.png'
import ava4 from '../images/ava4.png'
import ava5 from '../images/ava5.png'
import ava6 from '../images/ava6.png'
import ava7 from '../images/ava7.png'
import ava8 from '../images/ava8.png'
import ava9 from '../images/ava9.png'

function Avatar({ id }) {
  const avatars = [ava0, ava1, ava2, ava3, ava4, ava5, ava6, ava7, ava8, ava9]

  return (
    <Box
      h="100%"
      bgImage={avatars[id]}
      bgSize="cover"
      width="30px"
      height="30px"
      borderRadius="50%"
      flexShrink={0}
    />
  )
}

export default Avatar
