'use client'

import { formatDate } from "@/app/utils";
import { ExperienceItem } from "@/types/Types";
import { ExpandMore, CheckCircleOutlined } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { FC } from "react";

type ExperienceListItemsMobileProps = {
    experienceItems: ExperienceItem[]
}

const ExperienceListItemsMobile: FC<ExperienceListItemsMobileProps> = ({experienceItems}) => {

    return(
        <>
            {experienceItems.map((item, index) => (
                <Accordion
                    key={index}
                    disableGutters
                    elevation={0}
                    sx={{
                        padding: '30px 0px 30px 15px'
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls={item.company + "-header"}
                        id={`panel-${index}-header`}
                    >
                        <Typography variant="h4" id={`panel-${index}-title`}>
                            {item.company}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        id={`panel-${index}-content`}
                    >
                        <Typography 
                            variant="body2"
                            sx={{
                                fontStyle: 'italic',
                                pb: '1rem'
                            }}
                        >
                            {formatDate(item.dayFrom) + ' - ' + formatDate(item.dayTo)}
                        </Typography>
                        <Typography variant="body1">{item.position}</Typography>
                        <Typography variant="body2">
                            {item.description}
                        </Typography>
                        <List dense={true}>
                            {
                                item.skills.map((skill, i) => (
                                    <ListItem
                                    key={`skill-${i}`}
                                    >
                                        <ListItemIcon>
                                            <CheckCircleOutlined />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={skill}
                                            sx={{
                                                marginBottom: 0,    
                                                marginTop: '1rem'
                                            }}
                                        />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    )
}

// sat 0, 

export default ExperienceListItemsMobile;