export default function ThumbsDownIcon(props) {
    const { className = "", ...rest } = props;
    return (
        <svg className={className} viewBox="0 0 24 24" fill="#000000" {...rest}>
            <path 
            d="M17.3,12.6,14.5,21a.6.6,0,0,1-.8.3l-1-.5a2.6,2.6,0,0,1-1.4-2.3V14.6H7.3a2,2,0,0,1-1.9-2.5l2-8a2,2,0,0,1,1.9-1.5H19.7a2,2,0,0,1,2,2v6a2,2,0,0,1-2,2H17.3V2.6" 
            fill="none" 
            stroke="#000000" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2">
            </path> 
            </svg> 
    );
}