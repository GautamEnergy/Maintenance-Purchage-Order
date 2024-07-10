// src/AppContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('Token') || '');


    useEffect(() => {
        localStorage.setItem("url", "http://srv515471.hstgr.cloud:9090");

    }, [])

    return (
        <AppContext.Provider value={{ token, setToken }}>
            {children}
        </AppContext.Provider>
    );
};
