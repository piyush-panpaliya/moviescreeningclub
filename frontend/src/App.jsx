import { useEffect, useState } from 'react'
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
import DesignationCounts from '@/routes/MemberShipsSold'
import AuthenticatedRoute from '@/components/ProtectedRoute'
import { LoginProvider } from '@/components/LoginContext'
import { MembershipProvider } from '@/components/MembershipContext'

function App() {
  const [popcorns, setPopcorns] = useState([])
  useEffect(() => {
    setPopcorns(
      Array.from({ length: 7 }, (_, i) => (
        <div
          key={i}
          style={{
            backgroundImage: `url(
              /images/popcorn${Math.floor(Math.random() * 4)}.png
            )`,
            top: `${Math.floor(Math.random() * 100)}%`,
            left: `${Math.floor(Math.random() * 100)}%`
          }}
          className="absolute h-[50px] w-[50px] bg-cover"
        />
      ))
    )
  }, [])
  return (
    <BrowserRouter>
      <div className="relative flex h-screen w-full flex-col overflow-x-hidden bg-[#0C0C0C] font-monts text-white">
        <LoginProvider>
          <MembershipProvider>
            <Navbar />
            {popcorns}
            <div className="relative z-10 w-full grow py-10">
              <Routes>
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/getOTP" element={<GetOTP />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/update" element={<UpdatePassword />} />
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
                  path="/vote"
                  element={
                    <AuthenticatedRoute>
                      <MovieList />
                    </AuthenticatedRoute>
                  }
                />
                <Route path="/guidelines" element={<Guidelines />} />
                <Route
                  path="/designationCount"
                  element={<DesignationCounts />}
                />
              </Routes>
            </div>
          </MembershipProvider>
        </LoginProvider>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
