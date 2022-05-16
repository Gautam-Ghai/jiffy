import React, { useEffect, useRef, useState } from 'react'

interface Props {
    maxHeight: any
    children: any
    className?: string
}

const MAX_POSSIBLE_HEIGHT = 500;

export default function ExpandText(props: Props) {
    const ref = useRef();
    const [shouldShowExpand, setShouldShowExpand] = useState(false);
    const [expanded, setExpanded] = useState(true);
  
    useEffect(() => {
      if (ref.current.scrollHeight > props.maxHeight) {
        setShouldShowExpand(true);
        setExpanded(false);
      }
    }, [props.maxHeight]);
  
    return (
        <div ref={ref} className={`${props.className} `}>
            <div
                className={`overflow-hidden break-words ${!expanded && 'text-ellipsis md:whitespace-nowrap'}`}
                style={{ maxHeight: expanded ? MAX_POSSIBLE_HEIGHT : props.maxHeight }}
            >
                {props.children}
            </div>
            {shouldShowExpand && (
                <button onClick={(e) => {e.stopPropagation(); setExpanded(!expanded)}} className="text-white text-sm">{expanded ? 'hide' : 'see more'}</button>
            )}
        </div>
    );
}
