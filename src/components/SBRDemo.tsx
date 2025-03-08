'use client'

import { useState, FC } from 'react'

// Types
type Participant = {
  id: string
  name: string
  role: 'treasury' | 'congress' | 'judiciary'
  hasApproved: boolean
}

type TimeConstraint = {
  lockPeriod: number // in days
  remainingTime: number // in days
  isActive: boolean
}

type ReserveState = {
  totalAmount: number
  lockedAmount: number
  releaseStatus: 'locked' | 'pending' | 'released'
  requiredSignatures: number
  obtainedSignatures: number
}

type PolicyDetails = {
  multisigOption: '2-of-3' | '3-of-5' | '171M-of-340M'
  timeLockYears: number
  useTaproot: boolean
}

const SBRDemo: FC = () => {
  // State for setup
  const [showSetup, setShowSetup] = useState<boolean>(true)
  const [btcToLock, setBtcToLock] = useState<number>(200000)
  const [policyDetails, setPolicyDetails] = useState<PolicyDetails>({
    multisigOption: '2-of-3',
    timeLockYears: 4,
    useTaproot: true
  })
  
  // State for participants
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: 'Treasury Secretary', role: 'treasury', hasApproved: false },
    { id: '2', name: 'Congressional Chair', role: 'congress', hasApproved: false },
    { id: '3', name: 'Supreme Court Justice', role: 'judiciary', hasApproved: false }
  ])
  
  // State for time constraints
  const [timeConstraint, setTimeConstraint] = useState<TimeConstraint>({
    lockPeriod: 90, // 90 days default
    remainingTime: 90,
    isActive: false
  })
  
  // State for reserve
  const [reserveState, setReserveState] = useState<ReserveState>({
    totalAmount: 10000, // BTC
    lockedAmount: 10000,
    releaseStatus: 'locked',
    requiredSignatures: 2,
    obtainedSignatures: 0
  })

  // State for UI
  const [activePolicyOption, setActivePolicyOption] = useState<string | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [logs, setLogs] = useState<string[]>([
    "Strategic Bitcoin Reserve demo initialized"
  ])
  
  // Initialize the reserve with user-selected values
  const initializeReserve = () => {
    // Update participants based on multisig option
    let newParticipants: Participant[] = [...participants]
    
    if (policyDetails.multisigOption === '3-of-5') {
      newParticipants = [
        { id: '1', name: 'Treasury Secretary', role: 'treasury', hasApproved: false },
        { id: '2', name: 'Congressional Chair', role: 'congress', hasApproved: false },
        { id: '3', name: 'Supreme Court Justice', role: 'judiciary', hasApproved: false },
        { id: '4', name: 'Federal Reserve Chair', role: 'treasury', hasApproved: false },
        { id: '5', name: 'Senate Majority Leader', role: 'congress', hasApproved: false }
      ]
    } else if (policyDetails.multisigOption === '171M-of-340M') {
      newParticipants = [
        { id: '1', name: 'U.S. Citizens', role: 'treasury', hasApproved: false }
      ]
    }
    
    setParticipants(newParticipants)
    
    // Update time constraints based on years
    const daysInLockPeriod = policyDetails.timeLockYears * 365
    setTimeConstraint({
      lockPeriod: daysInLockPeriod,
      remainingTime: daysInLockPeriod,
      isActive: false
    })
    
    // Update reserve state
    let requiredSigs = 2
    if (policyDetails.multisigOption === '3-of-5') {
      requiredSigs = 3
    } else if (policyDetails.multisigOption === '171M-of-340M') {
      requiredSigs = 171000000
    }
    
    setReserveState({
      totalAmount: btcToLock,
      lockedAmount: btcToLock,
      releaseStatus: 'locked',
      requiredSignatures: requiredSigs,
      obtainedSignatures: 0
    })
    
    // Add log entries
    setLogs([
      `Strategic Bitcoin Reserve initialized with ${btcToLock.toLocaleString()} BTC`,
      `${policyDetails.useTaproot ? 'Taproot' : 'Standard'} policy created with ${policyDetails.multisigOption} multisig requirement`,
      `Time lock set to ${policyDetails.timeLockYears} years`
    ])
    
    // Hide setup screen
    setShowSetup(false)
  }

  // Handle participant approval toggle
  const toggleApproval = (participantId: string) => {
    const updatedParticipants = participants.map(p => {
      if (p.id === participantId) {
        const newApprovalState = !p.hasApproved
        
        // Add log entry
        if (newApprovalState) {
          addLogEntry(`${p.name} has signed the approval for release`)
        } else {
          addLogEntry(`${p.name} has revoked their signature`)
        }
        
        return { ...p, hasApproved: newApprovalState }
      }
      return p
    })
    
    setParticipants(updatedParticipants)
    
    // Calculate new obtained signatures
    const newObtainedSignatures = updatedParticipants.filter(p => p.hasApproved).length
    
    setReserveState(prev => ({
      ...prev,
      obtainedSignatures: newObtainedSignatures,
      releaseStatus: newObtainedSignatures >= prev.requiredSignatures ? 'pending' : 'locked'
    }))
  }
  
  // Start time lock countdown
  const startTimelock = () => {
    if (reserveState.releaseStatus !== 'pending') return
    
    setTimeConstraint(prev => ({
      ...prev,
      isActive: true
    }))
    
    addLogEntry(`Time-lock countdown started: ${timeConstraint.lockPeriod} days until release`)
    setShowSuccessMessage(true)
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 5000)
  }
  
  // Decrement time remaining for demo purposes
  const decrementTime = () => {
    if (!timeConstraint.isActive || timeConstraint.remainingTime <= 0) return
    
    setTimeConstraint(prev => {
      // Decrease by 10 years for demo purposes (converted to days)
      const yearsToDecrement = 10;
      const daysToDecrement = yearsToDecrement * 365;
      const newTime = prev.remainingTime - daysToDecrement;
      
      if (newTime <= 0) {
        addLogEntry("Time-lock period has ended, funds are now available for release")
        setReserveState(prev => ({
          ...prev,
          releaseStatus: 'released',
          lockedAmount: 0
        }))
        return { ...prev, remainingTime: 0, isActive: false }
      }
      
      addLogEntry(`Fast-forward: ${yearsToDecrement} years have passed, ${Math.ceil(newTime / 365)} years remaining`)
      return { ...prev, remainingTime: newTime }
    })
  }
  
  // Reset the demo
  const resetDemo = () => {
    setShowSetup(true)
    setBtcToLock(200000)
    setPolicyDetails({
      multisigOption: '2-of-3',
      timeLockYears: 4,
      useTaproot: true
    })
    setParticipants(participants.map(p => ({ ...p, hasApproved: false })))
    setTimeConstraint({
      lockPeriod: 90,
      remainingTime: 90,
      isActive: false
    })
    setReserveState({
      totalAmount: 10000,
      lockedAmount: 10000,
      releaseStatus: 'locked',
      requiredSignatures: 2,
      obtainedSignatures: 0
    })
    setLogs([
      "Demo reset - Strategic Bitcoin Reserve demo ready for initialization"
    ])
  }
  
  // Add a log entry
  const addLogEntry = (entry: string) => {
    setLogs(prev => [...prev, entry])
  }
  
  // Toggle policy option selection
  const togglePolicyOption = (option: string) => {
    if (activePolicyOption === option) {
      setActivePolicyOption(null)
    } else {
      setActivePolicyOption(option)
      addLogEntry(`Examining policy: ${option}`)
    }
  }
  
  // UI helper for status badge
  const getStatusBadge = () => {
    switch (reserveState.releaseStatus) {
      case 'locked':
        return <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">Locked</span>
      case 'pending':
        return <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm">Pending Release</span>
      case 'released':
        return <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">Released</span>
    }
  }
  
  // Setup screen component
  const SetupScreen = () => {
    return (
      <div className="w-full max-w-6xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-xl">
        <div className="bg-gray-700 p-6 border-b border-gray-600">
          <h2 className="text-2xl font-bold text-orange-500">Initialize Strategic Bitcoin Reserve</h2>
          <p className="text-gray-300">Configure your Bitcoin reserve policy settings</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Reserve amount section */}
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Bitcoin Amount</h3>
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">
                  Amount of BTC to lock in reserve:
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1000"
                    max="1000000"
                    step="1000"
                    value={btcToLock}
                    onChange={(e) => setBtcToLock(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="font-mono text-white font-bold min-w-[150px] text-right">
                    {btcToLock.toLocaleString()} BTC
                  </span>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>1,000 BTC</span>
                  <span>1,000,000 BTC</span>
                </div>
              </div>
            </div>
            
            {/* Policy settings section */}
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Policy Settings</h3>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">
                  Multi-signature Policy:
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    className={`p-3 text-left rounded-lg ${policyDetails.multisigOption === '2-of-3' ? 'bg-orange-500 text-white' : 'bg-gray-600 text-gray-300'}`}
                    onClick={() => setPolicyDetails({...policyDetails, multisigOption: '2-of-3'})}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">2-of-3 Multi-sig</span>
                      {policyDetails.multisigOption === '2-of-3' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm opacity-80">Requires 2 of 3 government branches</p>
                  </button>
                  
                  <button
                    className={`p-3 text-left rounded-lg ${policyDetails.multisigOption === '3-of-5' ? 'bg-orange-500 text-white' : 'bg-gray-600 text-gray-300'}`}
                    onClick={() => setPolicyDetails({...policyDetails, multisigOption: '3-of-5'})}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">3-of-5 Multi-sig</span>
                      {policyDetails.multisigOption === '3-of-5' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm opacity-80">Requires 3 of 5 key officials</p>
                  </button>
                  
                  <button
                    className={`p-3 text-left rounded-lg ${policyDetails.multisigOption === '171M-of-340M' ? 'bg-orange-500 text-white' : 'bg-gray-600 text-gray-300'}`}
                    onClick={() => setPolicyDetails({...policyDetails, multisigOption: '171M-of-340M'})}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">171M-of-340M</span>
                      {policyDetails.multisigOption === '171M-of-340M' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm opacity-80">Citizen vote (majority of US pop.)</p>
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">
                  Time Lock (years):
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={policyDetails.timeLockYears}
                    onChange={(e) => setPolicyDetails({...policyDetails, timeLockYears: parseInt(e.target.value)})}
                    className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="font-mono text-white font-bold min-w-[80px] text-right">
                    {policyDetails.timeLockYears} years
                  </span>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>1 year</span>
                  <span>100 years</span>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={policyDetails.useTaproot}
                    onChange={() => setPolicyDetails({...policyDetails, useTaproot: !policyDetails.useTaproot})}
                    className="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-gray-300">Use Taproot for enhanced privacy and efficiency</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={initializeReserve}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
            >
              Initialize Bitcoin Reserve
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return showSetup ? <SetupScreen /> : (
    <div className="w-full max-w-6xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-xl">
      {/* Header with status overview */}
      <div className="bg-gray-700 p-6 border-b border-gray-600">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-orange-500">Strategic Bitcoin Reserve</h2>
            <p className="text-gray-300">Secured with {policyDetails.useTaproot ? 'Taproot' : 'Standard'} and Miniscript</p>
          </div>
          
          <div className="flex flex-col items-end mt-4 md:mt-0">
            <div className="flex items-center space-x-3">
              <span className="text-gray-300">Status:</span>
              {getStatusBadge()}
            </div>
            <div className="text-right mt-2">
              <span className="text-xl font-bold">{reserveState.lockedAmount.toLocaleString()} BTC</span>
              <span className="text-gray-400 ml-2">of {reserveState.totalAmount.toLocaleString()} BTC</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Left column: Participants */}
        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-white">Policy Participants</h3>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="mb-3 pb-3 border-b border-gray-600">
              <p className="text-gray-300 mb-2">Required signatures: {reserveState.requiredSignatures} of {participants.length}</p>
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div 
                  className={`rounded-full h-2.5 ${reserveState.obtainedSignatures >= reserveState.requiredSignatures ? 'bg-green-500' : 'bg-orange-500'}`}
                  style={{ width: `${(reserveState.obtainedSignatures / participants.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-3">
              {participants.map(participant => (
                <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-white">{participant.name}</p>
                    <p className="text-sm text-gray-400 capitalize">{participant.role}</p>
                  </div>
                  <button
                    onClick={() => toggleApproval(participant.id)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      participant.hasApproved 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-600 text-gray-300'
                    }`}
                  >
                    {participant.hasApproved ? 'Approved' : 'Approve'}
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Time lock controls */}
          <div className="mt-6 bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-white">Time Lock</h3>
            
            {timeConstraint.isActive ? (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Remaining time:</span>
                  <span className="font-medium text-orange-500">{Math.ceil(timeConstraint.remainingTime / 365)} years</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2.5 mb-4">
                  <div 
                    className="bg-orange-500 rounded-full h-2.5"
                    style={{ width: `${(timeConstraint.remainingTime / timeConstraint.lockPeriod) * 100}%` }}
                  ></div>
                </div>
                <button
                  onClick={decrementTime}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                  disabled={!timeConstraint.isActive || timeConstraint.remainingTime <= 0}
                >
                  Fast-forward 10 Years
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-300 mb-3">
                  Time lock requirement: {Math.floor(timeConstraint.lockPeriod / 365)} years waiting period after approval
                </p>
                <button
                  onClick={startTimelock}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                  disabled={reserveState.releaseStatus !== 'pending'}
                >
                  Start Time Lock
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Middle column: Visual representation */}
        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-white">Policy Visualization</h3>
          
          <div className="bg-gray-700 rounded-lg p-4 h-[500px] flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              {policyDetails.multisigOption === '171M-of-340M' ? (
                // Special visualization for the 171M-of-340M option
                <div className="relative w-64 h-64">
                  <div 
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full flex items-center justify-center 
                    ${participants[0].hasApproved ? 'bg-green-500' : 'bg-gray-600'} transition-colors cursor-pointer`} 
                    onClick={() => toggleApproval('1')}
                  >
                    <div className="text-center">
                      <span className="text-white text-lg font-bold">U.S. Citizens</span>
                      <p className="text-white text-xs mt-1">171M of 340M</p>
                    </div>
                  </div>
                  
                  {/* Central lock */}
                  <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full 
                    flex items-center justify-center border-4 
                    ${
                      reserveState.releaseStatus === 'locked' ? 'border-red-500 bg-gray-800' : 
                      reserveState.releaseStatus === 'pending' ? 'border-yellow-500 bg-gray-800' :
                      'border-green-500 bg-gray-800'
                    }`}
                  >
                    <div className="text-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-8 w-8 mx-auto ${
                          reserveState.releaseStatus === 'locked' ? 'text-red-500' : 
                          reserveState.releaseStatus === 'pending' ? 'text-yellow-500' :
                          'text-green-500'
                        }`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        {reserveState.releaseStatus === 'released' ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        )}
                      </svg>
                      <span className="text-xs font-medium text-white">{reserveState.releaseStatus === 'released' ? 'OPEN' : 'LOCKED'}</span>
                    </div>
                  </div>
                </div>
              ) : policyDetails.multisigOption === '3-of-5' ? (
                // Visualization for the 3-of-5 option
                <div className="relative w-64 h-64">
                  {/* Treasury node */}
                  <div 
                    className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center 
                    ${participants[0].hasApproved ? 'bg-green-500' : 'bg-gray-600'} transition-colors cursor-pointer`} 
                    onClick={() => toggleApproval('1')}
                  >
                    <span className="text-white text-xs font-bold">Treasury</span>
                  </div>
                  
                  {/* Congress node */}
                  <div 
                    className={`absolute top-1/4 left-0 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center 
                    ${participants[1].hasApproved ? 'bg-green-500' : 'bg-gray-600'} transition-colors cursor-pointer`}
                    onClick={() => toggleApproval('2')}
                  >
                    <span className="text-white text-xs font-bold">Congress</span>
                  </div>
                  
                  {/* Judiciary node */}
                  <div 
                    className={`absolute top-1/4 right-0 transform translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center 
                    ${participants[2].hasApproved ? 'bg-green-500' : 'bg-gray-600'} transition-colors cursor-pointer`}
                    onClick={() => toggleApproval('3')}
                  >
                    <span className="text-white text-xs font-bold">Judiciary</span>
                  </div>
                  
                  {/* Fed Reserve node */}
                  <div 
                    className={`absolute bottom-0 left-1/4 w-16 h-16 rounded-full flex items-center justify-center 
                    ${participants[3].hasApproved ? 'bg-green-500' : 'bg-gray-600'} transition-colors cursor-pointer`}
                    onClick={() => toggleApproval('4')}
                  >
                    <span className="text-white text-xs font-bold">Fed Chair</span>
                  </div>
                  
                  {/* Senate node */}
                  <div 
                    className={`absolute bottom-0 right-1/4 w-16 h-16 rounded-full flex items-center justify-center 
                    ${participants[4].hasApproved ? 'bg-green-500' : 'bg-gray-600'} transition-colors cursor-pointer`}
                    onClick={() => toggleApproval('5')}
                  >
                    <span className="text-white text-xs font-bold">Senate</span>
                  </div>
                  
                  {/* Central lock */}
                  <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full 
                    flex items-center justify-center border-4 
                    ${
                      reserveState.releaseStatus === 'locked' ? 'border-red-500 bg-gray-800' : 
                      reserveState.releaseStatus === 'pending' ? 'border-yellow-500 bg-gray-800' :
                      'border-green-500 bg-gray-800'
                    }`}
                  >
                    <div className="text-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-8 w-8 mx-auto ${
                          reserveState.releaseStatus === 'locked' ? 'text-red-500' : 
                          reserveState.releaseStatus === 'pending' ? 'text-yellow-500' :
                          'text-green-500'
                        }`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        {reserveState.releaseStatus === 'released' ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        )}
                      </svg>
                      <span className="text-xs font-medium text-white">{reserveState.releaseStatus === 'released' ? 'OPEN' : 'LOCKED'}</span>
                    </div>
                  </div>
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {/* Treasury to Congress line */}
                    <line 
                      x1="32" y1="64" 
                      x2="128" y2="32" 
                      stroke={participants[0].hasApproved && participants[1].hasApproved ? "#10B981" : "#4B5563"} 
                      strokeWidth="2"
                    />
                    
                    {/* Treasury to Judiciary line */}
                    <line 
                      x1="232" y1="64" 
                      x2="128" y2="32" 
                      stroke={participants[0].hasApproved && participants[2].hasApproved ? "#10B981" : "#4B5563"} 
                      strokeWidth="2"
                    />
                    
                    {/* Congress to Judiciary line */}
                    <line 
                      x1="32" y1="64" 
                      x2="232" y2="64" 
                      stroke={participants[1].hasApproved && participants[2].hasApproved ? "#10B981" : "#4B5563"} 
                      strokeWidth="2"
                    />
                    
                    {/* Fed to Senate line */}
                    <line 
                      x1="64" y1="200" 
                      x2="200" y2="200" 
                      stroke={participants[3].hasApproved && participants[4].hasApproved ? "#10B981" : "#4B5563"} 
                      strokeWidth="2"
                    />
                    
                    {/* Congress to Fed line */}
                    <line 
                      x1="32" y1="64" 
                      x2="64" y2="200" 
                      stroke={participants[1].hasApproved && participants[3].hasApproved ? "#10B981" : "#4B5563"} 
                      strokeWidth="2"
                    />
                    
                    {/* Judiciary to Senate line */}
                    <line 
                      x1="232" y1="64" 
                      x2="200" y2="200" 
                      stroke={participants[2].hasApproved && participants[4].hasApproved ? "#10B981" : "#4B5563"} 
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              ) : (
                // Original 2-of-3 visualization
                <div className="relative w-64 h-64">
                  {/* Treasury node */}
                  <div 
                    className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center 
                    ${participants[0].hasApproved ? 'bg-green-500' : 'bg-gray-600'} transition-colors cursor-pointer`} 
                    onClick={() => toggleApproval('1')}
                  >
                    <span className="text-white text-xs font-bold">Treasury</span>
                  </div>
                  
                  {/* Congress node */}
                  <div 
                    className={`absolute bottom-0 left-0 w-16 h-16 rounded-full flex items-center justify-center 
                    ${participants[1].hasApproved ? 'bg-green-500' : 'bg-gray-600'} transition-colors cursor-pointer`}
                    onClick={() => toggleApproval('2')}
                  >
                    <span className="text-white text-xs font-bold">Congress</span>
                  </div>
                  
                  {/* Judiciary node */}
                  <div 
                    className={`absolute bottom-0 right-0 w-16 h-16 rounded-full flex items-center justify-center 
                    ${participants[2].hasApproved ? 'bg-green-500' : 'bg-gray-600'} transition-colors cursor-pointer`}
                    onClick={() => toggleApproval('3')}
                  >
                    <span className="text-white text-xs font-bold">Judiciary</span>
                  </div>
                  
                  {/* Central lock */}
                  <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full 
                    flex items-center justify-center border-4 
                    ${
                      reserveState.releaseStatus === 'locked' ? 'border-red-500 bg-gray-800' : 
                      reserveState.releaseStatus === 'pending' ? 'border-yellow-500 bg-gray-800' :
                      'border-green-500 bg-gray-800'
                    }`}
                  >
                    <div className="text-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-8 w-8 mx-auto ${
                          reserveState.releaseStatus === 'locked' ? 'text-red-500' : 
                          reserveState.releaseStatus === 'pending' ? 'text-yellow-500' :
                          'text-green-500'
                        }`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        {reserveState.releaseStatus === 'released' ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        )}
                      </svg>
                      <span className="text-xs font-medium text-white">{reserveState.releaseStatus === 'released' ? 'OPEN' : 'LOCKED'}</span>
                    </div>
                  </div>
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {/* Treasury to Congress line */}
                    <line 
                      x1="32" y1="200" 
                      x2="128" y2="32" 
                      stroke={participants[0].hasApproved && participants[1].hasApproved ? "#10B981" : "#4B5563"} 
                      strokeWidth="2"
                    />
                    
                    {/* Treasury to Judiciary line */}
                    <line 
                      x1="232" y1="200" 
                      x2="128" y2="32" 
                      stroke={participants[0].hasApproved && participants[2].hasApproved ? "#10B981" : "#4B5563"} 
                      strokeWidth="2"
                    />
                    
                    {/* Congress to Judiciary line */}
                    <line 
                      x1="32" y1="200" 
                      x2="232" y2="200" 
                      stroke={participants[1].hasApproved && participants[2].hasApproved ? "#10B981" : "#4B5563"} 
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Policy explanation */}
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-300">
                {policyDetails.multisigOption === '2-of-3' && 
                  'This visualization shows a 2-of-3 multisignature Taproot policy. Click on the nodes to toggle approval status. When any 2 participants approve, the time lock countdown can begin.'
                }
                {policyDetails.multisigOption === '3-of-5' && 
                  'This visualization shows a 3-of-5 multisignature Taproot policy. Click on the nodes to toggle approval status. When any 3 participants approve, the time lock countdown can begin.'
                }
                {policyDetails.multisigOption === '171M-of-340M' && 
                  'This visualization represents a majority citizen vote requirement. When the majority approves, the time lock countdown can begin.'
                }
              </p>
            </div>
          </div>
        </div>
        
        {/* Right column: Activity log */}
        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-white">Activity Log</h3>
          
          <div className="bg-gray-700 rounded-lg p-4 h-[500px] flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 font-mono text-sm">
              {logs.map((log, index) => (
                <div key={index} className="py-1 border-b border-gray-600">
                  <span className="text-gray-400">[{new Date().toLocaleTimeString()}]</span> 
                  <span className="ml-2 text-gray-200">{log}</span>
                </div>
              ))}
            </div>
            
            {/* Success message */}
            {showSuccessMessage && (
              <div className="mb-4 p-3 bg-green-800/30 border border-green-500 rounded-lg">
                <p className="text-green-300 text-sm">
                  Time-lock successfully initiated! The funds will be available after the lock period ends.
                </p>
              </div>
            )}
            
            {/* Demo controls */}
            <div className="mt-auto">
              <button
                onClick={resetDemo}
                className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 rounded-lg transition-colors"
              >
                Reset Demo
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer with policy details */}
      <div className="bg-gray-700 p-6 border-t border-gray-600">
        <h3 className="text-lg font-semibold mb-3 text-white">Policy Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => togglePolicyOption('multisig')}
            className={`p-3 rounded-lg text-left transition-colors ${
              activePolicyOption === 'multisig' ? 'bg-orange-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            <h4 className="font-medium">Multisignature</h4>
            <p className="text-sm opacity-80">{
              policyDetails.multisigOption === '2-of-3' ? '2-of-3 required signers' :
              policyDetails.multisigOption === '3-of-5' ? '3-of-5 required signers' :
              '171M-of-340M required signers'
            }</p>
          </button>
          
          <button
            onClick={() => togglePolicyOption('timelock')}
            className={`p-3 rounded-lg text-left transition-colors ${
              activePolicyOption === 'timelock' ? 'bg-orange-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            <h4 className="font-medium">Timelock</h4>
            <p className="text-sm opacity-80">{policyDetails.timeLockYears}-year delay after approval</p>
          </button>
          
          <button
            onClick={() => togglePolicyOption('taproot')}
            className={`p-3 rounded-lg text-left transition-colors ${
              activePolicyOption === 'taproot' ? 'bg-orange-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            <h4 className="font-medium">Taproot</h4>
            <p className="text-sm opacity-80">{policyDetails.useTaproot ? 'Enabled' : 'Disabled'}</p>
          </button>
        </div>
        
        {activePolicyOption && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            {activePolicyOption === 'multisig' && (
              <div>
                <h4 className="font-semibold text-white mb-2">Multisignature Policy</h4>
                <p className="text-gray-300 text-sm">
                  {policyDetails.multisigOption === '2-of-3' ? 
                    'A 2-of-3 multisignature policy requires at least 2 out of the 3 designated authorities to sign off before funds can be released. This prevents a single entity from having complete control over the reserve.' :
                   policyDetails.multisigOption === '3-of-5' ?
                    'A 3-of-5 multisignature policy requires at least 3 out of the 5 designated authorities to sign off before funds can be released. This provides additional security by involving more stakeholders in the decision process.' :
                    'A 171M-of-340M multisignature policy requires a majority of U.S. citizens to approve the release of funds. This represents a direct democratic approach to managing the Bitcoin reserve.'
                  }
                </p>
                <div className="mt-3 p-2 bg-gray-700 rounded font-mono text-xs text-gray-300 overflow-x-auto">
                  <code>
                    {policyDetails.multisigOption === '2-of-3' ? 
                      'thresh(2,pk(treasury_key),pk(congress_key),pk(judiciary_key))' :
                     policyDetails.multisigOption === '3-of-5' ?
                      'thresh(3,pk(treasury_key),pk(congress_key),pk(judiciary_key),pk(fed_reserve_key),pk(senate_key))' :
                      'thresh(171000000,pk(citizen_1),...,pk(citizen_340000000))'
                    }
                  </code>
                </div>
              </div>
            )}
            
            {activePolicyOption === 'timelock' && (
              <div>
                <h4 className="font-semibold text-white mb-2">Timelock Constraints</h4>
                <p className="text-gray-300 text-sm">
                  Even after the required signatures are collected, a {policyDetails.timeLockYears}-year waiting period must pass before the funds 
                  can be accessed. This provides transparency and time for public debate on the planned use of reserves.
                </p>
                <div className="mt-3 p-2 bg-gray-700 rounded font-mono text-xs text-gray-300 overflow-x-auto">
                  <code>
                    and({
                      policyDetails.multisigOption === '2-of-3' ? 
                        'thresh(2,pk(treasury_key),pk(congress_key),pk(judiciary_key))' :
                      policyDetails.multisigOption === '3-of-5' ?
                        'thresh(3,pk(treasury_key),pk(congress_key),pk(judiciary_key),pk(fed_reserve_key),pk(senate_key))' :
                        'thresh(171000000,pk(citizen_1),...,pk(citizen_340000000))'
                    },after({policyDetails.timeLockYears} years))
                  </code>
                </div>
              </div>
            )}
            
            {activePolicyOption === 'taproot' && (
              <div>
                <h4 className="font-semibold text-white mb-2">Taproot {policyDetails.useTaproot ? 'Benefits' : 'Disabled'}</h4>
                {policyDetails.useTaproot ? (
                  <p className="text-gray-300 text-sm">
                    Taproot improves privacy and efficiency by allowing complex scripts to be hidden when all parties agree.
                    It also enables more flexible policies through Miniscript, making it easier to express complex conditions
                    while ensuring they can be efficiently verified.
                  </p>
                ) : (
                  <p className="text-gray-300 text-sm">
                    Taproot is currently disabled in this configuration. Enabling Taproot would provide enhanced privacy
                    and efficiency for the multisignature policy, allowing complex spending conditions to be hidden when all
                    parties agree to a transaction.
                  </p>
                )}
                {policyDetails.useTaproot && (
                  <div className="mt-3 p-2 bg-gray-700 rounded font-mono text-xs text-gray-300 overflow-x-auto">
                    <code>
                      tr(internal_key, {`{${
                        policyDetails.multisigOption === '2-of-3' ? 
                          'thresh(2,pk(treasury_key),pk(congress_key),pk(judiciary_key))' :
                        policyDetails.multisigOption === '3-of-5' ?
                          'thresh(3,pk(treasury_key),pk(congress_key),pk(judiciary_key),pk(fed_reserve_key),pk(senate_key))' :
                          'thresh(171000000,pk(citizen_1),...,pk(citizen_340000000))'
                      },after(${policyDetails.timeLockYears} years)}`})
                    </code>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SBRDemo 