// home / dailypost 画面のレイアウト確認用モックデータ。
// プロフィール帳のデータは src/data/personas.mock.json + src/lib/persona/ を参照。

// ホーム画面: いま「推し」にしている相手のサマリー
export const homeOshi = {
  memberId: 'hajime',
  name: 'はじめ',
  subtitle: '今日もはじめの魅力が育っています',
  catchphrase: 'いつも笑顔で周りを照らすムードメーカー',
  weeklyScore: 12,
}

// 今日の質問: type によって dailypost 画面の入力方法が変わる
//   type: 'text'   -> 自由記述(textarea)
//   type: 'choice' -> ラジオボタン。option.freeText:true の選択肢は自由入力欄を出す
export const dailyQuestions = [
  {
    id: 'q-text',
    type: 'text',
    targetName: 'はじめ',
    question: 'はじめの「これ得意だな」と思う瞬間はどんな時?',
    placeholder: '思ったことを書いてみよう',
  },
  {
    id: 'q-choice',
    type: 'choice',
    targetName: 'はじめ',
    question: 'はじめの一番好きなところは?',
    options: [
      { id: 'o1', label: 'いつも笑顔なところ' },
      { id: 'o2', label: '頼りになるところ' },
      { id: 'o3', label: '話してて楽しいところ' },
      { id: 'o4', label: 'その他(自由入力)', freeText: true },
    ],
  },
]

// プロフィール帳: メンバーごと。STEP2 で JSON を流し込む対象。
export const profileBooks = {
  hajime: {
    memberId: 'hajime',
    name: 'はじめ',
    nickname: 'はじめ',
    personality: 'ムードメーカー',
    goodAt: null,
    holiday: '友達とバスケ',
    favorites: [
      { key: 'food', label: '食べもの', value: 'からあげ', theme: 'pink' },
      { key: 'color', label: '好きな色', value: '水色', theme: 'lav' },
      { key: 'animal', label: 'どうぶつ', value: null, theme: 'neutral' },
      { key: 'oshi', label: '推し', value: null, theme: 'neutral' },
    ],
    episodes: [
      'テスト前にノートを共有してくれた',
      '落ち込んでた時に声をかけてくれた',
      null,
    ],
    whichOne: [
      { text: 'インドア・アウトドア 派', pick: 'アウトドア' },
      { text: 'すぐ返信・溜めちゃう 派', pick: 'すぐ返信' },
      { text: '人見知りは', pick: null },
    ],
  },
  yui: {
    memberId: 'yui',
    name: 'ゆい',
    nickname: 'ゆい',
    personality: null,
    goodAt: 'イラストを描くこと',
    holiday: null,
    favorites: [
      { key: 'food', label: '食べもの', value: null, theme: 'neutral' },
      { key: 'color', label: '好きな色', value: 'ラベンダー', theme: 'lav' },
      { key: 'animal', label: 'どうぶつ', value: 'ねこ', theme: 'pink' },
      { key: 'oshi', label: '推し', value: null, theme: 'neutral' },
    ],
    episodes: ['遅刻した日にノートを見せてくれた', null, null],
    whichOne: [
      { text: 'インドア・アウトドア 派', pick: 'インドア' },
      { text: 'すぐ返信・溜めちゃう 派', pick: null },
      { text: '人見知りは', pick: null },
    ],
  },
  riku: {
    memberId: 'riku',
    name: 'りく',
    nickname: 'りく',
    personality: null,
    goodAt: null,
    holiday: null,
    favorites: [
      { key: 'food', label: '食べもの', value: null, theme: 'neutral' },
      { key: 'color', label: '好きな色', value: null, theme: 'neutral' },
      { key: 'animal', label: 'どうぶつ', value: null, theme: 'neutral' },
      { key: 'oshi', label: '推し', value: null, theme: 'neutral' },
    ],
    episodes: [null, null, null],
    whichOne: [
      { text: 'インドア・アウトドア 派', pick: null },
      { text: 'すぐ返信・溜めちゃう 派', pick: null },
      { text: '人見知りは', pick: null },
    ],
  },
  ai: {
    memberId: 'ai',
    name: 'あい',
    nickname: 'あいちゃん',
    personality: 'しっかり者',
    goodAt: '計画を立てること',
    holiday: 'カフェめぐり',
    favorites: [
      { key: 'food', label: '食べもの', value: 'パンケーキ', theme: 'pink' },
      { key: 'color', label: '好きな色', value: '白', theme: 'lav' },
      { key: 'animal', label: 'どうぶつ', value: 'いぬ', theme: 'pink' },
      { key: 'oshi', label: '推し', value: null, theme: 'neutral' },
    ],
    episodes: [
      '旅行のしおりを全部作ってくれた',
      '体調を崩した時に連絡をくれた',
      'テスト範囲をまとめて共有してくれた',
    ],
    whichOne: [
      { text: 'インドア・アウトドア 派', pick: 'アウトドア' },
      { text: 'すぐ返信・溜めちゃう 派', pick: 'すぐ返信' },
      { text: '人見知りは', pick: 'しない' },
    ],
  },
}
