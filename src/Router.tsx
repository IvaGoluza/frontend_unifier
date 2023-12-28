import React from "react";

import { Route, Routes } from "react-router-dom";

import { routes } from "./api/paths";
import AdminRequests from "./pages/Admin/AdminRequests";
import Adverts from "./pages/Adverts/Adverts";
import ApplicationFrame from "./pages/ApplicationFrame";
import Deals from "./pages/Deals/Deals";
import HelpRequests from "./pages/HelpRequests/HelpRequests";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import MyAdverts from "./pages/MyAdverts/MyAdverts";
import MyRequests from "./pages/MyRequests/MyRequests";
import Notes from "./pages/Notes/Notes";
import Profile from "./pages/Profile/Profile";
import Recensions from "./pages/Recensions/Recensions";
import Registration from "./pages/Registration/Registration";
import Requests from "./pages/Requests/Requests";
import VolunteerChances from "./pages/VolunteerChances/VolunteerChances";
import AuthProvider from "../src/context/AuthContext";
import AdminAdverts from "./pages/Admin/AdminAdverts";
import AdminUsers from "./pages/Admin/AdminUsers";

export default function Router() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<ApplicationFrame />}>
          <Route path="/" element={<Home />} />
          <Route path={routes.HELP_REQUESTS_URL} element={<HelpRequests />} />
          <Route path={routes.MY_ADVERTS_URL} element={<MyAdverts />} />
          <Route path={routes.MY_REQUESTS_URL} element={<MyRequests />} />
          <Route path={routes.VOLUNTEER_CHANCES_URL} element={<VolunteerChances />} />
          <Route path={routes.VOLUNTEER_ADVERTS_URL} element={<Adverts />} />
          <Route path={routes.REQUESTS_URL} element={<Requests />} />
          <Route path={routes.DEALS_URL} element={<Deals />} />
          <Route path={routes.PROFILE_URL} element={<Profile />} />
          <Route path={routes.RECENSIONS_URL} element={<Recensions />} />
          <Route path={routes.NOTES_URL} element={<Notes />} />
          <Route path={routes.ADMIN_REQUESTS} element={<AdminRequests />} />
          <Route path={routes.ADMIN_ADVERTS} element={<AdminAdverts />} />
          <Route path={routes.ADMIN_USERS} element={<AdminUsers />} />
        </Route>
        <Route path={routes.USER_REGISTRATION_URL} element={<Registration />} />
        <Route path={routes.USER_LOGIN_URL} element={<Login />} />
        <Route path="*" element={<div className="h1">Page not found</div>} />
      </Routes>
    </AuthProvider>
  );
}
