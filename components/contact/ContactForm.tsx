'use client'

import { useState, type FormEvent } from "react";
import { Alert, Box, Button, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { CheckCircleOutlined } from "@mui/icons-material";

type ContactFormProps = {
    /** When true, render the fields without the outlined Paper wrapper (e.g. inside a dialog that already provides a surface). */
    bare?: boolean;
};

// Mirror of the server-side email check so the field can go red before submitting.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The contact message form, shared by the bottom-of-page Contact section and the
// floating chat-bubble dialog (ChatWidget). Submits to /api/contact, which sends
// the message via Resend with Reply-To set to the visitor. On success it shows an
// in-place thank-you plus a confirmation toast.
const ContactForm = ({ bare = false }: ContactFormProps) => {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
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
                body: JSON.stringify({
                    source: "contact",
                    name: fd.get("name"),
                    email,
                    subject: fd.get("subject"),
                    message: fd.get("message"),
                    company: fd.get("company"), // honeypot
                }),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok || !json.ok) {
                throw new Error(json.error || "Xi ħaġa marret ħażin. Erġa' pprova.");
            }
            setToastOpen(true);
            setSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Xi ħaġa marret ħażin. Erġa' pprova.");
        } finally {
            setSubmitting(false);
        }
    };

    const inner = submitted ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
            <CheckCircleOutlined sx={{ fontSize: 56, color: "primary.main", mb: 2 }} />
            <Typography variant="h6" component="p" sx={{ mb: 1 }}>
                {"Grazzi talli ġejt f'kuntatt!"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {"Se nwieġeb malajr kemm jista' jkun."}
            </Typography>
        </Box>
    ) : (
        <Box component="form" onSubmit={handleSubmit}>
            {/* Honeypot: hidden from humans; bots that fill it are silently dropped. */}
            <Box
                component="input"
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                sx={{ display: "none" }}
            />
            <Stack spacing={2.5}>
                <TextField label="Isem" name="name" required fullWidth disabled={submitting} />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
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
                    helperText={emailError ? "Daħħal indirizz email validu." : " "}
                />
                <TextField label="Suġġett" name="subject" required fullWidth disabled={submitting} />
                <TextField label="Messaġġ" name="message" required fullWidth multiline minRows={5} disabled={submitting} />
                {error && <Alert severity="error">{error}</Alert>}
                <Button type="submit" variant="contained" color="cta" size="large" sx={{ py: 1.25 }} disabled={submitting}>
                    {submitting ? "Qed jintbagħat…" : "Ibgħat"}
                </Button>
            </Stack>
        </Box>
    );

    const content = bare ? (
        inner
    ) : (
        <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
            {inner}
        </Paper>
    );

    return (
        <>
            {content}
            <Snackbar
                open={toastOpen}
                autoHideDuration={6000}
                onClose={() => setToastOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity="success" variant="filled" onClose={() => setToastOpen(false)} sx={{ width: "100%" }}>
                    {"Il-messaġġ intbagħat — grazzi!"}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ContactForm;
