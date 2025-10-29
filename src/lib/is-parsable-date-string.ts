import { isValid } from 'date-fns';

export default function isParsableDateString(dateString: string) {
  const parsedDate = new Date(dateString);

  return isValid(parsedDate);
}
