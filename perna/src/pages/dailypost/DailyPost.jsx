import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../../components/BottomNav.jsx'
import ScreenHeader from '../../components/ScreenHeader.jsx'
import Avatar from '../../components/Avatar.jsx'
import Icon from '../../components/Icon.jsx'
import { dailyQuestions } from '../../data/mockData.js'
import './DailyPost.css'

function DailyPost() {
  // プロトタイプ確認用の切替。本番では「今日の質問」1件がAPIから渡り、
  // その question.type に応じて自動で入力方法が変わる。
  const navigate = useNavigate()
  const [qIndex, setQIndex] = useState(0)
  const question = dailyQuestions[qIndex]

  const [text, setText] = useState('')
  const [choiceId, setChoiceId] = useState(null)
  const [otherText, setOtherText] = useState('')
  const [sent, setSent] = useState(false)

  const selectedOption =
    question.type === 'choice'
      ? question.options.find((o) => o.id === choiceId)
      : null

  const canSend =
    question.type === 'text'
      ? text.trim().length > 0
      : choiceId != null &&
        (!selectedOption?.freeText || otherText.trim().length > 0)

  function switchQuestion(index) {
    setQIndex(index)
    setText('')
    setChoiceId(null)
    setOtherText('')
    setSent(false)
  }

  return (
    <div className="screen dailypost">
      <ScreenHeader
        title="今日の質問"
        trailing="close"
        onTrailing={() => navigate('/home')}
      />

      <div className="dailypost__preview">
        <span className="dailypost__preview-label">プレビュー</span>
        {dailyQuestions.map((q, i) => (
          <button
            key={q.id}
            type="button"
            className={
              'dailypost__preview-btn' + (i === qIndex ? ' is-active' : '')
            }
            onClick={() => switchQuestion(i)}
          >
            {q.type === 'text' ? '記述' : '選択'}
          </button>
        ))}
      </div>

      <div className="screen__body dailypost__body">
        <Avatar size={76} />
        <p className="dailypost__target">{question.targetName} について</p>

        <div className="dailypost__question">
          <Icon name="sparkles" size={14} className="dailypost__question-spark" />
          <p className="dailypost__question-label">Q. 今日の質問</p>
          <p className="dailypost__question-text">{question.question}</p>
        </div>

        {sent ? (
          <div className="dailypost__done">
            <Icon name="list-check" size={22} />
            <p>送信しました</p>
          </div>
        ) : (
          <>
            {question.type === 'text' && (
              <textarea
                className="dailypost__textarea"
                placeholder={question.placeholder}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            )}

            {question.type === 'choice' && (
              <div className="dailypost__options">
                {question.options.map((option) => {
                  const active = option.id === choiceId
                  return (
                    <label
                      key={option.id}
                      className={
                        'dailypost__option' + (active ? ' is-active' : '')
                      }
                    >
                      <input
                        type="radio"
                        name="daily-choice"
                        value={option.id}
                        checked={active}
                        onChange={() => setChoiceId(option.id)}
                      />
                      <span className="dailypost__radio" aria-hidden="true">
                        {active && <span className="dailypost__radio-dot" />}
                      </span>
                      <span className="dailypost__option-label">
                        {option.label}
                      </span>
                    </label>
                  )
                })}

                {selectedOption?.freeText && (
                  <textarea
                    className="dailypost__textarea dailypost__textarea--other"
                    placeholder="自由に書いてみよう"
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                  />
                )}
              </div>
            )}

            <button
              type="button"
              className="dailypost__submit"
              disabled={!canSend}
              onClick={() => setSent(true)}
            >
              <Icon name="send" size={15} />
              送信する
            </button>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default DailyPost
