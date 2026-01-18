import React, { useState, useEffect } from 'react';

// Nautical Bowls CSR App - SEA Strategic Plan Implementation
// Features: Nauti Points, Cause Voting, Donation Goals, Impact Tracking

const NauticalBowlsApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState({
    name: 'Paul',
    nautiPoints: 134,
    personalContribution: 120,
    bowlsPurchased: 27,
    mealsGiven: 27,
    eventsAttended: 3,
    co2Saved: 12.4,
    plasticReduced: 2.1
  });
  const [selectedCause, setSelectedCause] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [animatePoints, setAnimatePoints] = useState(false);

  const franchiseGoal = { current: 6700, target: 10000, location: 'Plymouth' };
  
  const causes = [
    { id: 1, name: 'Pride of the Prairie', description: 'Supporting local Minnesota farms', icon: '🌾', votes: 234, color: '#F59E0B' },
    { id: 2, name: 'Urban Growth', description: 'Community gardens in Twin Cities', icon: '🌱', votes: 189, color: '#10B981' },
    { id: 3, name: 'Feed My Starving Children', description: 'Meals for children in need', icon: '🍽️', votes: 312, color: '#EF4444' },
    { id: 4, name: 'Team Seas', description: 'Ocean cleanup initiative', icon: '🌊', votes: 267, color: '#0EA5E9' },
    { id: 5, name: 'Local Schools Fund', description: 'Education resources for MN schools', icon: '📚', votes: 156, color: '#8B5CF6' },
    { id: 6, name: 'Clean Air Minnesota', description: 'Environmental protection efforts', icon: '💨', votes: 198, color: '#06B6D4' }
  ];

  const rewards = [
    { id: 1, name: '$2 Off Bowl', points: 50, icon: '🥣', available: true },
    { id: 2, name: 'Free Smoothie', points: 100, icon: '🥤', available: true },
    { id: 3, name: 'Nautical Sticker Pack', points: 75, icon: '⚓', available: true },
    { id: 4, name: 'Free Bowl', points: 200, icon: '🎉', available: true },
    { id: 5, name: 'Reusable Bowl', points: 300, icon: '♻️', available: false },
    { id: 6, name: 'VIP Event Access', points: 500, icon: '⭐', available: false }
  ];

  const recentActivity = [
    { type: 'purchase', desc: 'Açaí Classic Bowl', points: 5, time: '2 hours ago' },
    { type: 'donation', desc: 'Donated $10 to Team Seas', points: 10, time: 'Yesterday' },
    { type: 'event', desc: 'Attended Beach Cleanup', points: 25, time: '3 days ago' },
    { type: 'purchase', desc: 'Pitaya Paradise Bowl', points: 5, time: '5 days ago' },
    { type: 'byob', desc: 'Brought Your Own Bowl!', points: 10, time: '1 week ago' }
  ];

  const handleVote = (causeId) => {
    setSelectedCause(causeId);
  };

  const submitVote = () => {
    if (selectedCause) {
      setHasVoted(true);
      setAnimatePoints(true);
      setUser(prev => ({ ...prev, nautiPoints: prev.nautiPoints + 5 }));
      setTimeout(() => setAnimatePoints(false), 1000);
    }
  };

  const redeemReward = (reward) => {
    if (user.nautiPoints >= reward.points && reward.available) {
      setSelectedReward(reward);
      setShowRewardModal(true);
    }
  };

  const confirmRedeem = () => {
    setUser(prev => ({ ...prev, nautiPoints: prev.nautiPoints - selectedReward.points }));
    setShowRewardModal(false);
    setSelectedReward(null);
  };

  // Wave animation component
  const WaveBackground = () => (
    <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-20 pointer-events-none">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
        <path d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z" fill="#0891B2" className="animate-pulse" />
      </svg>
    </div>
  );

  // Progress Ring Component
  const ProgressRing = ({ progress, size = 120, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;
    
    return (
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0891B2" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  // Home Tab
  const HomeTab = () => (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-600 via-cyan-700 to-teal-800 rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <p className="text-cyan-100 text-sm font-medium">Good afternoon!</p>
          <h1 className="text-2xl font-bold mt-1">Welcome back, {user.name} 👋</h1>
          
          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-cyan-200 text-xs uppercase tracking-wider">Your Nauti Points</p>
              <p className={`text-4xl font-black mt-1 ${animatePoints ? 'scale-110 text-yellow-300' : ''}`} style={{ transition: 'all 0.3s' }}>
                {user.nautiPoints}
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-center">
              <p className="text-xs text-cyan-100">Personal Contribution</p>
              <p className="text-2xl font-bold text-emerald-300">${user.personalContribution}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Franchise Goal Progress */}
      <div className="bg-white rounded-3xl p-6 shadow-lg shadow-cyan-500/10 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-gray-800">{franchiseGoal.location} Monthly Goal</h2>
            <p className="text-sm text-gray-500">Help us reach our donation target!</p>
          </div>
          <span className="text-xs bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full font-semibold">
            {Math.round((franchiseGoal.current / franchiseGoal.target) * 100)}%
          </span>
        </div>
        
        <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full transition-all duration-1000"
            style={{ width: `${(franchiseGoal.current / franchiseGoal.target) * 100}%` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
        </div>
        
        <div className="flex justify-between mt-3 text-sm">
          <span className="font-bold text-cyan-600">${franchiseGoal.current.toLocaleString()}</span>
          <span className="text-gray-400">${franchiseGoal.target.toLocaleString()}</span>
        </div>

        <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
          <p className="text-sm text-amber-800">
            🎯 <strong>Goal Reward:</strong> All contributors get 50 bonus Nauti Points when we hit our target!
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl mb-3">
            🍽️
          </div>
          <p className="text-2xl font-black text-emerald-700">{user.mealsGiven}</p>
          <p className="text-sm text-emerald-600">Meals Given via Venture</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-100">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl mb-3">
            🌍
          </div>
          <p className="text-2xl font-black text-blue-700">{user.co2Saved} kg</p>
          <p className="text-sm text-blue-600">CO₂ Saved</p>
        </div>
      </div>

      {/* Vote CTA */}
      {!hasVoted && (
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 text-8xl opacity-20">🗳️</div>
          <h3 className="font-bold text-lg">Vote for January's Cause!</h3>
          <p className="text-violet-100 text-sm mt-1">Choose where your impact goes this month</p>
          <button 
            onClick={() => setActiveTab('vote')}
            className="mt-4 bg-white text-violet-600 font-bold py-2 px-6 rounded-xl hover:bg-violet-50 transition-all"
          >
            Vote Now (+5 points)
          </button>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl p-6 shadow-lg shadow-cyan-500/10 border border-gray-100">
        <h2 className="font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.slice(0, 4).map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg
                  ${activity.type === 'purchase' ? 'bg-cyan-100' : ''}
                  ${activity.type === 'donation' ? 'bg-emerald-100' : ''}
                  ${activity.type === 'event' ? 'bg-violet-100' : ''}
                  ${activity.type === 'byob' ? 'bg-amber-100' : ''}
                `}>
                  {activity.type === 'purchase' && '🥣'}
                  {activity.type === 'donation' && '💝'}
                  {activity.type === 'event' && '🎉'}
                  {activity.type === 'byob' && '♻️'}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{activity.desc}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
              <span className="text-emerald-500 font-bold text-sm">+{activity.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Rewards Tab
  const RewardsTab = () => (
    <div className="space-y-6 pb-24">
      {/* Points Header */}
      <div className="bg-gradient-to-br from-cyan-600 to-teal-700 rounded-3xl p-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 text-6xl">⚓</div>
          <div className="absolute bottom-4 right-4 text-6xl">🌊</div>
        </div>
        <p className="text-cyan-100 text-sm">Available Nauti Points</p>
        <p className="text-5xl font-black mt-2">{user.nautiPoints}</p>
        <p className="text-cyan-200 text-sm mt-2">Keep earning to unlock more rewards!</p>
      </div>

      {/* How to Earn */}
      <div className="bg-white rounded-3xl p-6 shadow-lg shadow-cyan-500/10 border border-gray-100">
        <h2 className="font-bold text-gray-800 mb-4">How to Earn Points</h2>
        <div className="space-y-3">
          {[
            { action: 'Purchase a bowl', points: 5, icon: '🥣' },
            { action: 'Donate $1', points: 1, icon: '💝' },
            { action: 'Attend community event', points: 25, icon: '🎉' },
            { action: 'Bring your own bowl (Fridays)', points: 10, icon: '♻️' },
            { action: 'Vote for monthly cause', points: 5, icon: '🗳️' },
            { action: 'Refer a friend', points: 50, icon: '👥' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm text-gray-700">{item.action}</span>
              </div>
              <span className="text-cyan-600 font-bold text-sm">+{item.points} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Available Rewards */}
      <div>
        <h2 className="font-bold text-gray-800 mb-4 px-1">Redeem Rewards</h2>
        <div className="grid grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <button
              key={reward.id}
              onClick={() => redeemReward(reward)}
              disabled={user.nautiPoints < reward.points || !reward.available}
              className={`p-5 rounded-2xl text-left transition-all border-2 ${
                user.nautiPoints >= reward.points && reward.available
                  ? 'bg-white border-cyan-200 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95'
                  : 'bg-gray-50 border-gray-100 opacity-60'
              }`}
            >
              <span className="text-3xl">{reward.icon}</span>
              <p className="font-bold text-gray-800 mt-2 text-sm">{reward.name}</p>
              <div className="flex items-center gap-1 mt-2">
                <span className={`font-bold text-sm ${user.nautiPoints >= reward.points ? 'text-cyan-600' : 'text-gray-400'}`}>
                  {reward.points} pts
                </span>
                {!reward.available && (
                  <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full ml-1">Soon</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Vote Tab
  const VoteTab = () => (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="text-center">
        <span className="text-5xl">🗳️</span>
        <h1 className="text-2xl font-bold text-gray-800 mt-3">January Cause Voting</h1>
        <p className="text-gray-500 mt-1">Select where your purchases make an impact</p>
      </div>

      {hasVoted ? (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 text-center border border-emerald-200">
          <span className="text-6xl">✅</span>
          <h2 className="text-xl font-bold text-emerald-700 mt-4">Thanks for Voting!</h2>
          <p className="text-emerald-600 mt-2">You earned 5 Nauti Points</p>
          <p className="text-gray-500 text-sm mt-4">Results will be announced February 1st</p>
          
          <div className="mt-6 pt-6 border-t border-emerald-200">
            <h3 className="font-bold text-gray-700 mb-4">Current Standings</h3>
            <div className="space-y-3">
              {causes.sort((a, b) => b.votes - a.votes).slice(0, 3).map((cause, idx) => (
                <div key={cause.id} className="flex items-center justify-between bg-white rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      idx === 0 ? 'bg-amber-400' : idx === 1 ? 'bg-gray-400' : 'bg-amber-600'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="text-xl">{cause.icon}</span>
                    <span className="font-medium text-gray-700">{cause.name}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{cause.votes} votes</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Causes Grid */}
          <div className="space-y-3">
            {causes.map((cause) => (
              <button
                key={cause.id}
                onClick={() => handleVote(cause.id)}
                className={`w-full p-4 rounded-2xl text-left transition-all border-2 ${
                  selectedCause === cause.id
                    ? 'border-cyan-500 bg-cyan-50 shadow-lg shadow-cyan-500/20'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${cause.color}20` }}
                  >
                    {cause.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{cause.name}</h3>
                    <p className="text-sm text-gray-500">{cause.description}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedCause === cause.id ? 'border-cyan-500 bg-cyan-500' : 'border-gray-300'
                  }`}>
                    {selectedCause === cause.id && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Submit Vote */}
          <button
            onClick={submitVote}
            disabled={!selectedCause}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
              selectedCause
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:shadow-lg hover:shadow-cyan-500/30 active:scale-98'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Submit Vote (+5 pts)
          </button>
        </>
      )}
    </div>
  );

  // Impact Tab
  const ImpactTab = () => (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Your Impact</h1>
        <p className="text-gray-500 mt-1">See the difference you're making</p>
      </div>

      {/* Impact Ring */}
      <div className="bg-white rounded-3xl p-8 shadow-lg shadow-cyan-500/10 border border-gray-100 flex flex-col items-center">
        <div className="relative">
          <ProgressRing progress={68} size={160} strokeWidth={12} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-cyan-600">{user.bowlsPurchased}</span>
            <span className="text-sm text-gray-500">Bowls</span>
          </div>
        </div>
        <p className="mt-4 text-gray-600 text-center">
          Every bowl feeds a child through our <strong className="text-cyan-600">Venture</strong> partnership
        </p>
      </div>

      {/* Venture Partnership */}
      <div className="bg-gradient-to-r from-rose-500 to-orange-500 rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute right-4 top-4 opacity-20 text-6xl">🌏</div>
        <h3 className="font-bold text-lg">Buy a Bowl, Give a Meal</h3>
        <p className="text-rose-100 text-sm mt-1">Partnered with Feed My Starving Children</p>
        <div className="mt-4 flex items-end gap-2">
          <span className="text-4xl font-black">{user.mealsGiven}</span>
          <span className="text-rose-200 pb-1">meals donated to Southeast Asia</span>
        </div>
        <div className="mt-4 p-3 bg-white/20 rounded-xl">
          <p className="text-sm">
            🎯 Nautical Bowls has delivered <strong>75 million meals</strong> through Venture!
          </p>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-white rounded-3xl p-6 shadow-lg shadow-cyan-500/10 border border-gray-100">
        <h2 className="font-bold text-gray-800 mb-4">🌱 Environmental Impact</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-emerald-600">{user.co2Saved}</p>
            <p className="text-sm text-emerald-700">kg CO₂ Saved</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-blue-600">{user.plasticReduced}</p>
            <p className="text-sm text-blue-700">kg Plastic Reduced</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
          <p className="text-sm text-amber-800">
            🌿 <strong>Tip:</strong> Bring your own bowl on Fridays for 10% off and earn 10 Nauti Points!
          </p>
        </div>
      </div>

      {/* Community Events */}
      <div className="bg-white rounded-3xl p-6 shadow-lg shadow-cyan-500/10 border border-gray-100">
        <h2 className="font-bold text-gray-800 mb-4">🎉 Community Events Attended</h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center text-3xl font-black text-violet-600">
            {user.eventsAttended}
          </div>
          <div>
            <p className="font-medium text-gray-700">Events This Year</p>
            <p className="text-sm text-gray-500">Next: Beach Cleanup - Jan 25</p>
          </div>
        </div>
      </div>

      {/* Share Impact */}
      <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
        📤 Share My Impact
      </button>
    </div>
  );

  // Profile Tab
  const ProfileTab = () => (
    <div className="space-y-6 pb-24">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 shadow-lg shadow-cyan-500/10 border border-gray-100 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full mx-auto flex items-center justify-center text-4xl text-white font-bold">
          {user.name[0]}
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mt-4">{user.name}</h1>
        <p className="text-gray-500">Plymouth Crew Member</p>
        <div className="flex justify-center gap-6 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-cyan-600">{user.nautiPoints}</p>
            <p className="text-xs text-gray-500">Nauti Points</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">{user.mealsGiven}</p>
            <p className="text-xs text-gray-500">Meals Given</p>
          </div>
        </div>
      </div>

      {/* Settings Options */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-cyan-500/10 border border-gray-100">
        {[
          { icon: '👤', label: 'Edit Profile', action: 'Go' },
          { icon: '📍', label: 'My Location', value: 'Plymouth, MN' },
          { icon: '🔔', label: 'Notifications', toggle: true },
          { icon: '♻️', label: 'BYOB Reminders', toggle: true },
          { icon: '📊', label: 'Download Impact Report', action: 'PDF' },
          { icon: '🎨', label: 'App Theme', value: 'Ocean' },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium text-gray-700">{item.label}</span>
            </div>
            {item.action && (
              <span className="text-cyan-600 font-medium text-sm">{item.action} →</span>
            )}
            {item.value && (
              <span className="text-gray-400 text-sm">{item.value}</span>
            )}
            {item.toggle && (
              <div className="w-12 h-7 bg-cyan-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Help & Support */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-cyan-500/10 border border-gray-100">
        {[
          { icon: '❓', label: 'FAQ & Help' },
          { icon: '💬', label: 'Contact Support' },
          { icon: '⭐', label: 'Rate Nautical Bowls' },
          { icon: '📜', label: 'Terms & Privacy' },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium text-gray-700">{item.label}</span>
            </div>
            <span className="text-gray-300">→</span>
          </div>
        ))}
      </div>

      {/* Logout */}
      <button className="w-full py-4 bg-gray-100 text-gray-600 rounded-2xl font-medium hover:bg-gray-200 transition-colors">
        Sign Out
      </button>
    </div>
  );

  // Reward Modal
  const RewardModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6" onClick={() => setShowRewardModal(false)}>
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
        <div className="text-center">
          <span className="text-6xl">{selectedReward?.icon}</span>
          <h2 className="text-xl font-bold text-gray-800 mt-4">Redeem {selectedReward?.name}?</h2>
          <p className="text-gray-500 mt-2">This will cost <strong className="text-cyan-600">{selectedReward?.points} Nauti Points</strong></p>
          <p className="text-sm text-gray-400 mt-1">You'll have {user.nautiPoints - (selectedReward?.points || 0)} points remaining</p>
        </div>
        <div className="flex gap-3 mt-6">
          <button 
            onClick={() => setShowRewardModal(false)}
            className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200"
          >
            Cancel
          </button>
          <button 
            onClick={confirmRedeem}
            className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold hover:shadow-lg"
          >
            Redeem
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* App Container */}
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative">
        {/* Status Bar Mockup */}
        <div className="bg-white px-6 py-2 flex justify-between items-center text-xs text-gray-600">
          <span>9:41</span>
          <div className="flex gap-1 items-center">
            <span>📶</span>
            <span>📡</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              ⚓
            </div>
            <div>
              <h1 className="font-bold text-gray-800 leading-tight" style={{ fontFamily: 'system-ui' }}>NAUTICAL BOWLS</h1>
              <p className="text-xs text-cyan-600 -mt-0.5">Fuel a Full Life</p>
            </div>
          </div>
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
            🔔
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-6">
          {activeTab === 'home' && <HomeTab />}
          {activeTab === 'rewards' && <RewardsTab />}
          {activeTab === 'vote' && <VoteTab />}
          {activeTab === 'impact' && <ImpactTab />}
          {activeTab === 'profile' && <ProfileTab />}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-4 py-2 z-50">
          <div className="flex justify-around">
            {[
              { id: 'home', icon: '🏠', label: 'Home' },
              { id: 'rewards', icon: '⭐', label: 'Rewards' },
              { id: 'vote', icon: '🗳️', label: 'Vote' },
              { id: 'impact', icon: '🌍', label: 'Impact' },
              { id: 'profile', icon: '👤', label: 'Profile' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-50 text-cyan-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="text-xs mt-1 font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Wave Background */}
        <WaveBackground />
      </div>

      {/* Reward Modal */}
      {showRewardModal && <RewardModal />}

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }
        
        .active\\:scale-95:active {
          transform: scale(0.95);
        }
        
        .active\\:scale-98:active {
          transform: scale(0.98);
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default NauticalBowlsApp;