import React from 'react'
import Example from '../components/Example'

import styles from '../styles/about.module.css'


const About = () => {
  return (<>
 

    <div className={styles.container}>
   <Example />
    </div>
    
    </>
  )
}

export default About

export async function getStaticProps(context) {
  return {
    props: {
      
    },
    
  }
}
