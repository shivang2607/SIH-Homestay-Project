import React from 'react'
import styles from '../styles/account.module.css'
import Tourist from '../components/accounts/tourist'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { FaUserCircle, FaHouseUser} from 'react-icons/fa';

const Account = () => {
  return (
    <div className={styles.container} >
     <Tabs variant='line' className={`mt-2 px-2 ${styles.main}`} colorScheme="teal">
  <TabList className={`mt-3  px-2 ${styles.tab} `} >
    <Tab   _selected={{ color: 'teal', borderBottom:'2px solid purple' }}><FaUserCircle size={25} color="steelblue"/> &nbsp;&nbsp;Tourist</Tab>
    <Tab  _selected={{ color: 'teal', borderBottom:'2px solid purple' }}><FaHouseUser size={25} color="steelblue"/>&nbsp;&nbsp;Home Owner</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Tourist/>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
    </div>
  )
}

export default Account