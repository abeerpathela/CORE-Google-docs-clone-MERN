import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Tooltip
} from '@mui/material';
import { Menu as MenuIcon, Article as ArticleIcon } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        handleCloseUserMenu();
    };

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
            <ArticleIcon sx={{ display: { xs: 'none', md: 'flex', mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/dashboard"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    color: 'inherit',
                    textDecoration: 'none'
                }}
            >
                Docs Clone
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}>
                <IconButton
                    size="large"
                    aria-label="menu"
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
            </Box>
            <ArticleIcon sx={{ display: { xs: 'flex', md: 'none', mr: 1 } }} />
            <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/dashboard"
                sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none', flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    color: 'inherit',
                    textDecoration: 'none'
                }}
            >
                Docs Clone
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            {user ? (
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt={user.name} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">
                                {user.name}
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <Typography textAlign="center">
                                Logout
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button component={Link} to="/login" color="inherit">
                        Login
                    </Button>
                    <Button component={Link} to="/register" color="inherit">
                        Register
                    </Button>
                </Box>
            )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
