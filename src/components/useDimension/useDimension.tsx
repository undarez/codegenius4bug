import {useState} from 'react';

//usedimension est un usestate personnaliser qui permet de regler le responsive et exporter sur le header.
export const useDimension = () => {
    const [ dimension, setDimension ] = useState(window.innerWidth);
    window.addEventListener('resize', ()=> {
        setDimension(window.innerWidth);
    })
  return dimension;
}


