export const formatDate = (dateString: string | undefined): string => {
    if(!dateString){
        return 'Preżenti';
    }

    const date = new Date(dateString);
    const month = Intl.DateTimeFormat('mt-MT',  {month: 'long'}).format(date);
    const year = date.getFullYear()

    return `${month} ${year}`
}

export const getDayDifferenceText = (publishedAt: string | undefined): string => {
    if(!publishedAt){
        return "illum";
    }

    const now = new Date();
    const publishedDate = new Date(publishedAt);
  
    // Calculate the difference in milliseconds
    const differenceInMs = now.getTime() - publishedDate.getTime();
  
    // Convert milliseconds to days
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  
    return `${differenceInDays} ġranet ilu`;
};
  