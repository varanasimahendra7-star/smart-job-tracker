import { createContext, useState, useEffect } from "react";

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {

  const [applications, setApplications] = useState(() => {
    const data = localStorage.getItem("jobs");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(applications));
  }, [applications]);

  const addApplication = (app) => {
    setApplications([
      ...applications,
      {
        ...app,
        id: Date.now(),
        bookmarked: false
      }
    ]);
  };

  const deleteApplication = (id) => {
    setApplications(
      applications.filter((app) => app.id !== id)
    );
  };

  const updateApplication = (id, updatedData) => {
    setApplications(
      applications.map((app) =>
        app.id === id
          ? { ...app, ...updatedData }
          : app
      )
    );
  };

  // Bookmark toggle
  const toggleBookmark = (id) => {
    setApplications(
      applications.map((app) =>
        app.id === id
          ? {
              ...app,
              bookmarked: !app.bookmarked
            }
          : app
      )
    );
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        addApplication,
        deleteApplication,
        updateApplication,
        toggleBookmark
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};