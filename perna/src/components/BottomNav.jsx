import { NavLink } from 'react-router-dom'
import Icon from './Icon.jsx'
import './BottomNav.css'

const TABS = [
  { to: '/home', label: 'ホーム', icon: 'home' },
  { to: '/members', label: 'メンバー', icon: 'users' },
  { to: '/question', label: '質問', icon: 'edit' },
  { to: '/talk', label: 'おしゃべり', icon: 'message-heart' },
  { to: '/persona', label: 'プロフィール帳', icon: 'notebook' },
]

function BottomNav() {
  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            'bottom-nav__tab' + (isActive ? ' is-active' : '')
          }
        >
          <Icon name={tab.icon} size={20} />
          <span className="bottom-nav__label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
