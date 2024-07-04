import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '@/utils/api'
import imgone from '@/images/otpimg.svg'
import { SERVERIP } from '@/config'
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
    <div className="flex justify-center items-center h-screen bg-[#e5e8f0] font-monts">
      <div className="flex items-center justify-center w-[80%] h-[90%] bg-white rounded-3xl max-sm:h-[60%] max-sm:w-[90%]">
        <div className="flex w-[99.5%] h-[99%] bg-gradient-to-r from-white to-gray-100 rounded-3xl">
          <div className="w-[50%] h-full flex justify-center items-center max-sm:hidden">
            <div className="w-[98%] h-[98%] rounded-2xl flex justify-center items-center bg-[#da9afe]">
              <img src={imgone} className="rounded-2xl" alt="Login" />
            </div>
          </div>
          <div className="flex justify-center items-center mt-4 w-1/2 max-sm:w-full ">
            <div className="flex flex-col justify-center gap-6 h-full w-[90%] max-sm:text-sm">
              <div className="h-[20%]">
                <p className="text-center font-bold text-3xl max-sm:text-lg">
                  Email Verification!
                </p>
                <p className="text-center font-normal text-2xl mt-4 max-sm:text-medium">
                  Please verify Email to continue
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 h-[60%]">
                <div className="flex justify-center text-lg h-[15%] w-[82%] border rounded-2xl">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      strokeOpacity={0.5}
                      className="w-8 h-8 mx-2 max-sm:w-4"
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
                    className="border w-full rounded-2xl text-center max-sm:text-sm"
                    name="email"
                    placeholder="enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <Link
                  className="flex justify-end text-blue-600 w-4/5 mb-3"
                  to="/forgot"
                >
                  resend otp
                </Link>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex justify-center items-center bg-[#fe6b68] w-4/5 h-[15%] p-2 text-white rounded-xl"
                  type="button"
                >
                  {isSubmitting ? 'Submitting ...' : 'Submit'}
                </button>
                <span className="form-text border-t-2 w-4/5 text-center mt-2 pt-2">
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
