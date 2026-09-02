import { useMemo, useState } from 'react'
import BottomNav from '../../components/BottomNav.jsx'
import ScreenHeader from '../../components/ScreenHeader.jsx'
import Avatar from '../../components/Avatar.jsx'
import Icon from '../../components/Icon.jsx'
import {
  parsePersonaFile,
  selectCard,
  buildProfileView,
} from '../../lib/persona/index.js'
import personasJson from '../../data/personas.mock.json'
import { Section } from './sections.jsx'
import './Profile.css'

// メンバータブのアバター色(API に色情報が無いので index で割り当て)
const TAB_COLORS = [
  { bg: '#eeedfe', color: '#7f77dd' },
  { bg: '#faece7', color: '#c97a4a' },
  { bg: '#faeeda', color: '#a67c1e' },
  { bg: '#e7f3ef', color: '#3d8c6e' },
]

function Profile() {
  const parsed = useMemo(() => parsePersonaFile(personasJson), [])
  const personas = parsed.personas
  const [activeId, setActiveId] = useState(personas[0]?.personaId)
  // プロトタイプ確認用。本番は常に最新カードのみ表示する。
  const [previewLevel, setPreviewLevel] = useState(null)

  const persona =
    personas.find((p) => p.personaId === activeId) ?? personas[0]
  const availableLevels = persona
    ? [...new Set(persona.history.map((c) => c.level))].sort((a, b) => a - b)
    : []
  const view = useMemo(
    () =>
      persona
        ? buildProfileView(selectCard(persona, { level: previewLevel }))
        : null,
    [persona, previewLevel],
  )

  if (!view) {
    return (
      <div className="screen profile">
        <ScreenHeader title="プロフィール帳" titleIcon="notebook" />
        <div className="screen__body profile__body">
          <p className="profile__empty-file">まだプロフィール帳がありません</p>
        </div>
        <BottomNav />
      </div>
    )
  }

  const { meta, levelUp, sections } = view

  return (
    <div className="screen profile">
      <ScreenHeader title="プロフィール帳" titleIcon="notebook" trailing="menu" />

      {personas.length > 1 && (
        <div className="profile__members">
          {personas.map((p, i) => {
            const active = p.personaId === activeId
            const c = TAB_COLORS[i % TAB_COLORS.length]
            return (
              <button
                key={p.personaId}
                type="button"
                className={'profile__member' + (active ? ' is-active' : '')}
                onClick={() => {
                  setActiveId(p.personaId)
                  setPreviewLevel(null)
                }}
              >
                <span
                  className="profile__member-avatar"
                  style={{ background: c.bg, color: c.color }}
                >
                  <Icon name="user" size={16} />
                </span>
                <span className="profile__member-name">{p.name}</span>
              </button>
            )
          })}
        </div>
      )}

      {availableLevels.length > 1 && (
        <div className="profile__preview">
          <span className="profile__preview-label">プレビュー</span>
          {availableLevels.map((lv) => {
            const on =
              previewLevel === lv ||
              (previewLevel == null && lv === persona.latestLevel)
            return (
              <button
                key={lv}
                type="button"
                className={
                  'profile__preview-btn' + (on ? ' is-active' : '')
                }
                onClick={() => setPreviewLevel(lv)}
              >
                Lv{lv}
              </button>
            )
          })}
        </div>
      )}

      <div className="screen__body profile__body">
        <div className="profile__hero">
          <Avatar size={80} />
          <p className="profile__hero-name">{meta.name}</p>
          {meta.catchphrase && (
            <p className="profile__hero-catch">「{meta.catchphrase}」</p>
          )}
          <div className="profile__hero-meta">
            <span className="profile__level">Lv{meta.level}</span>
            {meta.stats.answers != null && (
              <span className="profile__stats">
                {meta.stats.answers}件の回答
                {meta.stats.people != null && `・${meta.stats.people}人が協力`}
              </span>
            )}
          </div>
        </div>

        {levelUp && (
          <div className="profile__levelup">
            <p className="profile__levelup-title">🎉 新しい一面が分かった</p>
            <p className="profile__levelup-msg">{levelUp.message}</p>
            {levelUp.unlocked.length > 0 && (
              <div className="profile__levelup-slots">
                {levelUp.unlocked.map((u) => (
                  <span key={u} className="profile__levelup-slot">
                    {u} 解放
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {sections.map((s) => (
          <Section key={s.key} section={s} />
        ))}

        {meta.updatedAt && (
          <p className="profile__updated">{meta.updatedAt} 更新</p>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default Profile
