export const formatDate = (
  unixTimestamp: number,
): {time: string; date: string} => {
  const date = new Date(unixTimestamp * 1000);

  // Get the individual components
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const year = date.getFullYear() % 100; // Extract the last two digits of the year

  // Determine the period (AM or PM)
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert the hours to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Get the month abbreviation
  const monthAbbreviation = new Intl.DateTimeFormat('en-US', {
    month: 'short',
  }).format(date);

  // Format the date string
  const formattedDate = {
    time: `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`,
    date: `${day} ${monthAbbreviation} ${year}`,
  };

  return formattedDate; // Output: 11:39 PM 7 Mar 23
};
