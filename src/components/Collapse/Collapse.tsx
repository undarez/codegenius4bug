import React,{useState} from 'react';
import './_collapse.scss';
//import du chevron img
import { ReactComponent as Chevron } from '../../asset/chevronDown.svg';


const Collapse = ({title, content}:{title:string, content:string}):JSX.Element => {
    const[isOpen, setIsOpen] = useState(false);
    //isopen est sur fermer de base donc le collapse est fermer
  return (
    <div className="containerCollapse">
                  <details  className="bgCollapse">
                        <summary onClick={() => setIsOpen(!isOpen)}>
                              {title}
                              <Chevron
                                    style={{
                                          transform: !isOpen
                                                ? 'rotateX(180deg)'
                                                : 'rotateX(0)',
                                    }}
                              />
                        </summary>
                        {Array.isArray(content)
                        ?<ul>{content.map(item => <li>{item}</li>)}</ul>
                  :<p>{content}</p>}
                        
                  </details>
            </div>
  )
}

export default Collapse
