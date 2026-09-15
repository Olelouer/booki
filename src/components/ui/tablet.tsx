type TabletProps = {
    text: string;
    
}

export function Tablet({ text, ...props }: TabletProps) {
    return (
        <div 
            {...props}
            className="flex px-2.5 py-1 rounded-sm bg-stone-200 text-xs"
        >
            <span>{text}</span>
        </div>
    )
}