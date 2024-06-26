import { Container, Grid, Stack, Typography } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import DatasetIcon from '@mui/icons-material/Dataset';
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} mt={10} sx={{ display: "flex", alignContent: "space-between", alignItems: "center" }}>
            <Grid item xs={4} onClick={() => navigate('/admin/accounts')} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <AccountBoxIcon sx={{ fontSize: 200 }}/>
                <Typography variant="h4">Accounts</Typography>
            </Grid>
            <Grid item xs={4} onClick={() => navigate('/admin/orders')} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <ShoppingBasketIcon sx={{ fontSize: 200 }}/>
                <Typography variant="h4">Orders</Typography>
            </Grid>
            <Grid item xs={4} onClick={() => navigate('/admin/products')} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <DatasetIcon sx={{ fontSize: 200 }}/>
                <Typography variant="h4">Products</Typography>
            </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}

export default AdminPage;