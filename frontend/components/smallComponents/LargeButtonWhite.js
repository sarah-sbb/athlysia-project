import styles from "../../styles/smallComponents.module.css"

function LargeButtonWhite({title}) {
return (
<button className={styles.largeButtonWhite}>{title || "Bouton Blanc" }</button>
)

}

export default LargeButtonWhite;