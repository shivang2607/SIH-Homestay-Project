import React from 'react'
import styles from '../styles/about.module.css'

const About = () => {
  return (
    <div className={styles.container}>About</div>
  )
}

export default About

export async function getStaticProps(context) {
  return {
    props: {},
  }
}
