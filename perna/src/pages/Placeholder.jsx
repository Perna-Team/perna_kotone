import BottomNav from '../components/BottomNav.jsx'
import ScreenHeader from '../components/ScreenHeader.jsx'

// STEP1 の対象外だが下タブから遷移できる画面の仮ページ。
function Placeholder({ title }) {
  return (
    <div className="screen">
      <ScreenHeader title={title} leading={false} />
      <div
        className="screen__body"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          color: 'var(--text-muted)',
          fontSize: 13,
        }}
      >
        <span style={{ fontSize: 30 }}>🚧</span>
        <p>{title}は準備中です</p>
      </div>
      <BottomNav />
    </div>
  )
}

export default Placeholder
