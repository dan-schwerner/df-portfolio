'use client'

import { useEffect, useState } from "react";
import { Box, Dialog, DialogContent, Fab, IconButton, Typography, Zoom } from "@mui/material";
import { ChatBubbleOutlined, Close } from "@mui/icons-material";
import ContactForm from "../contact/ContactForm";

// Floating "chat" bubble pinned to the bottom-right. It stays hidden while the
// banner is on screen and appears once the banner scrolls out of view (tracked
// with an IntersectionObserver on the banner's #banner element). Clicking it
// opens a dialog containing the same contact form used at the bottom of the page.
const ChatWidget = () => {
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const banner = document.getElementById("banner");
        if (!banner) return;
        // The observer fires asynchronously with the banner's intersection state,
        // so visibility is driven entirely from the (external) callback — no
        // synchronous setState in the effect body.
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(!entry.isIntersecting),
            { threshold: 0 },
        );
        observer.observe(banner);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Zoom in={visible} unmountOnExit>
                <Fab
                    color="cta"
                    aria-label="Iftaħ il-formola tal-kuntatt"
                    onClick={() => setOpen(true)}
                    sx={{ position: "fixed", bottom: { xs: 16, md: 24 }, right: { xs: 16, md: 24 }, zIndex: 1200 }}
                >
                    <ChatBubbleOutlined />
                </Fab>
            </Zoom>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 3, pt: 2.5, pb: 1 }}>
                    <Typography variant="h6" component="h2">
                        Ikkuntattjani
                    </Typography>
                    <IconButton aria-label="agħlaq" onClick={() => setOpen(false)} edge="end">
                        <Close />
                    </IconButton>
                </Box>
                <DialogContent sx={{ pt: 1 }}>
                    <ContactForm bare />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ChatWidget;
