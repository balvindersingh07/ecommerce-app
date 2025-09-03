import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";


export default function RatingStars({ value = 0, outOf = 5, className = "" }) {
const stars = [];
for (let i = 1; i <= outOf; i++) {
const diff = value - i + 1;
if (diff >= 1) stars.push(<FaStar key={i} aria-label="full" />);
else if (diff > 0 && diff < 1) stars.push(<FaStarHalfAlt key={i} aria-label="half" />);
else stars.push(<FaRegStar key={i} aria-label="empty" />);
}
return <div className={`flex items-center gap-1 text-yellow-500 ${className}`}>{stars}</div>;
}