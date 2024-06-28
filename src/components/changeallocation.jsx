import * as React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AppContext } from "../context/AppContext";

const ChangeAllocation = () => {
  const { currency, dispatch, remainingBudget, totalAllocation } =
    useContext(AppContext);

  const [department, setDepartment] = React.useState("");
  const [actionType, setActionType] = React.useState("");
  const [amount, setAmount] = React.useState(0);

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleActionChange = (event) => {
    setActionType(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(Number(event.target.value));
  };

  const handleSave = () => {
    if (remainingBudget >= totalAllocation) {
      if (actionType === "Add") {
        dispatch({
          type: "ADD_ALLOCATION",
          payload: { name: department, budget: amount },
        });
      } else if (actionType === "Reduce") {
        dispatch({
          type: "RED_ALLOCATION",
          payload: { name: department, budget: amount },
        });
      }
    } else {
      alert("You have exceeded the budget.");
    }
  };

  return (
    <div>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "40px",
          }}
        >
