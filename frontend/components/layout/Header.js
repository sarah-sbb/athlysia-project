import styles from "../../styles/Header.module.css";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

function Header({ title }) {
  const admin = useSelector((state) => state.admin.value);

  const [picture, setPicture] = useState(admin.infoAdmin.pictureUrl);

  //selon la logique MIUI, isMenuOpen doit contenir l'objet event.target pour afficher le menu dropdown. Mais voyez le comme un boolean puisqu'en JS une valeur null = false.
  const [isMenuOpen, setIsMenuOpen] = useState(null);

  const handleClick = (event) => {
    setIsMenuOpen(event.target);
  };

  const handleClose = () => {
    setIsMenuOpen(null);
  };

  console.log(admin)
  return (
    <div className={styles.header}>
      <div className={styles.headerLogo}>
        <Link href="/ctp-admin">
          <Image
            src="/iconeWhite.webp"
            alt="logo Athlysia"
            width={75}
            height={52}
          />
        </Link>
      </div>
      <div className={styles.headerTitle}>
        <h1>{title}</h1>
      </div>
      <div className={styles.headerNav}>
        <div className={styles.containerMenu}>
          {picture ? (
            <Image
              src={picture}
              alt="Ma photo de profil"
              width={50}
              height={50}
              style={{marginRight: "10px", borderRadius: '100%'}}
            />
          ) : (
            <Image
              src="/profil.webp"
              alt="Ma photo de profil"
              width={50}
              height={50}
              style={{marginRight: "10px", borderRadius: '100%'}}
            />
          )}
          <p>{"Bonjour " + admin.infoAdmin?.firstName || "Nom utilisateur"}</p>

          <Button
            //aria = améliore l'accessibilité (importé par MUI donc autant le laisser)
            id="basic-button"
            aria-controls={isMenuOpen ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuOpen ? "true" : undefined}
            onClick={handleClick}
            sx={{ color: "white", minWidth: "auto", pt: 1 }}
          >
            <FontAwesomeIcon
              icon={faCaretDown}
              className={styles.dropDownIcon}
            />
          </Button>
        </div>

        <Menu
          id="basic-menu"
          //anchorlEl = permet d'ouvrir le menu en dessous du boutton
          //menuList = améliore l'accessibilité (importé par MUI donc autant le laisser)
          anchorEl={isMenuOpen}
          open={isMenuOpen}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem>
            {/* lien menu à ajouter ci-dessous */}
            <Link href="/adminProfile">Mon compte </Link>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
