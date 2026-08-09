import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const DeleteCartItemModal = ({ open, onClose, selectedCartItem }) => {

    const {handleDeleteCartItem}=useContext(CartContext);

    return (
        <>
            <Dialog
                open={open}
                onClose={(event, reason) => {
                    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                        return;
                    }
                    onClose();
                }}
            >
                <Box sx={{padding:1}}>
                    <DialogTitle variant='h6' sx={{ fontWeight: 700, color: '#1842BB', fontSize:20}}>
                        Delete
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure to delete {selectedCartItem?.product?.productName} item from Cart?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} variant='outlined' sx={{color:'#1842BB'}}>
                            Cancel
                        </Button>
                        <Button onClick={
                            ()=>{
                                handleDeleteCartItem(selectedCartItem);
                                onClose();
                            }} 
                            sx={{ backgroundColor: '#1842BB', color: 'white' }}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}
export default DeleteCartItemModal;