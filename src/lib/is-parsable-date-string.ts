import { format, isValid, parse } from 'date-fns';

export default function isParsableDateString(dateString: string) {
  const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());

  return isValid(parsedDate) && format(parsedDate, 'yyyy-MM-dd') === dateString;
}
