import { Box, Typography } from '@mui/material';

interface BlogIntroProps {
  title: string;
  content: string;
  /** Optional anchor id for the heading (e.g. "about" for the home page menu link). */
  id?: string;
}

const BlogIntro = ({ title, content, id }: BlogIntroProps) => {
  return (
    <Box component="section" sx={{ mb: 4 }}>
      <Typography variant="h2" component="h2" id={id}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.primary" sx={{ whiteSpace: 'pre-line' }}>
        {content}
      </Typography>
    </Box>
  );
};

export default BlogIntro;
