import styles from "../../styles/Header.module.css";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Header({ title }) {
  //nettoyer le composant = Hassen
  const admin = useSelector((state) => state.admin.value);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <p>{admin.infoAdmin.firstName}</p>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ color: "white", minWidth: "auto", pt: 1}}
          
          >
            <FontAwesomeIcon icon={faCaretDown} />
          </Button>
        </div>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem>
            <Link href="/adminProfile">Mon compte </Link>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
