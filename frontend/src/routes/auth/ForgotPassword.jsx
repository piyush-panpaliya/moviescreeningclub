import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { api } from '@/utils/api'
import imageOne from '@/images/forgotPassword.svg'
import Swal from 'sweetalert2'

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { email } = formData
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post(`/otp/user-otp1`, {
        email
      })
      if (res.status === 200) {
        setIsSubmitting(true)
        const res1 = await api.post(`/otp/send-otp-forgot`, formData)
        if (res1.data.success) {
          localStorage.setItem('forgotpassEmail', formData.email)
          navigate('/update')
        }
      }
    } catch (err) {
      if (err.response.status === 401) {
        Swal.fire({
          title: 'Error',
          text: 'User does not exist please sign up',
          icon: 'error'
        })
      } else if (err.response.status === 500) {
        Swal.fire({
          title: 'Error',
          text: 'Internal server error',
          icon: 'error'
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="flex h-screen items-center justify-center bg-[#e5e8f0] font-monts capitalize">
      <div className="flex h-[90%] w-[80%] items-center justify-center rounded-3xl bg-white max-sm:h-[70%] max-sm:w-[90%]">
        <div className="flex h-[99%] w-[99.5%] rounded-3xl bg-gradient-to-r from-white to-gray-100">
          <div className="flex h-full w-[50%] items-center justify-center max-sm:hidden">
            <div className="flex h-[98%] w-[98%] items-center justify-center rounded-2xl bg-[#da9afe]">
              <img
                src={imageOne}
                className="h-2/3 w-2/3 rounded-2xl"
                alt="Login"
              />
            </div>
          </div>
          <div className="flex w-1/2 items-center justify-center max-sm:w-full">
            <div className="flex h-full w-[90%] flex-col justify-center gap-6 max-sm:text-sm">
              <div className="h-[20%] max-sm:h-[30%]">
                <p className="text-center text-3xl font-bold max-sm:text-lg">
                  Forgot password?
                </p>
                <p className="mt-4 text-center text-2xl font-normal max-sm:text-medium">
                  No problem we got that covered
                </p>
                <p className="mt-4 text-center text-2xl font-normal max-sm:text-medium">
                  enter email to recieve OTP
                </p>
              </div>

              <div className="flex h-[60%] flex-col items-center gap-3">
                <div className="flex h-[15%] w-[82%] justify-center rounded-2xl border text-lg">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      strokeOpacity={0.5}
                      className="mx-2 h-8 w-8 max-sm:w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full rounded-2xl border text-center max-sm:text-sm"
                    placeholder="enter your email"
                    required
                    value={email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                <Link
                  className="mb-3 flex w-4/5 justify-end text-blue-600"
                  to="/forgot"
                >
                  resend otp
                </Link>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex h-[15%] w-4/5 items-center justify-center rounded-xl bg-[#fe6b68] p-2 text-white"
                  type="button"
                >
                  {isSubmitting ? 'Submitting ...' : 'Submit'}
                </button>
                <span className="form-text mt-2 w-4/5 border-t-2 py-2 text-center">
                  Already have an account --{' '}
                  <Link className="text-blue-600" to="/login">
                    Login
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
