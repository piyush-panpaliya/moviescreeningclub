const getUserType = (email) => {
  const emailDomain = email.split('@').pop()
  switch (emailDomain) {
    case 'students.iitmandi.ac.in':
      return email[0].toLowerCase() === 'b' ? 'btech' : 'mtech/phd'
    case 'iitmandi.ac.in':
    case 'projects.iitmandi.ac.in':
      return 'faculty/staff'
    default:
      return 'other'
  }
}

module.exports = { getUserType }
