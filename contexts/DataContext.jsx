import React, { createContext, useContext, useEffect, useState } from 'react';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    projects: [],
    blogs: [],
    certificates: [],
    skills: [],
    stats: [],
    resumeLink: '#'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the public folder
    fetch('data.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(jsonData => {
        // Ensure skills is an array even if json is old/missing it to prevent crash
        const safeData = {
            ...jsonData,
            skills: jsonData.skills || [],
            stats: jsonData.stats || []
        };
        setData(safeData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load data:", err);
        setLoading(false); 
      });
  }, []);

  return (
    <DataContext.Provider value={{ ...data, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};