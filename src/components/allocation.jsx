import { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { IoAddCircleSharp } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { IoMdRemoveCircle } from "react-icons/io";
import { AppContext } from "../context/AppContext";

const Allocation = (props) => {
  const { dispatch, currency, allocations } = useContext(AppContext);

  const handleDeleteItem = (name) => {
    dispatch({ type: "DELETE_ITEM", payload: { name } });
  };

  const handleIncrease = (name) => {
    dispatch({ type: "ADD_ALLOCATION", payload: { name, budget: 10 } });
  };

  const handleDecrease = (name) => {
    dispatch({ type: "RED_ALLOCATION", payload: { name, budget: 10 } });
  };

  const addIconStyle = { color: "#4FAD5B", fontSize: "24px" };
  const removeIconStyle = { color: "#AF1D11", fontSize: "24px" };
  const deleteIconStyle = { fontSize: "24px" };

  const rows = allocations.map((allocation) => ({
    name: allocation.name,
    budget: currency + allocation.budget,
    add: (
      <IconButton onClick={() => handleIncrease(allocation.name)}>
        <IoAddCircleSharp style={addIconStyle} />
      </IconButton>
    ),
    remove: (
      <IconButton onClick={() => handleDecrease(allocation.name)}>
        <IoMdRemoveCircle style={removeIconStyle} />
      </IconButton>
    ),
    del: (
      <IconButton onClick={() => handleDeleteItem(allocation.name)}>
        <TiDelete style={deleteIconStyle} />
      </IconButton>
    ),
  }));

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Allocated Budget
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Increase by 10
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Decrease by 10
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.budget}</TableCell>
                <TableCell align="right">{row.add}</TableCell>
                <TableCell align="right">{row.remove}</TableCell>
                <TableCell align="right">{row.del}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Allocation;
