import styles from "../../styles/smallComponents.module.css"

function LargeButtonRed ({title}) {
return (
<button className={styles.largeButtonRed}>{title|| "Bouton Rouge"}</button>
)
}

export default LargeButtonRed;
