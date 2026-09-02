import Icon from '../../components/Icon.jsx'

const SECTION_ICONS = {
  oshiPoints: 'heart',
  traits: 'sparkles',
  gap: 'user-circle',
  soloViews: 'user',
  splitViews: 'users',
  likes: 'heart',
  dislikes: 'x',
  values: 'award',
  episodes: 'notebook',
  selfIntro: 'edit',
  voiceSamples: 'message-heart',
  openQuestions: 'list-check',
}

export function Section({ section }) {
  const { key, title, state, unlockLevel } = section
  return (
    <section className="psec">
      <p className="psec__label">
        <Icon name={SECTION_ICONS[key] ?? 'list-check'} size={13} />
        {title}
      </p>
      {state === 'locked' && <LockedCard unlockLevel={unlockLevel} />}
      {state === 'empty' && <EmptyCard />}
      {state === 'filled' && <SectionBody section={section} />}
    </section>
  )
}

function LockedCard({ unlockLevel }) {
  return (
    <div className="psec__locked">
      <span className="psec__locked-icon" aria-hidden="true">
        🔒
      </span>
      <p className="psec__locked-main">Lv{unlockLevel} でアンロック</p>
      <p className="psec__locked-sub">みんなの回答が集まると見られるよ</p>
    </div>
  )
}

function EmptyCard() {
  return (
    <div className="psec__empty">
      <span className="blank-bar" style={{ width: 120 }} />
      <p>まだ分かってないみたい</p>
    </div>
  )
}

function SectionBody({ section }) {
  switch (section.key) {
    case 'oshiPoints':
      return <OshiPoints items={section.items} />
    case 'traits':
      return <Traits items={section.items} />
    case 'gap':
      return <GapCard item={section.item} />
    case 'soloViews':
      return <SoloViews items={section.items} />
    case 'splitViews':
      return <SplitViews items={section.items} />
    case 'likes':
      return <LikeList items={section.items} variant="like" />
    case 'dislikes':
      return <LikeList items={section.items} variant="dislike" />
    case 'values':
      return <Values items={section.items} />
    case 'episodes':
      return <Episodes items={section.items} />
    case 'selfIntro':
      return <SelfIntro text={section.text} />
    case 'voiceSamples':
      return <VoiceSamples items={section.items} />
    case 'openQuestions':
      return <OpenQuestions items={section.items} />
    default:
      return null
  }
}

function OshiPoints({ items }) {
  return (
    <div className="psec__badges">
      {items.map((it, i) => (
        <span key={i} className="psec__badge">
          {it.text}
        </span>
      ))}
    </div>
  )
}

function Traits({ items }) {
  return (
    <div className="psec__list">
      {items.map((t, i) => (
        <div key={i} className={'trait trait--' + t.tone}>
          <div className="trait__head">
            <span className="trait__chip">{t.label}</span>
            {t.consensusText && (
              <span className="trait__consensus">{t.consensusText}</span>
            )}
          </div>
          {t.statement && <p className="trait__statement">{t.statement}</p>}
          {t.byText && <p className="trait__by">{t.byText} が証言</p>}
        </div>
      ))}
    </div>
  )
}

function GapCard({ item }) {
  if (!item) return null
  return (
    <div className="gap">
      <div className="gap__row">
        <span className="gap__tag gap__tag--self">じぶんでは</span>
        <p>{item.selfText}</p>
      </div>
      <div className="gap__row">
        <span className="gap__tag gap__tag--others">みんなは</span>
        <p>{item.othersText}</p>
      </div>
      {item.punchline && <p className="gap__punch">{item.punchline}</p>}
      {item.surprise != null && (
        <p className="gap__surprise">
          びっくり度{' '}
          <span aria-hidden="true">
            {'●'.repeat(Math.min(5, item.surprise))}
            {'○'.repeat(Math.max(0, 5 - item.surprise))}
          </span>
        </p>
      )}
    </div>
  )
}

function SoloViews({ items }) {
  return (
    <div className="psec__list">
      {items.map((s, i) => (
        <div key={i} className={'solo solo--' + s.tone}>
          <p className="solo__head">
            <span className="solo__who">{s.who}</span>だけ、こう見てる
          </p>
          <p className="solo__their">{s.theirView}</p>
          {s.everyoneElse && (
            <p className="solo__else">みんな: {s.everyoneElse}</p>
          )}
          {s.reason && <p className="solo__reason">理由: {s.reason}</p>}
          {s.punchline && <p className="solo__punch">{s.punchline}</p>}
        </div>
      ))}
    </div>
  )
}

function SplitViews({ items }) {
  return (
    <div className="psec__list">
      {items.map((sp, i) => (
        <div key={i} className="split">
          {sp.topic && <p className="split__topic">{sp.topic}</p>}
          {sp.sides.length > 0 && (
            <p className="split__score">
              {sp.sides.map((s) => s.count).join(' vs ')}
            </p>
          )}
          <div className="split__sides">
            {sp.sides.map((side, j) => (
              <div key={j} className="split__side">
                <p className="split__view">{side.view}</p>
                {side.peopleText && (
                  <p className="split__people">{side.peopleText}</p>
                )}
              </div>
            ))}
          </div>
          {sp.punchline && <p className="split__punch">{sp.punchline}</p>}
        </div>
      ))}
    </div>
  )
}

function LikeList({ items, variant }) {
  return (
    <div className="psec__list">
      {items.map((it, i) => (
        <div key={i} className={'likeitem likeitem--' + variant}>
          <p className="likeitem__label">{it.label}</p>
          {it.statement && (
            <p className="likeitem__statement">{it.statement}</p>
          )}
        </div>
      ))}
    </div>
  )
}

function Values({ items }) {
  return (
    <div className="psec__list">
      {items.map((v, i) => (
        <div key={i} className="valueitem">
          <p>{v.statement}</p>
          {v.consensusText && (
            <span className="valueitem__tag">{v.consensusText}</span>
          )}
        </div>
      ))}
    </div>
  )
}

function Episodes({ items }) {
  return (
    <div className="psec__episodes">
      {items.map((e, i) => (
        <div key={i} className="episode">
          <span className="episode__no">{i + 1}</span>
          <div className="episode__body">
            <p className="episode__summary">{e.summary}</p>
            {e.byText && <p className="episode__by">{e.byText}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

function SelfIntro({ text }) {
  return (
    <div className="selfintro">
      <p>{text}</p>
    </div>
  )
}

function VoiceSamples({ items }) {
  return (
    <div className="psec__list">
      {items.map((s, i) => (
        <p key={i} className="voiceline">
          「{s.text}」
        </p>
      ))}
    </div>
  )
}

function OpenQuestions({ items }) {
  return (
    <div className="psec__list">
      {items.map((q, i) => (
        <p key={i} className="openq">
          <span className="openq__mark" aria-hidden="true">
            ?
          </span>
          {q.text}
        </p>
      ))}
    </div>
  )
}
