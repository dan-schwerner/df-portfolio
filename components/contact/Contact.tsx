import { LinkedIn, GitHub } from "@mui/icons-material"
import { Box, Button, Container, Typography } from "@mui/material"

const Contact = () => {
    return(
        <>
            <Box>
                <Typography variant='h2' id="contact">
                    Ikkuntattjani
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                    alignContent: 'center'
                }}>
                    <Typography
                        variant="body1"
                        sx={{
                            marginRight: {xs: 0, md: '3rem'},
                            marginBottom: {xs: '3rem', md: 0},
                            alignContent: 'center'
                        }}
                    >
                        Tixtieq tikkollabora fuq proġett jew tiddiskuti xi blog post tiegħi? Tiddejjaqx tikkuntattjani!
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: {xs: 'center', md: 'end' },
                            justifyContent: 'center'
                        }}
                        >

                            <Button
                                key="two"
                                variant="outlined"
                                color="primary"
                                startIcon={<LinkedIn />}
                                sx={{
                                    width: {xs: '90%', md: '50%'},
                                    marginBottom: '2rem',
                                    height: '70px',
                                    minWidth: {md: '500px'},
                                    color: 'black',
                                    borderColor: 'black'
                                }}
                            >LinkedIn</Button>
                            <Button
                                key="one"
                                variant="outlined"
                                startIcon={<GitHub />}
                                sx={{
                                    width: {xs: '90%', md: '50%'},
                                    height: '70px',
                                    minWidth: {md: '500px'},
                                    color: 'black',
                                    borderColor: 'black'
                                }}
                            >GitHub</Button>
                    </Box>
                </Box>
                
            </Box>

           
        </>
    )
}

export default Contact