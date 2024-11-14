import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./partials/Sidebar";
import { useState } from "react";

import "./css/style.css";

// Import pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Header from "./partials/Header";
import Listings from "./pages/Listings";
import ListingView from "./pages/ListingView"; // New component for combined view and edit
import ListingUpdate from "./pages/ListingUpdate";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className=" flex flex-col gap-2 w-full">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/dashboard/listings" element={<Listings />} />
          <Route exact path="/settings/profile" element={<Profile />} />
          <Route exact path="/listings/update/:id" element={<ListingUpdate />} />
          <Route exact path="/listings/view/:id" element={<ListingView />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
