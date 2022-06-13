import styles  from '../styles/unauthorized.module.css';
const Unauthorized = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
      <img src="https://i.pinimg.com/736x/ab/35/7c/ab357cb9184af6415a0f7d0fc76f08d8.jpg" alt="gandalf" className={styles.ganddalf}/>
      </div>
      <div className={styles.text}>
      <h1>403 - You Shall Not Pass</h1>
      <h2>Uh Oh, Gandalf is blocking the way!</h2>
      <h2>maybe you have a typo in the url? Or you meant to go to a different </h2>
      <h2>location? Like...Hobbiton.</h2>
      </div>
      <div className={styles.btn}>
        <button onClick={() => {
          window.location.pathname = "/"
        }}>
          Return To Home
        </button>
      </div>
    </div>
  );
}

export default Unauthorized;