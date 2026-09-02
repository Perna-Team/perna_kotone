// プロフィール帳のセクション定義と整形ヘルパー。
// SECTION_LEVELS の閾値は Lv1/3/5 のサンプルからの推測なので、
// API 仕様が固まったらここだけ直せばよい。

// セクションが解放されるレベル
export const SECTION_LEVELS = {
  oshiPoints: 1,
  traits: 1,
  openQuestions: 1,
  voiceSamples: 1,
  likes: 3,
  dislikes: 3,
  values: 3,
  gap: 3,
  episodes: 3,
  soloViews: 5,
  splitViews: 5,
  selfIntro: 5,
}

// プロフィール帳での表示順
export const SECTION_ORDER = [
  'oshiPoints',
  'traits',
  'gap',
  'soloViews',
  'splitViews',
  'likes',
  'dislikes',
  'values',
  'episodes',
  'selfIntro',
  'voiceSamples',
  'openQuestions',
]

export const SECTION_TITLES = {
  oshiPoints: '推しポイント',
  traits: 'せいかく',
  gap: 'じぶんと周りのズレ',
  soloViews: '1人だけ違う見方',
  splitViews: '意見が割れた',
  likes: '好き',
  dislikes: '苦手',
  values: '大事にしてること',
  episodes: 'エピソード',
  selfIntro: '本人から',
  voiceSamples: 'こんな話し方',
  openQuestions: 'まだ謎',
}

// level_up_diff.unlocked_slots の英字キー → 日本語ラベル
export const SLOT_LABELS = {
  gap: 'じぶんと周りのズレ',
  free_word: '本人コメント',
  solo_views: '1人だけ違う見方',
  split_views: '意見が割れた',
  episodes: 'エピソード',
}

const CONSENSUS_LABELS = { all: '全員', majority: '多数' }

export function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return `${d.getMonth() + 1}月${d.getDate()}日`
}

// 「4人中3人」。数が揃わなければ null
export function formatConsensus(agree, total) {
  if (
    typeof agree === 'number' &&
    typeof total === 'number' &&
    total > 0 &&
    agree >= 0
  ) {
    return `${total}人中${agree}人`
  }
  return null
}

export function consensusLabel(consensus) {
  return CONSENSUS_LABELS[consensus] ?? null
}

export function formatRespondents(names) {
  if (!Array.isArray(names) || names.length === 0) return null
  return names.join('・')
}
