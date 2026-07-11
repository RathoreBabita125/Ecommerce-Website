import { Box, IconButton } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const PaginationActions = ({ count, page, rowsPerPage, onPageChange })=>{
    const lastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton size="small" onClick={(e) => onPageChange(e, 0)} disabled={page === 0} aria-label="first page">
                <FirstPageIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={(e) => onPageChange(e, page - 1)} disabled={page === 0} aria-label="previous page">
                <KeyboardArrowLeft fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={(e) => onPageChange(e, page + 1)} disabled={page >= lastPage} aria-label="next page">
                <KeyboardArrowRight fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={(e) => onPageChange(e, lastPage)} disabled={page >= lastPage} aria-label="last page">
                <LastPageIcon fontSize="small" />
            </IconButton>
        </Box>
    );
}
export default PaginationActions;