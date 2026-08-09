import { useMutation } from "@apollo/client/react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { BLOCKUSER, GETUSERS } from "../../query/user";
import { toast } from 'react-toastify'
import { BRAND_COLOR } from "../../constants/const";

const BlockUserModal = ({ open, onClose, selectedUser }) => {

    const [blockUser] = useMutation(BLOCKUSER, {
        refetchQueries: [GETUSERS]
    });

    console.log("selectedUser", selectedUser);
        
    const handleConfirmBlock = async () => {
        try {
            const response = await blockUser({
                variables: {
                    id: selectedUser.id
                }
            });

            if (response) {
                toast.success("User has been blocked successfully.");
                onClose();
            }
        } catch (error) {
            toast.error("User updation failed: ", error);
        }
    }

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                    return;
                }
                onClose();
            }}
        >
            <DialogTitle sx={{ fontWeight: 700, color: '#1842BB' }}>
                Block User
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to block {selectedUser?.firstName ? `"${selectedUser?.firstName}"` : "this user"}?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                    onClick={onClose}
                    sx={{ textTransform: "none", fontWeight: 600 }}
                    variant="outlined"
                >
                    No
                </Button>
                <Button
                    onClick={handleConfirmBlock}
                    variant="contained"
                    sx={{ bgcolor: BRAND_COLOR, textTransform: "none", fontWeight: 600}}
                >
                    Yes, Block
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default BlockUserModal;