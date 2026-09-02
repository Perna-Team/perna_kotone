// API が出力する JSON ファイル(1ファイル = 本来は1人分。モックは複数人)を
// 人物ごとにまとめ、表示に使いやすい形へ整理する。

const isObject = (v) => v != null && typeof v === 'object' && !Array.isArray(v)

export function parsePersonaFile(json) {
  const cards = isObject(json) && Array.isArray(json.cards) ? json.cards : []
  const valid = cards.filter(
    (c) => isObject(c) && typeof c.persona_id === 'string',
  )

  const groups = new Map()
  for (const card of valid) {
    if (!groups.has(card.persona_id)) groups.set(card.persona_id, [])
    groups.get(card.persona_id).push(card)
  }

  const personas = [...groups.entries()].map(([personaId, list]) => {
    const history = [...list].sort(
      (a, b) => (a.version ?? 0) - (b.version ?? 0),
    )
    const latest = history[history.length - 1]
    return {
      personaId,
      userId: latest.user_id ?? null,
      name: latest.identity?.name ?? '(名前なし)',
      latestLevel: latest.level ?? 1,
      latest,
      history,
    }
  })

  return { personas }
}

// メンバータブ用の一覧
export function listPersonas(parsed) {
  return parsed.personas.map((p) => ({ personaId: p.personaId, name: p.name }))
}

// 表示するカードを選ぶ。既定は最新。level 指定で過去カードも取れる(今回は未使用)。
export function selectCard(persona, { level } = {}) {
  if (!persona) return null
  if (level == null) return persona.latest
  return persona.history.find((c) => c.level === level) ?? persona.latest
}
