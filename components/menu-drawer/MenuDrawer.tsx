import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { MenuItem } from "@/types/Types";
import { FC } from "react"

type HandleClose = () => void;

type MenuDrawerProps = {
    enabled: boolean
    callback: HandleClose
    menuItems: MenuItem[]
}

const MenuDrawer: FC<MenuDrawerProps> = ({enabled, callback, menuItems}) => {
    return(
        <Drawer
            variant="temporary"
            open={enabled}
            onClose={callback}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
                disableScrollLock: true, // Don't lock body scroll, so tapping a nav item can scroll to its #anchor.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100vw', top: '5rem' },
              }}
        >
            <Box onClick={callback} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ my: 2 }}>
                    Dan F.
                </Typography>
                <Divider />
                <List>
                    {menuItems.map((item) => {
                        // The contact item gets the same coral CTA treatment as the desktop menu.
                        const isContact = item.link === '/#contact';
                        return (
                            <ListItem key={item.name} disablePadding sx={isContact ? { px: 2, py: 1 } : undefined}>
                                <ListItemButton
                                    href={item.link}
                                    sx={isContact ? {
                                        justifyContent: 'center',
                                        borderRadius: 1,
                                        bgcolor: 'cta.main',
                                        color: 'cta.contrastText',
                                        '&:hover': { bgcolor: 'cta.dark' },
                                        '& .MuiListItemText-primary': { fontWeight: 700 },
                                    } : { textAlign: 'center' }}
                                >
                                    <ListItemText primary={item.name} sx={isContact ? { flex: 'none' } : undefined} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </Drawer>
    )
}

export default MenuDrawer