import styles from "../../styles/smallComponents.module.css"


function Input({...props}) {
return (
<input className={styles.input} {...props}/>
)

}

export default Input;