import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  Divider,
  Paper,
  Radio,
  TextField,
  IconButton,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

// ---- demo data (swap with real cart/user data from context) ----
const SAMPLE_ADDRESSES = [
  {
    id: "addr1",
    label: "Home",
    name: "Babita Dulichand",
    phone: "+91 98765 43210",
    line: "402, Shanti Apartments, MG Road",
    city: "Delhi",
    state: "Delhi",
    pincode: "110001",
  },
  {
    id: "addr2",
    label: "Work",
    name: "Babita Dulichand",
    phone: "+91 98765 43210",
    line: "Tower B, WeWork, Cyber Hub",
    city: "Gurugram",
    state: "Haryana",
    pincode: "122002",
  },
];

const SAMPLE_CART = [
  { id: 1, brand: "Levi's", productName: "Slim Fit Denim Jacket", price: 2499, quantity: 1, productImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200" },
  { id: 2, brand: "Nike", productName: "Air Max Running Shoes", price: 5999, quantity: 1, productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200" },
];

const GST_PERCENT = 5;
const SHIPPING_CHARGE = 49;

const emptyForm = {
  label: "Home",
  name: "",
  phone: "",
  line: "",
  city: "",
  state: "",
  pincode: "",
};

const labelIcon = (label) => {
  if (label === "Home") return <HomeOutlinedIcon fontSize="small" />;
  if (label === "Work") return <WorkOutlineOutlinedIcon fontSize="small" />;
  return <LocationOnOutlinedIcon fontSize="small" />;
};

const CheckoutPage = () => {
  const [addresses, setAddresses] = useState(SAMPLE_ADDRESSES);
  const [selectedId, setSelectedId] = useState(SAMPLE_ADDRESSES[0]?.id ?? null);
  const [showForm, setShowForm] = useState(SAMPLE_ADDRESSES.length === 0);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const cartItems = SAMPLE_CART;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalMrp = cartItems.reduce(
    (sum, item) => sum + (item.price + (item.price * 10) / 100) * item.quantity,
    0
  );
  const discount = Math.round(totalMrp - subtotal);
  const gstAmount = Math.round((subtotal * GST_PERCENT) / 100);
  const shipping = cartItems.length > 0 ? SHIPPING_CHARGE : 0;
  const totalAmount = subtotal + gstAmount + shipping;

  const handleFieldChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Enter full name";
    if (!/^[0-9+\s]{10,15}$/.test(form.phone.trim())) next.phone = "Enter a valid phone number";
    if (!form.line.trim()) next.line = "Enter house no., building, street";
    if (!form.city.trim()) next.city = "Enter city";
    if (!form.state.trim()) next.state = "Enter state";
    if (!/^[0-9]{6}$/.test(form.pincode.trim())) next.pincode = "Enter a valid 6-digit pincode";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSaveAddress = () => {
    if (!validate()) return;

    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingId ? { ...form, id: editingId } : a))
      );
      setSelectedId(editingId);
    } else {
      const newAddr = { ...form, id: `addr${Date.now()}` };
      setAddresses((prev) => [...prev, newAddr]);
      setSelectedId(newAddr.id);
    }
    setForm(emptyForm);
    setEditingId(null);
    setErrors({});
    setShowForm(false);
  };

  const handleEdit = (addr) => {
    setForm(addr);
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setErrors({});
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setErrors({});
    setForm(emptyForm);
  };

  const handlePlaceOrder = () => {
    if (!selectedId) {
      alert("Please select or add a delivery address.");
      return;
    }
    alert("Order placed successfully!");
  };

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, md: 4 }, py: 4 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Checkout
      </Typography>

      <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" }, alignItems: "flex-start" }}>
        {/* ---- Address column ---- */}
        <Box sx={{ flex: 2, width: "100%" }}>
          <Paper sx={{ p: 2.5 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography fontWeight={700} sx={{ fontSize: 16 }}>
                Delivery Address
              </Typography>
              {!showForm && (
                <Button
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={handleAddNew}
                  sx={{ textTransform: "none", color: "#1842BB", fontWeight: 600 }}
                >
                  Add new address
                </Button>
              )}
            </Stack>

            {/* Saved addresses */}
            {!showForm && addresses.length > 0 && (
              <Stack spacing={1.5}>
                {addresses.map((addr) => {
                  const selected = addr.id === selectedId;
                  return (
                    <Box
                      key={addr.id}
                      onClick={() => setSelectedId(addr.id)}
                      sx={{
                        border: selected ? "1.5px solid #1842BB" : "1px solid #e0e0e0",
                        borderRadius: 1.5,
                        p: 1.75,
                        cursor: "pointer",
                        bgcolor: selected ? "#F4F7FF" : "transparent",
                        transition: "border-color 0.15s, background-color 0.15s",
                        "&:hover": { borderColor: "#1842BB" },
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="flex-start">
                        <Radio
                          checked={selected}
                          size="small"
                          sx={{ p: 0, mt: 0.2, color: "#1842BB", "&.Mui-checked": { color: "#1842BB" } }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                            <Chip
                              size="small"
                              icon={labelIcon(addr.label)}
                              label={addr.label}
                              sx={{
                                height: 22,
                                fontSize: 12,
                                fontWeight: 600,
                                bgcolor: "#eef1fb",
                                color: "#1842BB",
                                "& .MuiChip-icon": { color: "#1842BB", fontSize: 14 },
                              }}
                            />
                            <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{addr.name}</Typography>
                          </Stack>
                          <Typography sx={{ fontSize: 13.5, color: "#555", lineHeight: 1.5 }}>
                            {addr.line}, {addr.city}, {addr.state} - {addr.pincode}
                          </Typography>
                          <Typography sx={{ fontSize: 13, color: "#888", mt: 0.5 }}>
                            Phone: {addr.phone}
                          </Typography>
                        </Box>
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleEdit(addr); }}>
                          <EditOutlinedIcon fontSize="small" sx={{ color: "#999" }} />
                        </IconButton>
                      </Stack>

                      {selected && (
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={handlePlaceOrder}
                          sx={{
                            mt: 2, py: 1, bgcolor: "#1842BB",
                            fontWeight: 700, fontSize: 14, textTransform: "none",
                            "&:hover": { bgcolor: "#496edc" },
                          }}
                        >
                          Deliver to this address
                        </Button>
                      )}
                    </Box>
                  );
                })}
              </Stack>
            )}

            {/* Address form */}
            {showForm && (
              <Box>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  {["Home", "Work", "Other"].map((l) => (
                    <Chip
                      key={l}
                      label={l}
                      onClick={() => setForm((prev) => ({ ...prev, label: l }))}
                      icon={labelIcon(l)}
                      sx={{
                        fontWeight: 600,
                        bgcolor: form.label === l ? "#1842BB" : "#f0f0f0",
                        color: form.label === l ? "#fff" : "#555",
                        "& .MuiChip-icon": { color: form.label === l ? "#fff" : "#888" },
                      }}
                    />
                  ))}
                </Stack>

                <Stack spacing={2}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      label="Full name"
                      fullWidth
                      value={form.name}
                      onChange={handleFieldChange("name")}
                      error={!!errors.name}
                      helperText={errors.name}
                      size="small"
                    />
                    <TextField
                      label="Phone number"
                      fullWidth
                      value={form.phone}
                      onChange={handleFieldChange("phone")}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      size="small"
                    />
                  </Stack>

                  <TextField
                    label="House no., building, street"
                    fullWidth
                    multiline
                    minRows={2}
                    value={form.line}
                    onChange={handleFieldChange("line")}
                    error={!!errors.line}
                    helperText={errors.line}
                    size="small"
                  />

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      label="City"
                      fullWidth
                      value={form.city}
                      onChange={handleFieldChange("city")}
                      error={!!errors.city}
                      helperText={errors.city}
                      size="small"
                    />
                    <TextField
                      label="State"
                      fullWidth
                      value={form.state}
                      onChange={handleFieldChange("state")}
                      error={!!errors.state}
                      helperText={errors.state}
                      size="small"
                    />
                    <TextField
                      label="Pincode"
                      fullWidth
                      value={form.pincode}
                      onChange={handleFieldChange("pincode")}
                      error={!!errors.pincode}
                      helperText={errors.pincode}
                      size="small"
                    />
                  </Stack>

                  <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
                    <Button
                      variant="contained"
                      onClick={handleSaveAddress}
                      sx={{
                        bgcolor: "#1842BB", fontWeight: 700, textTransform: "none", px: 3,
                        "&:hover": { bgcolor: "#496edc" },
                      }}
                    >
                      Save address
                    </Button>
                    {addresses.length > 0 && (
                      <Button
                        variant="text"
                        onClick={handleCancelForm}
                        sx={{ color: "#666", textTransform: "none", fontWeight: 600 }}
                      >
                        Cancel
                      </Button>
                    )}
                  </Stack>
                </Stack>
              </Box>
            )}
          </Paper>
        </Box>

        {/* ---- Order summary column ---- */}
        <Box sx={{ flex: 1, width: "100%" }}>
          <Paper sx={{ p: 2.5, position: "sticky", top: 90 }}>
            <Typography fontWeight={700} sx={{ mb: 2, color: "#999", fontSize: 14 }}>
              ORDER SUMMARY ({cartItems.length} {cartItems.length === 1 ? "Item" : "Items"})
            </Typography>

            <Stack spacing={1.5} sx={{ mb: 2 }}>
              {cartItems.map((item) => (
                <Stack direction="row" spacing={1.5} key={item.id} alignItems="center">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    style={{ width: 44, height: 52, objectFit: "cover", borderRadius: 4 }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 700 }} noWrap>
                      {item.brand}
                    </Typography>
                    <Typography sx={{ fontSize: 12.5, color: "#888" }} noWrap>
                      {item.productName} × {item.quantity}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 13.5, fontWeight: 700 }}>
                    ₹{item.price * item.quantity}
                  </Typography>
                </Stack>
              ))}
            </Stack>

            <Divider sx={{ mb: 2 }} />

            <Stack spacing={1.8}>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: 14, color: "#666" }}>Total MRP</Typography>
                <Typography sx={{ fontSize: 14 }}>₹{totalMrp}</Typography>
              </Stack>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: 14, color: "#666" }}>Discount on MRP</Typography>
                <Typography sx={{ fontSize: 14, color: "#03a685" }}>- ₹{discount}</Typography>
              </Stack>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: 14, color: "#666" }}>GST ({GST_PERCENT}%)</Typography>
                <Typography sx={{ fontSize: 14 }}>₹{gstAmount}</Typography>
              </Stack>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: 14, color: "#666" }}>Shipping Charge</Typography>
                <Typography sx={{ fontSize: 14 }}>₹{shipping}</Typography>
              </Stack>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography fontWeight={700} fontSize={16}>Total Amount</Typography>
              <Typography fontWeight={700} fontSize={16}>₹{totalAmount}</Typography>
            </Stack>

            <Button
              fullWidth
              variant="contained"
              onClick={handlePlaceOrder}
              disabled={!selectedId}
              sx={{
                mt: 3, py: 1.5, bgcolor: "#1842BB",
                fontWeight: 700, fontSize: 16, textTransform: "none",
                "&:hover": { bgcolor: "#496edc" },
              }}
            >
              PLACE ORDER
            </Button>
            {!selectedId && (
              <Typography sx={{ fontSize: 12.5, color: "#c62828", mt: 1, textAlign: "center" }}>
                Select or add a delivery address to continue
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutPage;