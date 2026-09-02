import Avatar from '../../components/Avatar.jsx'
import BottomNav from '../../components/BottomNav.jsx'
import Icon from '../../components/Icon.jsx'
import { homeOshi } from '../../data/mockData.js'
import './Home.css'

function Home() {
  const oshi = homeOshi

  return (
    <div className="screen home">
      <header className="home__header">
        <span className="home__brand">Perna</span>
        <button type="button" className="home__bell" aria-label="お知らせ">
          <Icon name="bell" size={19} />
        </button>
      </header>
      <p className="home__subtitle">{oshi.subtitle}</p>

      <div className="screen__body home__body">
        <Icon name="sparkles" size={18} className="home__sparkle home__sparkle--a" />
        <Icon name="sparkles" size={14} className="home__sparkle home__sparkle--b" />

        <Avatar size={168} label="キャラクター選択" />

        <p className="home__name">{oshi.name}</p>
        <p className="home__catchphrase">「{oshi.catchphrase}」</p>
        <span className="home__score">今週の推し度 +{oshi.weeklyScore}</span>
      </div>

      <BottomNav />
    </div>
  )
}

export default Home
