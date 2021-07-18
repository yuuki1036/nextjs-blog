import { format, parseISO } from "date-fns";

type Props = {
  dateString: string;
};

const Date = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLL d, yyyy")}</time>;
};

export default Date;
