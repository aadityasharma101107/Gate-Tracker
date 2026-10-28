/** Base surface used across the site: soft accent fill, hairline ring, subtle glow. */
export default function Card({ as: Tag = 'div', padded = true, className = '', children, ...rest }) {
  return (
    <Tag
      className={`rounded-2xl bg-accent/300 shadow-glow ring-1 ring-slate-10000 transition duration-300 hover:bg-accent/40 hover:shadow-glow-lg ${
        padded ? 'p-5 sm:p-6' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
