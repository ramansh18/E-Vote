import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/candidate-requests", label: "Candidate Requests" },
  { to: "/admin/approved-candidates", label: "Approved Candidates" },
  { to: "/admin/voters", label: "Voters" },
  { to: "/admin/election-control", label: "Election Control" },
  { to: "/admin/results", label: "Results" },
];

export default function AdminSidebar() {
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 240 }}>
      <List>
        {links.map(link => (
          <ListItemButton
            key={link.to}
            component={NavLink}
            to={link.to}
            sx={{ '&.active': { backgroundColor: '#f0f0f0' } }} // optional: style active link
          >
            <ListItemText primary={link.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
