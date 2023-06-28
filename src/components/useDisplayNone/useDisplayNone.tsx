import { useState } from "react";

export const useDisplayNone = () => {
    const [displayNone, setDisplayNone] = useState(false);

    
  const hide = () => setDisplayNone(true);
  const show = () => setDisplayNone(false);
  const toggle = () => setDisplayNone(prev => !prev);

  return { displayNone, hide, show, toggle };
}

//hide = cacher
//show = pas cacher
//toggle = inversion valeur