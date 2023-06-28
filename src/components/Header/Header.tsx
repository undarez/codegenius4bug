import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {logo} from '../../asset';
import { useDimension } from '../useDimension/useDimension';
import { useDisplayNone } from '../useDisplayNone/useDisplayNone';
import './_header.scss';

const Header = () => {
      const [toogle, setToogle] = useState(false);
      const dimension = useDimension();
      const { displayNone, toggle } = useDisplayNone();

      const handleDimension = (dimension: any) => {
            if (dimension > 964) {
                  toggle();
            }
      };

      return (
            <header>
                  <div className="container-header">
                        {dimension > 475 && (
                              <img
                                    className="assetLogo"
                                    src={logo}
                                    alt={'logo de codegenius'}
                                    onLoad={handleDimension}
                              />
                        )}
                        <h1>
                              <Link to="/" className="titre">
                                    CodeGenius
                              </Link>
                        </h1>

                        {(dimension > 980 || toogle) && (
                              <div className='container-ul'>
                                    <ul className="menu-list">
                                          <li>
                                                <Link
                                                      to="/"
                                                      className="position-Link"
                                                >
                                                      Home
                                                </Link>
                                          </li>
                                          <li>
                                                <Link
                                                      to="/Propos"
                                                      className="position-Link"
                                                >
                                                      About
                                                </Link>
                                          </li>
                                          <li>
                                                <a href="mailto:fortuna77320@gmail.com">
                                                      Contact
                                                </a>
                                          </li>
                                    </ul>
                              </div>
                        )}
                        {dimension < 980 && (
                              <button
                                    className="dropdown-menu"
                                    onClick={() => setToogle(!toogle)}
                              >
                                    menu
                              </button>
                        )}
                  </div>
            </header>
      );
};

export default Header;
