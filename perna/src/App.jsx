import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Profile from './pages/profile/Profile.jsx'
import DailyPost from './pages/dailypost/DailyPost.jsx'
import Post from './pages/post/Post.jsx'
import Log from './pages/log/Log.jsx'

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/persona" element={<Profile />} />
      <Route path="/question" element={<DailyPost />} />
      <Route path="/post" element={<Post />} />
      <Route path="/log" element={<Log />} />
    </Routes>
  )
}

export default App
