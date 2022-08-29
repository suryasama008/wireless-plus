import React from "react";
import Fab from "@mui/material/Fab";
import ForumIcon from "@mui/icons-material/Forum";
const Suggesions = () => {
  return (
    <div style={{ position: "absolute", bottom: "20px", right: "20px" }}>
      <Fab variant="extended" size="medium" color="primary" aria-label="add">
        <ForumIcon sx={{ mr: 1 }} />
        Suggesions!
      </Fab>
    </div>
  );
};

export default Suggesions;
