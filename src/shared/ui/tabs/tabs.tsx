import './tabs.css'

interface TabsProps {
  items: string[]
  active: string
  onChange: (item: string) => void
}

export function Tabs({ items, active, onChange }: TabsProps) {
  return (
    <div className="tabs" role="tablist">
      {items.map((item) => (
        <button
          key={item}
          role="tab"
          aria-selected={item === active}
          className={item === active ? 'tab tab-active' : 'tab'}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  )
}
