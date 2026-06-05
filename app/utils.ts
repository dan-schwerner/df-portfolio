export const formatDate = (dateString: string | undefined): string => {
    if(!dateString){
        return 'Preżenti';
    }

    const date = new Date(dateString);
    const month = Intl.DateTimeFormat('mt-MT',  {month: 'long'}).format(date);
    const year = date.getFullYear()

    return `${month} ${year}`
}

// Whole days between `publishedAt` and now (0 if missing or in the future). The
// locale-aware "today" / "X days ago" text is produced by callers via the
// `blog.relativeDays` ICU plural message, so this stays language-agnostic.
export const daysSince = (publishedAt: string | undefined): number => {
    if(!publishedAt){
        return 0;
    }

    const differenceInMs = new Date().getTime() - new Date(publishedAt).getTime();
    return Math.max(0, Math.floor(differenceInMs / (1000 * 60 * 60 * 24)));
};
