import styles from "../../styles/adminProfile.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modify } from "../../reducers/admin";
import {
  Modal,
  Box,
  Button,
  TextField,
  // Typography,
  // Select,
  // InputLabel,
  // MenuItem,
  // FormControl,
} from "@mui/material";

function AdminProfileEvents() {
  return (
    <div
      style={{ backgroundColor: "blue", color: "white", textAlign: "center" }}
    >
      Liste des sorties ici
    </div>
  );
}

export default AdminProfileEvents;
