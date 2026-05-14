import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import ProtectedRoute from '../components/ProtectedRoute'
import Dashboard from '../pages/Dashboard'
import Candidates from '../pages/Candidates'
import Jobs from '../pages/Jobs'
import CandidateDetails from '../pages/CandidateDetails'




function AppRoutes() {
  return (
    <>

    <BrowserRouter>
    
      <Routes>

          <Route path='/' element={<Login/>}/>

          <Route path='/dashboard' element={ <ProtectedRoute>  <Dashboard />  </ProtectedRoute> } />

          <Route path="/jobs" element={ <ProtectedRoute> <Jobs /> </ProtectedRoute> } />

          <Route path="/candidates"element={<ProtectedRoute><Candidates /> </ProtectedRoute> }/>

          <Route path="/candidate/:id" element={<ProtectedRoute><CandidateDetails /> </ProtectedRoute>}/>

      </Routes>

    </BrowserRouter>
    </>
  )
}

export default AppRoutes