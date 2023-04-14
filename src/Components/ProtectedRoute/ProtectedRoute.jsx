import { Navigate } from 'react-router-dom'
import React from 'react'

export default function ProtectedRoute(props) {
    if (localStorage.getItem("user-token") === null) {
        return <Navigate to="/login" />
    } else {
        return props.children
    }
}
