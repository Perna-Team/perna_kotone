import { useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'
import './ScreenHeader.css'

// 画面上部のバー。左: 戻る(chevron) / 中央: タイトル / 右: アクション。
// leading, trailing に false を渡すとその枠だけ非表示(位置は保持)。
function ScreenHeader({
  title,
  titleIcon,
  leading = 'back',
  trailing,
  onLeading,
  onTrailing,
}) {
  const navigate = useNavigate()
  const handleLeading =
    onLeading || (leading === 'back' ? () => navigate(-1) : undefined)

  return (
    <header className="screen-header">
      <button
        type="button"
        className="screen-header__btn"
        onClick={handleLeading}
        aria-label="戻る"
        style={{ visibility: leading ? 'visible' : 'hidden' }}
      >
        {leading === 'back' ? <Icon name="chevron-left" size={20} /> : null}
      </button>

      <span className="screen-header__title">
        {titleIcon && <Icon name={titleIcon} size={15} />}
        {title}
      </span>

      <button
        type="button"
        className="screen-header__btn"
        onClick={onTrailing}
        aria-label={trailing === 'close' ? '閉じる' : 'メニュー'}
        style={{ visibility: trailing ? 'visible' : 'hidden' }}
      >
        {trailing === 'close' && <Icon name="x" size={18} />}
        {trailing === 'menu' && <Icon name="dots" size={18} />}
        {trailing === 'bell' && <Icon name="bell" size={19} />}
      </button>
    </header>
  )
}

export default ScreenHeader
