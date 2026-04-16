// Save profile and show the app
function saveProfile() {
  const username = document.getElementById('username').value
  if (!username) return alert('Enter your name first!')

  // Save to localStorage for now
  localStorage.setItem('username', username)

  // Show the hidden sections
  document.getElementById('log-section').style.display = 'block'
  document.getElementById('history-section').style.display = 'block'
}

// Log a workout
function logWorkout() {
  const type = document.getElementById('workout-type').value
  const username = localStorage.getItem('username')

  // Add to the list on screen
  const li = document.createElement('li')
  li.textContent = `${username} — ${type} — ${new Date().toLocaleDateString()}`
  document.getElementById('workout-list').prepend(li)
}
