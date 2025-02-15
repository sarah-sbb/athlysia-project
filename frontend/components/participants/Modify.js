import React, { useState, useEffect } from "react";
import {Paper, Typography, TextField, FormControl, RadioGroup, FormControlLabel, Radio, Button, InputLabel,  Select, MenuItem} from "@mui/material";
import { Grid } from "@mui/material";


export default function Modify() {
  // Extract the participant ID from the URL.
  const [participantId, setParticipantId] = useState(null);
  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const idFromPath = pathParts[pathParts.length - 1];
    setParticipantId(idFromPath);
  }, []);

  // State for participant details (pre-filled from the backend)
  const [participant, setParticipant] = useState({
    gender: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    group: "",
    photo: null,
  });

  // Fetch participant data when ID is set
  useEffect(() => {
    if (participantId) {
      fetch(`/participants/${participantId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            setParticipant((prev) => ({
              ...prev,
              ...data.participant,
            }));
          }
        })
        .catch((err) => console.error("Error fetching participant:", err));
    }
  }, [participantId]);

  const handleFileChange = (event) => {
    setParticipant({ ...participant, photo: event.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send PUT request to update participant details
    fetch(`/participants/update/${participantId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: participant.firstName,
        lastName: participant.lastName,
        email: participant.email,
        phone: participant.phone,
        birthDate: participant.birthDate,
        // Add additional fields if necessary
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          alert("Participant mis à jour avec succès!");
        } else {
          alert("Erreur lors de la mise à jour: " + data.message);
        }
      })
      .catch((err) => console.error("Error updating participant:", err));
  };

  return (
    <Grid container spacing={2} sx={{ height: "100vh", padding: 2 }}>
      {/* Sidebar */}
      <Grid item xs={3}>
        <Paper sx={{ height: "100%", padding: 2 }}>
          <Typography variant="h6">LOGO</Typography>
          <nav>
            <Typography variant="subtitle1">TABLEAU DE BORD</Typography>
            <Typography variant="subtitle1">GROUPE</Typography>
            <Typography variant="subtitle1">PARTICIPANT</Typography>
            <Typography variant="body2" sx={{ marginLeft: 2 }}>
              Tous
            </Typography>
            <Typography variant="body2" sx={{ marginLeft: 2 }}>
              Ajouter
            </Typography>
            <Typography variant="subtitle1">EVENEMENT</Typography>
          </nav>
          <Button variant="contained" color="secondary" sx={{ marginTop: 4 }}>
            Se déconnecter
          </Button>
        </Paper>
      </Grid>

      {/* Main Form */}
      <Grid item xs={9}>
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5">
            Modifier Participant{" "}
            {participantId ? `(ID: ${participantId})` : ""}
          </Typography>

          {/* Participant Section */}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Participant
          </Typography>
          <FormControl component="fieldset" sx={{ marginTop: 1 }}>
            <RadioGroup
              row
              value={participant.gender}
              onChange={(e) =>
                setParticipant({ ...participant, gender: e.target.value })
              }
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Féminin"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Masculin"
              />
            </RadioGroup>
          </FormControl>

          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Prénom du participant"
                value={participant.firstName}
                onChange={(e) =>
                  setParticipant({ ...participant, firstName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Nom du participant"
                value={participant.lastName}
                onChange={(e) =>
                  setParticipant({ ...participant, lastName: e.target.value })
                }
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Email"
            sx={{ marginTop: 2 }}
            value={participant.email}
            onChange={(e) =>
              setParticipant({ ...participant, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Téléphone"
            sx={{ marginTop: 2 }}
            value={participant.phone}
            onChange={(e) =>
              setParticipant({ ...participant, phone: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Date de naissance"
            sx={{ marginTop: 2 }}
            value={participant.birthDate}
            onChange={(e) =>
              setParticipant({ ...participant, birthDate: e.target.value })
            }
          />

          {/* Group selection (if needed) */}
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel>Choix du groupe</InputLabel>
            <Select
              value={participant.group}
              label="Choix du groupe"
              onChange={(e) =>
                setParticipant({ ...participant, group: e.target.value })
              }
            >
              <MenuItem value="group1">Groupe 1</MenuItem>
              <MenuItem value="group2">Groupe 2</MenuItem>
              <MenuItem value="group3">Groupe 3</MenuItem>
            </Select>
          </FormControl>

          {/* Photo Upload Section */}
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ marginTop: 3 }}
          >
            <Grid item xs={6}>
              <Typography variant="subtitle1">Photo d'identité</Typography>
              <Button variant="contained" component="label">
                Cliquer pour upload
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
              {participant.photo && (
                <Typography variant="body2">
                  {participant.photo.name}
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* Save Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 4 }}
            onClick={handleSubmit}
          >
            Enregistrer
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
