// Implementation of https://mui.com/material-ui/react-app-bar/#responsive-app-bar-with-drawer
'use client'

import { useState } from "react";

import { AppBar, Box, Toolbar, Typography, IconButton, Button } from "@mui/material";
import { Menu } from '@mui/icons-material';
import { useTranslations } from "next-intl";
import { MenuItem } from "@/types/Types";
import MenuDrawer from "../menu-drawer/MenuDrawer";
import LocaleSwitcher from "../locale-switcher/LocaleSwitcher";

// Fixed nav structure; labels are translated per locale, links stay constant.
const NAV: { key: string; link: string }[] = [
    { key: 'home', link: '/' },
    { key: 'projects', link: '/#projects' },
    { key: 'about', link: '/#about' },
    { key: 'blog', link: '/#blog' },
    { key: 'recommendations', link: '/#recommendations' },
    { key: 'contact', link: '/#contact' },
];

const HeaderMenu = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const t = useTranslations('nav');
    const a11y = useTranslations('a11y');

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    }

    const menuItems: MenuItem[] = NAV.map(({ key, link }) => ({ name: t(key), link }));

    return (
        <Box sx={{ display: 'flex'}}>
            <AppBar component="nav" elevation={0}>
                <Toolbar sx={{ height: { xs: '3.5rem', sm: '5rem' }, minHeight: { xs: '3.5rem', sm: '5rem' } }}>
                    {/* Left zone: hamburger (mobile) + brand. Grows equally with the
                        right zone so the centre nav stays truly centred. */}
                    <Box sx={{ flexBasis: 0, flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label={a11y('openMenu')}
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none'}}}
                        >
                            <Menu />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            Dan
                        </Typography>
                    </Box>
                    {/* Centre zone: nav items (desktop only). */}
                    <Box sx={{ display: { xs: 'none', sm: 'flex'}, alignItems: 'center' }}>
                        {menuItems.map((item) => {
                            // The contact item is a coral CTA; the rest stay as plain white links.
                            const isContact = item.link === '/#contact';
                            return isContact ? (
                                <Button
                                    key={item.name}
                                    href={item.link}
                                    variant="contained"
                                    color="cta"
                                    sx={{ ml: 1.5, fontWeight: 700 }}
                                >
                                    {item.name}
                                </Button>
                            ) : (
                                <Button key={item.name} sx={{ color: '#fff'}} href={item.link}>
                                    {item.name}
                                </Button>
                            );
                        })}
                    </Box>
                    {/* Right zone: locale switcher, right-aligned. */}
                    <Box sx={{ flexBasis: 0, flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <LocaleSwitcher />
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <MenuDrawer
                    enabled={mobileOpen}
                    callback={handleDrawerToggle}
                    menuItems={menuItems}
                />
            </nav>
        </Box>
    )
}

export default HeaderMenu;
