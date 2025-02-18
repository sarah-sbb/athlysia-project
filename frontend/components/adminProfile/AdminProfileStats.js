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

function AdminProfileStats() {
  return (
    <div
      style={{ border: "1px dashed", color: "red", height: "100px", display: "flex", alignItems:"center", justifyContent: "center" }}
    >
      Les stats seront ici
    </div>
  );
}

export default AdminProfileStats;
