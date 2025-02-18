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
    style={{ border: "1px dashed", color: "green", height: "200px", display: "flex", alignItems:"center", justifyContent: "center" }}
    >
      Les sorties seront ici
    </div>
  );
}

export default AdminProfileEvents;
