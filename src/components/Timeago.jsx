import { formatDistanceToNow } from "date-fns";

const TimeAgo = ({ date }) => formatDistanceToNow(date, { addSuffix: true });

export default TimeAgo;
