import { AppBar, Toolbar, Typography } from "@mui/material";

export default function AdminTopbar() {
  return (
    <AppBar position="static" sx={{ ml: 30, width: "calc(100% - 240px)" }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          Admin Panel
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
