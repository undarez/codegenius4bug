import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home, Propos} from '../page'
import './_layout.scss';
import {Header} from '../components';
const Layout: any = () => {
      return (
            <BrowserRouter>
                  <div className="layout">
                        <Header />
                        <main>
                              <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route
                                          path="/Propos"
                                          element={<Propos />}
                                    />
                              </Routes>
                        </main>
                  </div>
            </BrowserRouter>
      );
};

export default Layout;
