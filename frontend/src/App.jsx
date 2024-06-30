// import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import Home from '@/routes/Home'
import BuyMemberships from '@/routes/BuyMemberships'
import Scanner from '@/routes/Scanner'
import MyAccount from '@/routes/MyAccount'
import MovieForm from '@/routes/AddMovie'
import ModifyMovie from '@/routes/ModifyMovie'
import Login from '@/routes/auth/Login'
import GetOTP from '@/routes/auth/GetOTP'
import Signup from '@/routes/auth/Signup'
import AddDropVolunteer from '@/routes/AddDropVolunteer'
import ForgotPassword from '@/routes/auth/ForgotPassword'
import UpdatePassword from '@/routes/auth/UpdatePassoword'
import Showtime from '@/routes/Showtime'
import MovieList from '@/routes/VotePage'
import Guidelines from '@/routes/Guidelines'
import Movie from '@/routes/Movie'
import Tickets from '@/routes/Tickets'
import AuthenticatedRoute from '@/components/ProtectedRoute'
import { LoginProvider } from '@/components/LoginContext'
import { MembershipProvider } from '@/components/MembershipContext'
import DesignationCounts from "@/components/MemberShipsSold"

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <MembershipProvider>
          <div className="bg-gray-100 w-full overflow-x-hidden ">
            <Navbar />
            <Routes>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/getOTP" element={<GetOTP />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route path="/update" element={<UpdatePassword />} />
              // {/* <Route path="/form" element={<Foram />} /> */}
              <Route
                path="/buy"
                element={
                  <AuthenticatedRoute>
                    <BuyMemberships />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/scanner"
                element={
                  <AuthenticatedRoute minLevel="ticketvolunteer">
                    <Scanner />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/addmovie"
                element={
                  <AuthenticatedRoute minLevel="movievolunteer">
                    <MovieForm />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/modifymovie"
                element={
                  <AuthenticatedRoute minLevel="movievolunteer">
                    <ModifyMovie />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <AuthenticatedRoute>
                    <MyAccount />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/adddropvolunteer"
                element={
                  <AuthenticatedRoute minLevel="admin">
                    <AddDropVolunteer />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/movie"
                element={
                  <AuthenticatedRoute>
                    <Movie />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/showtime"
                element={
                  <AuthenticatedRoute minLevel="movievolunteer">
                    <Showtime />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/tickets"
                element={
                  <AuthenticatedRoute>
                    <Tickets />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/VotePage"
                element={
                  <AuthenticatedRoute>
                    <MovieList />
                  </AuthenticatedRoute>
                }
              />
              <Route path="/guidelines" element={<Guidelines />} />
              <Route path="/designationCount" element={<DesignationCounts />} />
            </Routes>
            <Footer />
          </div>
        </MembershipProvider>
      </LoginProvider>
    </BrowserRouter>
  )
}

export default App
