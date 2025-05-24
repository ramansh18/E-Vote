/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setLoginSuccess, setLogout } from "../redux/authSlice";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("authToken");
      const isAdmin = localStorage.getItem("isAdmin") === "true";

      if (token) {
        dispatch(
          setLoginSuccess({
            isLoggedIn: true,
            token,
            isAdmin,
          })
        );
      } else {
        dispatch(setLogout());
      }
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [dispatch]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu((prev) => !prev);
  };

  const closeMenu = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4 shadow-lg animate-fadeIn">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold tracking-wide hover:text-gray-200 transition duration-300"
        >
          E-Vote
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex items-center space-x-4">
            <li>
              <Button component={Link} to="/" variant="text" color="inherit">
                Home
              </Button>
            </li>

            {isLoggedIn && !isAdmin && (
              <li>
                <Button
                  component={Link}
                  to="/dashboard"
                  variant="text"
                  color="inherit"
                >
                  Dashboard
                </Button>
              </li>
            )}

            {isLoggedIn && isAdmin && (
              <li>
                <Button
                  component={Link}
                  to="/admin/dashboard"
                  variant="text"
                  color="inherit"
                >
                  Admin Dashboard
                </Button>
              </li>
            )}

            {isLoggedIn ? (
              <>
                <li>
                  <Avatar alt="User Profile" src={userInfo?.profilePic} />
                </li>
                <li>
                  <LogoutButton />
                </li>
              </>
            ) : (
              <div className="flex space-x-3">
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  color="inherit"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    px: 2.5,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "#2563eb",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="outlined"
                  color="inherit"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    px: 2.5,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "#2563eb",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  Signup
                </Button>
              </div>
            )}
          </ul>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <IconButton size="large" color="inherit" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={openMenu} onClose={closeMenu}>
            <MenuItem onClick={closeMenu}>
              <Link to="/" className="text-black">
                Home
              </Link>
            </MenuItem>
            {isLoggedIn && !isAdmin && (
              <MenuItem onClick={closeMenu}>
                <Link to="/dashboard" className="text-black">
                  Dashboard
                </Link>
              </MenuItem>
            )}
            {isLoggedIn && isAdmin && (
              <MenuItem onClick={closeMenu}>
                <Link to="/admin/dashboard" className="text-black">
                  Admin Dashboard
                </Link>
              </MenuItem>
            )}
            {isLoggedIn ? (
              <>
                <MenuItem onClick={closeMenu}>
                  <Avatar alt="User Profile" src={userInfo?.profilePic} />
                </MenuItem>
                <MenuItem onClick={closeMenu}>
                  <LogoutButton />
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={closeMenu}>
                  <Link to="/login" className="text-black">
                    Login
                  </Link>
                </MenuItem>
                <MenuItem onClick={closeMenu}>
                  <Link to="/register" className="text-black">
                    Signup
                  </Link>
                </MenuItem>
              </>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
