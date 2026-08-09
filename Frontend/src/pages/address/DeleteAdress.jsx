import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DELETEADDRESS, GETADDRESS } from "../../query/address";
import { useMutation } from "@apollo/client/react";
import {toast} from 'react-toastify';

const DeleteAddress = ({open, onClose, selectedAddressId}) => {

    const [deleteAddress]=useMutation(DELETEADDRESS,{
        refetchQueries:[GETADDRESS]
    });

    console.log("selectedAddressId", selectedAddressId)

    const handleConfirmDelete=async()=>{
        try {
            const response=await deleteAddress({
                variables:{
                    id:selectedAddressId
                }
            });
            if(response){
                toast.success("Address has been deleted successfully.");
                onClose();
            }
        } catch (error) {
            toast.error(`Address deletion failed: ${error.message}`)
        }
    }

    return (
        <>
            <Dialog 
                open={open} 
                onClose={(event, reason)=>{
                    if(reason==='backdropClick' || reason==='escapeKeyDown'){
                        return;
                    }
                    onClose();
                }}
            >
                <DialogTitle sx={{ fontWeight: 700, color:'#1842BB' }}>Delete Address</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this address?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        onClick={onClose}
                        sx={{textTransform: "none", fontWeight: 600 }}
                        variant="outlined"
                    >
                        No
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        variant="contained"
                        sx={{ bgcolor: "#1842BB", textTransform: "none", fontWeight: 600, "&:hover": { bgcolor: "#b71c1c" } }}
                    >
                        Yes, Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default DeleteAddress;