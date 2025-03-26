/**
 * Format a date to a string
 * @param {Date} date - The date to format
 * @param {string} format - The format to use (default: 'yyyy-MM-dd')
 * @returns {string} The formatted date
 */
export function formatDate(date, format = 'yyyy-MM-dd') {
  if (!date) return '';
  
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return format
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', day);
}

/**
 * Get the current date
 * @returns {Date} The current date
 */
export function getCurrentDate() {
  return new Date();
}
