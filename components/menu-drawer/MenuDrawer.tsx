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
                    {menuItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} href={item.link}>
                        <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}

export default MenuDrawer