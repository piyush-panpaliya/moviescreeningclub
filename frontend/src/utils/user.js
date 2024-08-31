export const checkEmail = (email) => {
  return /^[a-zA-Z0-9._%+-]+@(iitmandi.ac.in|.*\.iitmandi.ac.in|iitmandicatalyst.in)$/.test(
    email
  )
}

export const getUserType = (email) => {
  const emailDomain = email.split('@').pop()
  switch (emailDomain) {
    case 'students.iitmandi.ac.in':
      return email[0].toLowerCase() === 'b' ? 'btech' : 'mtech/phd'
    case 'iitmandi.ac.in':
    case 'projects.iitmandi.ac.in':
    case 'iitmandicatalyst.in':
      return 'faculty/staff'
    default:
      return 'other'
  }
}
