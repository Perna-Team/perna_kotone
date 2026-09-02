import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Profile from './pages/profile/Profile.jsx'
import DailyPost from './pages/dailypost/DailyPost.jsx'
import Post from './pages/post/Post.jsx'
import Log from './pages/log/Log.jsx'
import Placeholder from './pages/Placeholder.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/persona" element={<Profile />} />
      <Route path="/question" element={<DailyPost />} />
      <Route path="/members" element={<Placeholder title="メンバー" />} />
      <Route path="/talk" element={<Placeholder title="おしゃべり" />} />
      <Route path="/post" element={<Post />} />
      <Route path="/log" element={<Log />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default App
