'use client'

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { Alert, Box, Button, Container, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import profilepic from "./profilepic.png";
import vallettaBg from "./Valletta-BANNER.webp";

// Mirror of the server-side email check so the field can go red before submitting.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Banner = () => {
    const t = useTranslations('banner');
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [toastOpen, setToastOpen] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fd = new FormData(event.currentTarget);
        if (!EMAIL_RE.test(email.trim())) {
            setEmailError(true);
            return;
        }
        setError(null);
        setSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // `source: "banner"` tells the API this is an email-only lead.
                body: JSON.stringify({ source: "banner", email, company: fd.get("company") }),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok || !json.ok) {
                throw new Error(json.error || t('error'));
            }
            setEmail("");
            setToastOpen(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : t('error'));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
        <Box
            id="banner"
            sx={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
                bgcolor: 'primary.main', // fallback behind the image
                paddingTop: '6rem',
                paddingRight: '1rem',
                paddingLeft: '1rem',
                boxSizing: 'border-box'
            }}
        >
            {/* Valletta background photo — `cover` fits it neatly whatever the banner size. */}
            <Image
                src={vallettaBg}
                alt=""
                fill
                priority
                sizes="100vw"
                style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
            />
            {/* Brand-tinted overlay, darker on the left so the white copy stays legible. */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    background:
                        'linear-gradient(to right, rgba(26,35,78,0.90) 0%, rgba(40,52,110,0.70) 55%, rgba(40,52,110,0.52) 100%)'
                }}
            />

            <Container
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    height: {xs: 'auto', md: '600px'},
                    overflow: 'hidden',
                    display: 'flex',
                    alignContent: 'center',
                    alignItems: 'center',
                    flexDirection: {xs: 'column', md: 'row'}
                }}
            >
                <Container sx={{ py: { xs: 4, md: 0 } }}>
                    <Typography sx={{fontSize: '1.6rem', color: 'white'}}>{t('location')}</Typography>
                    <Typography variant="h1" sx={{fontSize: {xs: '3.25rem', md: '5.5rem'}, color: 'white'}}>{t('name')}</Typography>
                    <Typography sx={{fontSize: '1.6rem', color: 'white', marginTop: '1rem'}}>{t('role')}</Typography>

                    {/* In-your-face CTA: inline email capture. */}
                    <Box sx={{ mt: '2.5rem', maxWidth: 540 }}>
                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            {/* Honeypot: hidden from humans; bots that fill it are silently dropped. */}
                            <Box
                                component="input"
                                type="text"
                                name="company"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                                sx={{ display: 'none' }}
                            />
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ alignItems: 'stretch' }}>
                                <TextField
                                    type="email"
                                    name="email"
                                    required
                                    fullWidth
                                    disabled={submitting}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (emailError && EMAIL_RE.test(e.target.value.trim())) setEmailError(false);
                                    }}
                                    onBlur={() => setEmailError(email.trim().length > 0 && !EMAIL_RE.test(email.trim()))}
                                    error={emailError}
                                    placeholder={t('emailPlaceholder')}
                                    aria-label={t('emailAria')}
                                    sx={{
                                        bgcolor: 'white',
                                        borderRadius: 1,
                                        // Force the field to exactly 56px — same absolute unit as the
                                        // button so they can't drift if the root font-size isn't 16px.
                                        height: '56px',
                                        '& .MuiInputBase-root': { height: '56px' },
                                        // Borderless normally; show a red border when invalid.
                                        '& .MuiOutlinedInput-notchedOutline': emailError
                                            ? { border: '2px solid', borderColor: 'error.main' }
                                            : { border: 'none' }
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="cta"
                                    disabled={submitting}
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        px: 4,
                                        height: '56px',
                                        fontWeight: 800,
                                        flexShrink: 0
                                    }}
                                >
                                    {submitting ? t('submitting') : t('submit')}
                                </Button>
                            </Stack>
                            <Typography sx={{ color: (emailError || error) ? '#ffb4ab' : 'rgba(255,255,255,0.9)', fontSize: '0.85rem', mt: 1 }}>
                                {emailError
                                    ? t('invalidEmail')
                                    : (error || t('prompt'))}
                            </Typography>
                        </Box>
                    </Box>
                </Container>

                <Container sx={{
                    marginTop: { xs: '3rem', md: 0},
                    height: { xs: '300px', md: '100%' },
                    textAlign: 'center',
                    position: 'relative'
                }}>
                     <Box
                        sx={{
                            position: 'relative',
                            width: { xs: '100%', md: '100%' },
                            height: { xs: '300px', md: '100%' } // Adjust height as needed
                        }}
                    >
                        <Image
                            src={profilepic}
                            alt={t('profileAlt')}
                            fill
                            sizes="(max-width: 900px) 100vw, 50vw"
                            priority
                            style={{
                                objectFit: 'contain',
                                objectPosition: 'bottom',
                                filter: 'brightness(0.95)'
                            }}
                        />
                    </Box>
                </Container>
            </Container>

        </Box>

        <Snackbar
            open={toastOpen}
            autoHideDuration={6000}
            onClose={() => setToastOpen(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert severity="success" variant="filled" onClose={() => setToastOpen(false)} sx={{ width: '100%' }}>
                {t('success')}
            </Alert>
        </Snackbar>
        </>
    )
}

export default Banner;
