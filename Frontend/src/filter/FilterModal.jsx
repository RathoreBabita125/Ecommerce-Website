import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";
import { statusOptions, colorOptions } from "../constants/const";

const Filter = ({
    open,
    onClose,
    setOpenFilter,
    setFilter,
    setPage,
    columnOptions,
    filterField,
    brandOptions,
    categoryOptions,
}) => {
    const [column, setColumn] = useState("");
    const [inputValue, setInputValue] = useState("");
    const isApplyDisabled = !column || inputValue === "";

    const handleApply = () => {
        if (!column) return;
        const resetInputField = {}
        filterField.forEach((field) => resetInputField[field] = "")
        setFilter({
            ...resetInputField,
            [column]: inputValue,
        });
        setPage(0);
        setOpenFilter(false);
    };

    const handleReset = () => {
        setColumn("");
        setInputValue("");
        const resetInputField = {};
        filterField.forEach((field) => resetInputField[field] = "");
        setFilter(resetInputField)
        setPage(0);
    };

    const renderValueInput = () => {
        if (column === "status") {
            return (
                <FormControl fullWidth margin="normal">
                    <InputLabel color="success">Select Status</InputLabel>
                    <Select value={inputValue} onChange={(e) => setInputValue(e.target.value)} label="Select Status" color="success">
                        <MenuItem value="" disabled>Select Status</MenuItem>
                        {statusOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }

        if (column === "color") {
            return (
                <FormControl fullWidth margin="normal">
                    <InputLabel color="success">Select Color</InputLabel>
                    <Select value={inputValue} onChange={(e) => setInputValue(e.target.value)} label="Select Color" color="success">
                        <MenuItem value="" disabled>Select Color</MenuItem>
                        {colorOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }

        if (column === "brand") {
            return (
                <FormControl fullWidth margin="normal">
                    <InputLabel color="success">Select Brand</InputLabel>
                    <Select value={inputValue} onChange={(e) => setInputValue(e.target.value)} label="Select Brand" color="success">
                        <MenuItem value="" disabled>Select Brand</MenuItem>
                        {brandOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }

        if (column === "category") {
            return (
                <FormControl fullWidth margin="normal">
                    <InputLabel color="success">Select Category</InputLabel>
                    <Select value={inputValue} onChange={(e) => setInputValue(e.target.value)} label="Select Category" color="success">
                        <MenuItem value="" disabled>Select Category</MenuItem>
                        {categoryOptions.map((category) => (
                            <MenuItem key={category} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }

        if (column === "isActive") {
            return (
                <FormControl fullWidth margin="normal">
                    <InputLabel color="success">Select Status</InputLabel>
                    <Select value={inputValue} onChange={(e) => setInputValue(e.target.value)} label="Select Status" color="success">
                        <MenuItem value="" disabled>Select Status</MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                </FormControl>
            );
        }

        return (
            <TextField
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                label="Enter filter value"
                fullWidth
                margin="normal"
                color="success"
                disabled={!column}
            />
        );
    };

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason === "backdropClick" || reason === "escapeKeyDown") return;
                onClose();
            }}
            fullWidth
            maxWidth="sm"
            keepMounted
        >
            <Box sx={{ padding: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#053348" }}>
                    <DialogTitle sx={{ fontWeight: "bold", fontSize: "25px" }}>Filter</DialogTitle>
                    <ClearIcon sx={{ marginRight: 3, cursor: "pointer" }} onClick={() => setOpenFilter(false)} />
                </Box>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel color="success">Select Column</InputLabel>
                        <Select
                            value={column}
                            onChange={(e) => { setColumn(e.target.value); setInputValue(""); }}
                            label="Select Column"
                            color="success"
                        >
                            <MenuItem value="" disabled>Select Column</MenuItem>
                            {columnOptions?.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {renderValueInput()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleReset} sx={{ backgroundColor: '#1842BB', color: 'white' }}>Reset Filter</Button>
                     <Button
                       onClick={handleApply}
                        disabled={isApplyDisabled}
                        sx={{
                            backgroundColor: isApplyDisabled ? '#e0e0e0' : '#1842BB',
                           color: isApplyDisabled ? '#9e9e9e' : 'white',
                        }}
                    >
                       Apply Filter
                   </Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}
export default Filter;