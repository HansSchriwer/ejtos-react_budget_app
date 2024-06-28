import * as React from "react";
import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AppContext } from "../context/AppContext";

function Header() {
  const { dispatch, totalAllocation, currency, budget, remainingBudget } =
    useContext(AppContext);
  const [inputBudget, setInputBudget] = useState(budget);

  const changeCurrency = (val) => {
    dispatch({
      type: "CHG_CURRENCY",
      payload: val,
    });
  };

  const handleBudgetChange = (event) => {
    const newBudget = Number(event.target.value);
    if (newBudget < 20000) {
      setInputBudget(newBudget);
    } else {
      alert("Please enter value less than 20000");
      newBudget = 0;
      setInputBudget(newBudget);
    }
    dispatch({
      type: "SET_BUDGET",
      payload: newBudget,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "50px",
      }}
    >
      {/* Budget */}
      <Box sx={{ width: "21em" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            background: "#E2E4E6",
            padding: "3px",
            borderRadius: "5px",
            height: "4em",
          }}
        >
          <label
            style={{
              fontSize: "1.2rem",
              paddingLeft: "8px",
            }}
