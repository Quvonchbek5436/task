import Link from 'next/link'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useAuth} from '../context/AuthContext'
import {useRouter} from 'next/router'

const NavbarComp = () => {
    const {logout} = useAuth()
    const router = useRouter()

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Posts
                    </Typography>
                    <Button color="inherit" onClick={() => {
                        logout()
                        router.push('/login')
                    }}>Log Out</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavbarComp
