import React from 'react'
import {db} from '../../firebase/initFirebase'
import {doc, getDoc } from 'firebase/firestore'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import {Card, Button} from 'react-bootstrap'
import { TiCancel} from 'react-icons/ti';

import styles from "../../styles/account.module.css"

const Tourist = () => {

    const [userHistory, setUserHistory] = React.useState([])

    React.useEffect(() => {
      const email = "shivangkh26@gmail.com"
        if(JSON.parse(sessionStorage.getItem(`tourist ${email}`))){
            setUserHistory(JSON.parse(sessionStorage.getItem(`tourist ${email}`)))
            console.log("from local session storage", userHistory)
        }
        else{
            
        const docRef = doc(db, "historyUser", email);
        getDoc(docRef).then(docSnap=>{
            if(docSnap.exists()){
            setUserHistory(docSnap.data())
            sessionStorage.setItem(`tourist ${email}`, JSON.stringify(docSnap.data()))
            }
            else{
                window.alert("No Bookings Yet")
            }
        })
        console.log("from firebase", userHistory)
    }

    
     
    }, [])
    


  return (
      <div>
        {userHistory && console.log(userHistory)}
        <Tabs className ={styles.book} orientation= "vertical"  variant='soft-rounded' colorScheme='teal'>
  <TabList className={styles.list} >
    <Tab className='my-4 px-2'>Current Bookings</Tab>
    <Tab className='my-4 px-2'>Past Bookings</Tab>
    <Tab className='my-4 px-2'>Cancelled Bookings</Tab>
  </TabList>

    
  <TabPanels className={`${styles.book}`}>
    <TabPanel >
      <div className={` ${styles.current}`}>
          
        <div style={{ justifyContent:"center"}}>

            {userHistory.current && userHistory.current.map((currentBook)=>{
                return <Card className={`${styles.card}`}>
 
                <Card.Body>
                  <Card.Title><h3>{currentBook.HomestayName} </h3></Card.Title>
                  <Card.Subtitle className={`${styles.location} my-1`} >Address, Location</Card.Subtitle>
                  
                  <div className={`${styles.price}`}>
               
                  <h4 >Total Rent:   </h4>
                  <h2 className={`${styles.pricetag}`}>Rs. 480 <h4 className={`${styles.subpricetag}`}>(120 / head)</h4></h2>
                  </div>
                  
                  <div className={`${styles.date}`}>
                    <span >Check In Date:  </span>
                    </div>
                    <div className={`${styles.date}`}>
                    <span >Check Out Date:  </span>
                    </div>
                  
                  
                  <button className={`mt-5 ${styles.btn}`}  ><TiCancel color="white" size={25}/>Cancel Booking</button>
                </Card.Body>
               </Card>
            })}
        <Card className={`${styles.card}`}>
 
 <Card.Body>
   <Card.Title><h3>Homestay Name </h3></Card.Title>
   <Card.Subtitle className={`${styles.location} my-1`} >Address, Location</Card.Subtitle>
   
   <div className={`${styles.price}`}>

   <h4 >Total Rent:   </h4>
   <h2 className={`${styles.pricetag}`}>Rs. 480 <h4 className={`${styles.subpricetag}`}>(120 / head)</h4></h2>
   </div>
   
   <div className={`${styles.date}`}>
     <span >Check In Date:  </span>
     </div>
     <div className={`${styles.date}`}>
     <span >Check Out Date:  </span>
     </div>
   
   
   <button className={`mt-5 ${styles.btn}`}  ><TiCancel color="white" size={25}/>Cancel Booking</button>
 </Card.Body>
</Card>
<Card className={`${styles.card}`}>
 
 <Card.Body>
   <Card.Title><h3>Homestay Name </h3></Card.Title>
   <Card.Subtitle className="my-3 ">Address, Location</Card.Subtitle>
   
   <h4>Total Price to be Paid </h4>
   
   <div>
     <span>Check In Date:  </span>
     <span>Check Out Date:  </span>
   </div>
   
   <Button className="mt-5 " variant="danger">Cancel Booking</Button>
 </Card.Body>
</Card>
<Card className={`${styles.card}`}>
 
 <Card.Body>
   <Card.Title><h3>Homestay Name </h3></Card.Title>
   <Card.Subtitle className="my-3 ">Address, Location</Card.Subtitle>
   
   <h4>Total Price to be Paid </h4>
   
   <div>
     <span>Check In Date:  </span>
     <span>Check Out Date:  </span>
   </div>
   
   <Button className="mt-5 " variant="danger">Cancel Booking</Button>
 </Card.Body>
</Card>
<Card className={`${styles.card}`}>
 
 <Card.Body>
   <Card.Title><h3>Homestay Name </h3></Card.Title>
   <Card.Subtitle className="my-3 ">Address, Location</Card.Subtitle>
   
   <h4>Total Price to be Paid </h4>
   
   <div>
     <span>Check In Date:  </span>
     <span>Check Out Date:  </span>
   </div>
   
   <Button className="mt-5 " variant="danger">Cancel Booking</Button>
 </Card.Body>
</Card>
<Card className={`${styles.card}`}>
 
 <Card.Body>
   <Card.Title><h3>Homestay Name </h3></Card.Title>
   <Card.Subtitle className="my-3 ">Address, Location</Card.Subtitle>
   
   <h4>Total Price to be Paid </h4>
   
   <div>
     <span>Check In Date:  </span>
     <span>Check Out Date:  </span>
   </div>
   
   <Button className="mt-5 " variant="danger">Cancel Booking</Button>
 </Card.Body>
</Card>
        </div >


     </div>
    </TabPanel>
    <TabPanel>
    <div className={` ${styles.current}`}>past </div>
    </TabPanel>
    <TabPanel>
    <div className={` ${styles.current}`}>bvc </div>
    </TabPanel>
  </TabPanels>
</Tabs>
    </div>
  )
}

export default Tourist