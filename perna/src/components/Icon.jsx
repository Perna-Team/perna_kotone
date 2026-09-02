// モックの Tabler アイコン(ti ti-*)を、依存を足さず簡易 SVG で代替したもの。
// stroke ベース。色は currentColor を継承する。

const STROKE = {
  'chevron-left': <polyline points="15 6 9 12 15 18" />,
  x: (
    <>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </>
  ),
  send: (
    <>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22 11 13 2 9z" />
    </>
  ),
  home: (
    <>
      <path d="M3 11 12 3l9 8" />
      <path d="M5 10v10h14V10" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c0-3.3 2.7-5.2 5.5-5.2s5.5 1.9 5.5 5.2" />
      <path d="M16 5.2A2.8 2.8 0 0 1 16 10.8" />
      <path d="M17.5 14.9c1.9.5 3.5 2 3.5 4.6" />
    </>
  ),
  edit: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
    </>
  ),
  'message-heart': (
    <>
      <path d="M21 13.5a2 2 0 0 1-2 2H8l-4 3.5V6a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
      <path d="M12.5 12.4c1.6-1 2.4-2 2.4-3a1.5 1.5 0 0 0-2.4-1.2A1.5 1.5 0 0 0 10 9.4c0 1 .9 2 2.5 3z" />
    </>
  ),
  notebook: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="M12.5 8h4" />
      <path d="M12.5 12h4" />
    </>
  ),
  'user-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.5 18.5c1-2.3 3-3.4 5.5-3.4s4.5 1.1 5.5 3.4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 20c0-3.8 3.2-5.8 6.5-5.8s6.5 2 6.5 5.8" />
    </>
  ),
  photo: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <circle cx="8.5" cy="10" r="1.6" />
      <path d="m4 17 4.5-4.5L13 17l3-3 4 4" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8.5a6 6 0 0 0-12 0c0 6-2.5 7.5-2.5 7.5h17S18 14.5 18 8.5" />
      <path d="M13.5 19a2 2 0 0 1-3 0" />
    </>
  ),
  heart: (
    <path d="M12 20S3.5 15 3.5 8.8C3.5 6 5.6 4.2 8 4.2c1.7 0 3.2 1 4 2.4.8-1.4 2.3-2.4 4-2.4 2.4 0 4.5 1.8 4.5 4.6C20.5 15 12 20 12 20z" />
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m8.5 14-2 7 5.5-3 5.5 3-2-7" />
    </>
  ),
  'list-check': (
    <>
      <path d="M11 6h9" />
      <path d="M11 12h9" />
      <path d="M11 18h9" />
      <path d="m3.5 6 1.5 1.5L8 4.5" />
      <path d="m3.5 12 1.5 1.5L8 10.5" />
      <path d="m3.5 18 1.5 1.5L8 16.5" />
    </>
  ),
}

const FILL = {
  dots: (
    <>
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </>
  ),
  sparkles: (
    <path d="M12 2.5c.5 3.8 1.9 5.2 5.7 5.7-3.8.5-5.2 1.9-5.7 5.7-.5-3.8-1.9-5.2-5.7-5.7C10.1 7.7 11.5 6.3 12 2.5Zm6.5 10c.3 2 1 2.7 3 3-2 .3-2.7 1-3 3-.3-2-1-2.7-3-3 2-.3 2.7-1 3-3Z" />
  ),
}

function Icon({ name, size = 20, strokeWidth = 1.8, className, style }) {
  const fill = FILL[name]
  const stroke = STROKE[name]
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className,
    style,
    'aria-hidden': true,
    focusable: false,
  }
  if (fill) {
    return (
      <svg {...common} fill="currentColor" stroke="none">
        {fill}
      </svg>
    )
  }
  return (
    <svg
      {...common}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {stroke}
    </svg>
  )
}

export default Icon
