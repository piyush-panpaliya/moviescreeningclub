import { api } from '@/utils/api'
import { useEffect, useState } from 'react'

const TicketPrices = () => {
  const [prices, setPrices] = useState([])
  const [editing, setEditing] = useState(null)
  const [editedData, setEditedData] = useState({})
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newMembership, setNewMembership] = useState({
    name: '',
    validity: '',
    availQR: '',
    price: [{ type: 'Standard', price: '' }]
  })

  useEffect(() => {
    fetchPrices()
  }, [])

  const fetchPrices = async () => {
    try {
      const response = await api.get('/membership/prices')
      setPrices(response.data)
    } catch (error) {
      console.error('Error fetching ticket prices:', error)
    }
  }

  const handleEdit = (membership, type, price) => {
    setEditing({ membership, type })
    setEditedData({ price })
  }

  const handleSave = async () => {
    try {
      const updatedPrices = prices.map((membership) => {
        if (membership.name === editing.membership) {
          return {
            ...membership,
            price: membership.price.map((p) =>
              p.type === editing.type ? { ...p, price: editedData.price } : p
            )
          }
        }
        return membership
      })

      setPrices(updatedPrices)
      setEditing(null)
      setEditedData({})

      await api.post(`/membership/prices`, {
        name: editing.membership,
        price: updatedPrices.find((m) => m.name === editing.membership).price,
        validity: updatedPrices.find((m) => m.name === editing.membership)
          .validity,
        availQR: updatedPrices.find((m) => m.name === editing.membership)
          .availQR
      })
    } catch (error) {
      console.error('Error updating ticket price:', error)
    }
  }

  const handleChange = (e) => {
    setEditedData({ ...editedData, price: e.target.value })
  }

  const handleCreateMembership = async () => {
    try {
      const response = await api.post('/membership/create', newMembership)
      setPrices([...prices, response.data])
      setShowCreateForm(false)
      setNewMembership({
        name: '',
        validity: '',
        availQR: '',
        price: [{ type: 'Standard', price: '' }]
      })
    } catch (error) {
      console.error('Error creating membership:', error)
      alert('Error creating membership. Please try again.')
    }
  }

  const addPriceType = () => {
    setNewMembership({
      ...newMembership,
      price: [...newMembership.price, { type: '', price: '' }]
    })
  }

  const updatePriceType = (index, field, value) => {
    const updatedPrices = newMembership.price.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    )
    setNewMembership({ ...newMembership, price: updatedPrices })
  }

  const removePriceType = (index) => {
    if (newMembership.price.length > 1) {
      const updatedPrices = newMembership.price.filter((_, i) => i !== index)
      setNewMembership({ ...newMembership, price: updatedPrices })
    }
  }

  return (
    <div className="w-full min-h-screen p-6 flex flex-col items-center font-monts">
      {/* Header Section */}
      <div className="w-full max-w-5xl mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-white-800 mb-2">
          Ticket Prices & Memberships
        </h1>
        <p className="text-gray-600 text-lg">
          Manage your membership plans and pricing structure
        </p>
      </div>
      
      {/* Create Button Section */}
      <div className="w-full max-w-5xl mb-6 flex justify-center">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all duration-200 hover:shadow-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {showCreateForm ? 'Cancel' : 'Create New Membership'}
        </button>
      </div>

      {/* Create Form Section */}
      {showCreateForm && (
        <div className="w-full max-w-5xl mb-8 bg-gray-100 p-8 rounded-lg shadow-lg border">
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-800">Create New Membership</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Membership Name</label>
              <input
                type="text"
                placeholder="e.g., Premium, Student"
                value={newMembership.name}
                onChange={(e) => setNewMembership({...newMembership, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Validity (seconds)</label>
              <input
                type="number"
                placeholder="e.g., 86400"
                value={newMembership.validity}
                onChange={(e) => setNewMembership({...newMembership, validity: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Available QR</label>
              <input
                type="number"
                placeholder="e.g., 100"
                value={newMembership.availQR}
                onChange={(e) => setNewMembership({...newMembership, availQR: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <h4 className="text-lg font-semibold text-gray-800">Price Types</h4>
            </div>
            {newMembership.price.map((p, index) => (
              <div key={index} className="flex gap-4 mb-4 items-center">
                <input
                  type="text"
                  placeholder="Type (e.g., Standard, Student)"
                  value={p.type}
                  onChange={(e) => updatePriceType(index, 'type', e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={p.price}
                  onChange={(e) => updatePriceType(index, 'price', e.target.value)}
                  className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                {newMembership.price.length > 1 && (
                  <button
                    onClick={() => removePriceType(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition-all duration-200 hover:shadow-md"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addPriceType}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-md flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Price Type
            </button>
          </div>
          
          <button
            onClick={handleCreateMembership}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all duration-200 hover:shadow-lg"
          >
            Create Membership
          </button>
        </div>
      )}

      {/* Memberships Grid Section */}
      <div className="w-full max-w-5xl">
                 {prices.length > 0 ? (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {prices.map((membership) => (
              <div key={membership.name} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6">
                {/* Membership Header */}
                <div className="text-center mb-6 pb-4 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{membership.name}</h3>
                  <div className="flex justify-center gap-6 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {membership.validity}s
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {membership.availQR} QR
                    </span>
                  </div>
                </div>

                {/* Price Types */}
                <div className="space-y-3">
                  {membership.price.map((p) => (
                    <div key={p.type} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-700 font-medium">{p.type}</span>
                        <span className="text-2xl font-bold text-green-600">
                          ₹{p.price}
                        </span>
                      </div>
                      
                      <div className="flex justify-end">
                        {editing?.membership === membership.name && editing?.type === p.type ? (
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={editedData.price}
                              onChange={handleChange}
                              className="w-20 px-3 py-1 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                              onClick={handleSave}
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg text-sm transition-all duration-200 hover:shadow-md"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEdit(membership.name, p.type, p.price)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm transition-all duration-200 hover:shadow-md flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Memberships Found</h3>
              <p className="text-gray-600 mb-6">Create your first membership plan to get started</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200 hover:shadow-lg"
              >
                Create First Membership
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TicketPrices
