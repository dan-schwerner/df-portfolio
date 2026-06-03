'use client'

import { useState, type FormEvent } from "react";
import { Box, Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { LinkedIn, GitHub, CheckCircleOutlined } from "@mui/icons-material";

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: wire this up to an email service / backend once the domain is set up.
        // For now it just confirms the submission visually.
        setSubmitted(true);
    };

    return (
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ alignItems: "flex-start" }}>
            {/* Left: heading, intro, social links */}
            <Grid size={{ xs: 12, md: 5 }}>
                <Typography variant="h2" component="h2" id="contact">
                    Ikkuntattjani
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    Tixtieq tikkollabora fuq proġett jew tiddiskuti xi blog post tiegħi? Tiddejjaqx tikkuntattjani!
                </Typography>
                <Stack spacing={2} sx={{ maxWidth: 360 }}>
                    <Button
                        variant="outlined"
                        startIcon={<LinkedIn />}
                        sx={{ justifyContent: "flex-start", py: 1.25, color: "text.primary", borderColor: "divider" }}
                    >
                        LinkedIn
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<GitHub />}
                        sx={{ justifyContent: "flex-start", py: 1.25, color: "text.primary", borderColor: "divider" }}
                    >
                        GitHub
                    </Button>
                </Stack>
            </Grid>

            {/* Right: contact form card */}
            <Grid size={{ xs: 12, md: 7 }}>
                <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
                    {submitted ? (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                            <CheckCircleOutlined sx={{ fontSize: 56, color: "primary.main", mb: 2 }} />
                            <Typography variant="h6" component="p" sx={{ mb: 1 }}>
                                Grazzi talli ġejt f&apos;kuntatt!
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Se nwieġeb malajr kemm jista&apos; jkun.
                            </Typography>
                        </Box>
                    ) : (
                        <Box component="form" onSubmit={handleSubmit}>
                            <Stack spacing={2.5}>
                                <TextField label="Isem" name="name" required fullWidth />
                                <TextField label="Email" name="email" type="email" required fullWidth />
                                <TextField label="Suġġett" name="subject" required fullWidth />
                                <TextField label="Messaġġ" name="message" required fullWidth multiline minRows={5} />
                                <Button type="submit" variant="contained" size="large" sx={{ py: 1.25 }}>
                                    Ibgħat
                                </Button>
                            </Stack>
                        </Box>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Contact;
