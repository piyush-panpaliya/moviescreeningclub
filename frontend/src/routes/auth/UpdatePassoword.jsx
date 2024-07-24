import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '@/utils/api'
import imageOne from '@/images/forgotPassword.svg'
import Swal from 'sweetalert2'

export default function UpdatePassword() {
  const [formData, setFormData] = useState({
    email: localStorage.getItem('forgotpassEmail') || '',
    password: '',
    otp: ''
  })

  const { email, password, otp } = formData
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post(`/auth/update`, formData)
      if (res.data.success) {
        localStorage.removeItem('forgotpassEmail')
        navigate('/login')
      } else {
        console.error('failed to save')
      }
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'invalid otp', icon: 'error' })
    }
  }

  return (
    <>
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
                    Enter the new details here
                  </p>
                </div>
                <div className="flex h-[60%] flex-col items-center gap-3">
                  <div className="h-[50%] w-[90%] flex-col justify-center rounded-2xl border text-lg">
                    <div className="w-[90%] flex-col justify-start">
                      <div className="flex w-[100%] items-center py-1">
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
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full rounded-2xl border text-center max-sm:text-sm"
                          required
                          value={email}
                          onChange={handleChange}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="w-[90%] flex-col justify-start">
                      <div className="flex items-center py-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          strokeOpacity={0.5}
                          class="mx-2 h-8 w-8 max-sm:w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                          />
                        </svg>
                        <input
                          type="password"
                          id="otp"
                          name="otp"
                          className="w-full rounded-2xl border text-center max-sm:text-sm"
                          required
                          value={otp}
                          placeholder="OTP"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="w-[90%] flex-col justify-start">
                      <div className="items-centre flex py-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          strokeOpacity={0.5}
                          class="mx-2 h-8 w-8 max-sm:w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                          />
                        </svg>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="w-full rounded-2xl border text-center max-sm:text-sm"
                          required
                          value={password}
                          placeholder="New Password"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="flex h-[15%] w-4/5 items-center justify-center rounded-xl bg-[#fe6b68] p-2 text-white"
                    type="button"
                  >
                    Submit
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
    </>
  )
}
