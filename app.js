// Supabase setup
const { createClient } = supabase
const client = createClient(
  'https://xragzrjatiudhbrubejf.supabase.co',  // replace this
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYWd6cmphdGl1ZGhicnViZWpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMDY4MTIsImV4cCI6MjA5MTg4MjgxMn0.JyX4aWIK6TTHPeyITWMYGLRRvgANVR2j20wSti5-WUM'      // replace this
)

// Save profile and show the app
async function saveProfile() {
  const username = document.getElementById('username').value
  if (!username) return alert('Enter your name first!')

  localStorage.setItem('username', username)

  document.getElementById('log-section').style.display = 'block'
  document.getElementById('history-section').style.display = 'block'

  loadHistory()
}

// Log a workout to Supabase
async function logWorkout() {
  const type = document.getElementById('workout-type').value
  const username = localStorage.getItem('username')

  await client.from('workout_logs').insert({
    username: username,
    workout_type: type
  })

  loadHistory()
}

// Fetch history from Supabase
async function loadHistory() {
  const username = localStorage.getItem('username')

  const { data } = await client
    .from('workout_logs')
    .select('*')
    .eq('username', username)
    .order('created_at', { ascending: false })

  const list = document.getElementById('workout-list')
  list.innerHTML = ''

  data.forEach(log => {
    const li = document.createElement('li')
    li.textContent = `${log.workout_type} — ${new Date(log.created_at).toLocaleDateString()}`
    list.appendChild(li)
  })
}
