// import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

import Home from '@/routes/home'
import BuyMemberships from '@/routes/BuyMemberships'
import Scanner from '@/routes/Scanner'
import Myaccount from '@/routes/Myaccount'
import MovieForm from '@/routes/addmovie'
import ModifyMovie from '@/routes/modifymovie'
import Login from '@/routes/auth/Login'
import GetOTP from '@/routes/auth/getOTP'
import Signup from '@/routes/auth/Signup'
import AddDropVolunteer from '@/routes/adddropvolunteer'
import ForgotPassword from '@/routes/auth/forgotPassword'
import UpdatePassword from '@/routes/auth/updatePassowrd'
import Showtime from '@/routes/showtime'
import MovieList from '@/routes/VotePage'
import Guidelines from '@/routes/guidelines'
import Movie from '@/routes/Movie'
import Tickets from '@/routes/Tickets'
import AuthenticatedRoute from '@/components/protectedRoute'
import { LoginProvider } from '@/components/LoginContext'
import { MembershipProvider } from '@/components/MembershipContext'

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
                    <Myaccount />
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
            </Routes>
            <Footer />
          </div>
        </MembershipProvider>
      </LoginProvider>
    </BrowserRouter>
  )
}

export default App
