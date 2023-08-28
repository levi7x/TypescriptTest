import { Box, Typography } from "@mui/material";
import OfDateRangePicker from "./components/OfDateRangePicker";
import { useState } from "react";

function App() {
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);

  const onFromDateSelect = (selectedFrom: string | null) => {
    setFrom(selectedFrom ? selectedFrom.toString() : null);
  };

  const onToDateSelect = (selectedTo: string | null) => {
    setTo(selectedTo ? selectedTo.toString() : null);
  };

  return (
    <Box sx={{ width: "50vh", margin: "auto" }}>
      <h1 style={{ marginLeft: 160 }}>Hi</h1>
      <OfDateRangePicker onFromDateChange={onFromDateSelect} onToDateChange={onToDateSelect} />
      <Box sx={{ ml: "55px", mt: "120px", width: "1000px" }}>
        <Typography>FROM: {from}</Typography>
        <Typography>TO: {to}</Typography>
      </Box>
    </Box>
  );
}

export default App;
