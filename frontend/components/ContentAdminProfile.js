import styles from "../styles/adminProfile.module.css";
import Image from "next/image";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';       <FontAwesomeIcon icon={faBookmark} />
//import { faBookmark, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";

function Content() {

  const email = {email: 'jean@gmail.com'}; // A DYNAMISER

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fonction, setFonction] = useState('');
  const [role, setRole] = useState('');
  const [picture, setPicture] = useState('');

  useEffect(() => {
    fetch("http://localhost:3000/admins/findByEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email),
    })
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.data.firstName);
        setLastName(data.data.lastName);
        setFonction(data.data.function);
        setRole(data.data.role);
        setPicture(data.data.pictureUrl);
      });
  }, []);

  return (
    <div className={styles.mainContent}>
      {picture && <Image src={picture} alt="Ma photo de profil" width={100} height={100} />}
      <ul>
      <li>First name: {firstName}</li>
      <li>Last name: {lastName}</li>
      <li>Function: {fonction}</li>
      <li>Role: {role}</li>
      </ul>
      <span>Modifier mon profil</span>
      <h3>Mes stats</h3>
      <h3>Mes groupes</h3>
      <h3>Mes sorties</h3>
      <h3>Mes autorisations</h3>
    </div>
  );
}

export default Content;
