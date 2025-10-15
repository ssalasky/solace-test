// Utility function to format phone numbers
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.toString().replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone; // Return original if formatting fails
}