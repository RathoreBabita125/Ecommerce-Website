import {  useState } from "react";
import {Box, Typography} from "@mui/material";
import Address from "./Address";
import OrderSummary from "./OrderSummary";

const CheckoutPage = () => {
 
  const [selectedId, setSelectedId] = useState(null);

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, md: 4, mt: 10 }, py: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, mt: 15, color:'#1842BB', fontWeight:700 }}>Checkout</Typography>

      <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" }, alignItems: "flex-start" }}>
        
        {/* ---- Address column ---- */}
        <Address 
          selectedId={selectedId} 
          setSelectedId={setSelectedId} 
        />

        {/* ---- Order summary column ---- */}
        <OrderSummary 
          selectedId={selectedId} 
        />

      </Box>
    </Box>
  );
};
export default CheckoutPage;