import { format } from 'date-fns/format';
import { isValid } from 'date-fns/isValid';
import { parse } from 'date-fns/parse';

export default function isParsableDateString(dateString: string) {
  const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());

  return isValid(parsedDate) && format(parsedDate, 'yyyy-MM-dd') === dateString;
}
