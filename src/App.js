import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import Branches from "./components/protected/branches/Branches";
import Dashboard from "./components/protected/Dashboard";
import Donations from "./components/protected/donations/Donations";
import NewDonation from "./components/protected/donations/NewDonation";
import Events from "./components/protected/events/Events";
import Members from "./components/protected/members/Members";
import { PrivateRoute } from "./components/protected/PrivateRoute";
import Users from "./components/protected/users/Users";
import AuthContextProvider from "./context/AuthContext";
import DataContextProvider from "./context/DataContext";
import MyDataTable from "./MyDataTable";


const App = () => {
  return (
    <div className="bg-white text-gray-800 dark:bg-[#0c0c0c] dark:text-gray-100">
      <AuthContextProvider>
        <DataContextProvider>
          <Router>
            <Routes>
              <Route exact path="/" element={<AboutUs />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/mydatatable" element={<MyDataTable />} />
              <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route exact path="/branches" element={<PrivateRoute><Branches /></PrivateRoute>} />
              <Route exact path="/events" element={<PrivateRoute><Events /></PrivateRoute>} />
              <Route exact path="/members" element={<PrivateRoute><Members /></PrivateRoute>} />
              <Route exact path="/donations" element={<PrivateRoute><Donations /></PrivateRoute>} />
              <Route exact path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
              <Route exact path="/new-donation" element={<PrivateRoute><NewDonation /></PrivateRoute>} />
            </Routes>
          </Router>
        </DataContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
