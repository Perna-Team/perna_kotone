import Icon from './Icon.jsx'
import './Avatar.css'

// モック共通の「写真プレースホルダー」。二重丸 + 破線 + photo アイコン。
// size = 外側の直径(px)。label を渡すと下に小さく表示(ホームの「キャラクター選択」)。
function Avatar({ size = 80, label }) {
  const inner = Math.round(size * 0.85)
  const iconSize = Math.round(size * 0.28)
  return (
    <div
      className="avatar"
      style={{ width: size, height: size }}
      role="img"
      aria-label="キャラクター未設定"
    >
      <div
        className="avatar__inner"
        style={{ width: inner, height: inner }}
      >
        <Icon name="photo" size={iconSize} className="avatar__icon" />
        {label && <span className="avatar__label">{label}</span>}
      </div>
    </div>
  )
}

export default Avatar
