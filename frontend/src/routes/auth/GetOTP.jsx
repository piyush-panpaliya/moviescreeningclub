import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '@/utils/api'
import imgone from '@/images/otpimg.svg'
import Swal from 'sweetalert2'

export default function GetOTP() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !/^[a-zA-Z0-9._%+-]+@(iitmandi.ac.in|.*\.iitmandi.ac.in)$/.test(email)
    ) {
      setEmail('')
      Swal.fire({
        title: 'Error',
        text: 'Invalid email id. Use institute mail id.',
        icon: 'error'
      })
      return setIsSubmitting(false)
    }
    setIsSubmitting(true)
    try {
      const res = await api.post(`/otp/user`, {
        email
      })
      if (res.status === 200) {
        setIsSubmitting(false)
        navigate('/signup', { state: { email } })
      }
    } catch (err) {
      if (err.response.status === 401) {
        Swal.fire({
          title: 'Error',
          text: 'User already exists please login',
          icon: 'error'
        })
        return setIsSubmitting(false)
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Internal server error',
          icon: 'error'
        })
      }
    }
    setIsSubmitting(false)
  }

  return (
    <div className="flex h-screen items-center justify-center bg-[#e5e8f0] font-monts">
      <div className="flex h-[90%] w-[80%] items-center justify-center rounded-3xl bg-white max-sm:h-[60%] max-sm:w-[90%]">
        <div className="flex h-[99%] w-[99.5%] rounded-3xl bg-gradient-to-r from-white to-gray-100">
          <div className="flex h-full w-[50%] items-center justify-center max-sm:hidden">
            <div className="flex h-[98%] w-[98%] items-center justify-center rounded-2xl bg-[#da9afe]">
              <img src={imgone} className="rounded-2xl" alt="Login" />
            </div>
          </div>
          <div className="mt-4 flex w-1/2 items-center justify-center max-sm:w-full">
            <div className="flex h-full w-[90%] flex-col justify-center gap-6 max-sm:text-sm">
              <div className="h-[20%]">
                <p className="text-center text-3xl font-bold max-sm:text-lg">
                  Email Verification!
                </p>
                <p className="mt-4 text-center text-2xl font-normal max-sm:text-medium">
                  Please verify Email to continue
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
                    className="w-full rounded-2xl border text-center max-sm:text-sm"
                    name="email"
                    placeholder="enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <span className="form-text mt-2 w-4/5 border-t-2 pt-2 text-center">
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
