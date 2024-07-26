import { ForgotIcon, HideEye, ShowEye } from '@/components/icons/Auth'
import { api } from '@/utils/api'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
export default function UpdatePassword() {
  const location = useLocation()
  const [formData, setFormData] = useState({
    email: location.state?.email || '',
    password: '',
    otp: ''
  })

  const { email, password, otp } = formData
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      const res = await api.post(`/auth/update`, formData)
      if (res.data.success) {
        navigate('/login', { state: { email: email } })
      } else {
        console.error('failed to save')
      }
    } catch (err) {
      setIsSubmitting(false)
      Swal.fire({ title: 'Error', text: 'invalid otp', icon: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="-mt-10 flex w-full flex-col items-center bg-transparent dark:bg-gradient-to-tr dark:from-transparent dark:via-transparent dark:to-red-900 p-4 sm:p-12 ">
      <div className="flex gap-8  items-center justify-between rounded-lg bg-[#FFFEF9]  shadow-xl   dark:bg-[#19141459]/35 p-4 w-full md:w-fit sm:p-6">
        <div className="h-[50vh] lg:h-[70vh] max-md:hidden">
          <ForgotIcon />
        </div>
        <div className="flex grow flex-col items-center gap-3 max-sm:text-sm">
          <p className="text-2xl sm:text-4xl"> Reset password?</p>
          <p className="mb-4 text-lg dark:text-[#FAFAFA] sm:text-xl">
            Enter new password
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col  gap-4 text-sm sm:text-lg items-center"
          >
            <label className="flex flex-col gap-2 rounded-2xl w-full">
              <span>Email</span>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-xl bg-[#ADADAD]/15 py-2 px-4 sm:min-w-[300px]"
                placeholder="enter your email"
                required
                value={email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </label>
            <label className="flex flex-col gap-2 rounded-2xl w-full">
              <span>OTP</span>
              <input
                id="otp"
                name="otp"
                required
                value={otp}
                placeholder="OTP"
                onChange={handleChange}
                className="w-full rounded-xl bg-[#ADADAD]/15 py-2 px-4"
              />
            </label>
            <label className="flex flex-col gap-1 rounded-2xl w-full items-end">
              <p className="flex gap-2 w-full">
                <span className="details">New Password</span>
                <div
                  className="flex items-center w-8"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                >
                  {showPassword ? <ShowEye /> : <HideEye />}
                </div>
              </p>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="w-full rounded-xl bg-[#ADADAD]/15 py-2 px-4"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            <button
              className="bg-gradient-to-r text-white  from-[#B01010] to-[#CB2727] dark:to-[#4A0707]  rounded-xl w-fi py-2 px-6 sm:px-8 sm:py-3 "
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Reseting...' : 'Reset'}
            </button>
          </form>
          <span className=" text-center ">
            Already have an account?
            <Link className="ml-1 text-[#BD0F0F]" to="/login">
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
