// 生カード 1枚 → プロフィール帳がそのまま描ける view モデル。
// コンポーネントは API のフィールド名を一切知らなくてよい状態にする。

import {
  SECTION_LEVELS,
  SECTION_ORDER,
  SECTION_TITLES,
  SLOT_LABELS,
  formatDate,
  formatConsensus,
  consensusLabel,
  formatRespondents,
} from './format.js'

const arr = (v) => (Array.isArray(v) ? v : [])
const toneOf = (polarity) => (polarity === 'quirk' ? 'quirk' : 'positive')

export function buildProfileView(card) {
  if (card == null || typeof card !== 'object') return null

  const level = card.level ?? 1
  const identity = card.identity ?? {}
  const voice = identity.voice ?? {}
  const stats = card.source_stats ?? {}

  const meta = {
    name: identity.name ?? '(名前なし)',
    catchphrase: identity.catchphrase ?? '',
    level,
    updatedAt: formatDate(card.generated_at),
    stats: {
      answers: stats.answer_count ?? null,
      people: stats.respondent_count ?? null,
    },
    firstPerson: identity.first_person ?? null,
    secondPerson: identity.second_person ?? null,
  }

  const diff = card.level_up_diff
  const levelUp =
    diff != null && typeof diff === 'object'
      ? {
          message: diff.message ?? '新しい一面が分かったみたい',
          unlocked: arr(diff.unlocked_slots).map((s) => SLOT_LABELS[s] ?? s),
        }
      : null

  // key ごとの中身(空配列 = データなし)
  const gap =
    card.gap != null && typeof card.gap === 'object'
      ? {
          selfText: card.gap.self_declared ?? '',
          othersText: card.gap.others_say ?? '',
          punchline: card.gap.punchline ?? '',
          surprise: card.gap.surprise_level ?? null,
        }
      : null

  const selfIntro =
    typeof card.self_intro === 'string' && card.self_intro.trim()
      ? card.self_intro.trim()
      : null

  const contentByKey = {
    oshiPoints: arr(card.oshi_points).map((text) => ({ text })),

    traits: arr(card.traits).map((t) => ({
      label: t.label ?? '',
      statement: t.statement ?? '',
      tone: toneOf(t.polarity),
      consensusText:
        formatConsensus(t.agree_count, t.respondent_count) ??
        consensusLabel(t.consensus),
      byText: formatRespondents(t.respondents),
    })),

    soloViews: arr(card.solo_views).map((s) => ({
      who: s.respondent ?? '',
      theirView: s.their_view ?? '',
      everyoneElse: s.everyone_else ?? '',
      reason: s.their_reason ?? '',
      punchline: s.punchline ?? '',
      tone: toneOf(s.polarity),
    })),

    splitViews: arr(card.split_views).map((sp) => ({
      topic: sp.topic ?? '',
      sides: arr(sp.sides).map((side) => ({
        view: side.view ?? '',
        peopleText: formatRespondents(side.respondents),
        count: arr(side.respondents).length,
      })),
      punchline: sp.punchline ?? '',
    })),

    likes: arr(card.likes).map((l) => ({
      label: l.label ?? '',
      statement: l.statement ?? '',
    })),

    dislikes: arr(card.dislikes).map((d) => ({
      label: d.label ?? '',
      statement: d.statement ?? '',
    })),

    values: arr(card.values).map((v) => ({
      statement: v.statement ?? '',
      consensusText: consensusLabel(v.consensus),
    })),

    episodes: arr(card.episodes).map((e) => ({
      summary: e.summary ?? '',
      byText: e.told_by ? `${e.told_by} が教えてくれた` : null,
    })),

    voiceSamples: arr(voice.samples).map((text) => ({ text })),

    openQuestions: arr(card.open_questions).map((q) => ({ text: q.text ?? '' })),
  }

  const sections = SECTION_ORDER.map((key) => {
    const title = SECTION_TITLES[key]
    const unlockLevel = SECTION_LEVELS[key] ?? 1
    const locked = level < unlockLevel

    if (key === 'gap') {
      return {
        key,
        title,
        unlockLevel,
        state: locked ? 'locked' : gap ? 'filled' : 'empty',
        item: gap,
      }
    }
    if (key === 'selfIntro') {
      return {
        key,
        title,
        unlockLevel,
        state: locked ? 'locked' : selfIntro ? 'filled' : 'empty',
        text: selfIntro,
      }
    }

    const items = contentByKey[key] ?? []
    return {
      key,
      title,
      unlockLevel,
      state: locked ? 'locked' : items.length > 0 ? 'filled' : 'empty',
      items,
    }
  })

  return { meta, levelUp, sections }
}
