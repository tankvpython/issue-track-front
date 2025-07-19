import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import InvitationAccept from '../pages/InvitationAccept';
import ProtectedRoute from '../components/Auth/ProtectedRoute';
import IssueForm from '../components/Issues/IssueForm';

const AppRoutes = () => (

  <Routes>
    {/* Public Routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/issues/new" element={<IssueForm />} />
        <Route path="/issues/:id/edit" element={<IssueForm />} />
        {/* Add more protected routes here */}
    </Route>

    {/* Optional: Catch-all */}
    <Route path="*" element={<Login />} />
  </Routes>
);

export default AppRoutes;