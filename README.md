# react-side-panel

Easy to use and flexible modal sidebar/drawer component for React (TypeScript). Port of [vue3-side-panel](https://github.com/headmandev/vue3-side-panel).

## Demo (local debugging)

Run the demo app to try the component locally before publishing:

```bash
npm run demo
```

This installs demo dependencies (if needed), starts the Vite dev server, and opens the library **source** via alias so you can edit `src/` and see changes with hot reload. The demo includes panels from all sides, header/footer, no-close overlay, scroll lock, custom width, and no-close-button variants.

## Install

```bash
npm install react-side-panel
# or
yarn add react-side-panel
# or
pnpm add react-side-panel
```

## Peer dependencies

- `react` >= 18
- `react-dom` >= 18

## Usage

Import the component and the default styles:

```tsx
import { SidePanel } from 'react-side-panel';
import 'react-side-panel/dist/styles.css';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open panel</button>
      <SidePanel
        open={open}
        onOpenChange={setOpen}
        side="right"
        width="400px"
        header={<h2>Panel title</h2>}
        footer={<button onClick={() => setOpen(false)}>Done</button>}
      >
        <p>Panel body content goes here.</p>
      </SidePanel>
    </>
  );
}
```

## API

### SidePanel

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | required | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | required | Called when open state should change |
| `onClosed` | `() => void` | — | Called after leave transition finishes |
| `onOpened` | `() => void` | — | Called after enter transition finishes |
| `idName` | `string` | `'rsp-container'` | Id for the portal container |
| `hideCloseBtn` | `boolean` | `false` | Hide the default close button |
| `noClose` | `boolean` | `false` | Prevent closing on overlay click |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | Side the panel slides from |
| `rerender` | `boolean` | `false` | Unmount content when closed (remount on open) |
| `zIndex` | `number \| 'auto'` | `'auto'` | z-index (auto = max on page) |
| `width` | `string` | `'auto'` | Panel width (left/right) |
| `height` | `string` | `'auto'` | Panel height (top/bottom) |
| `lockScroll` | `boolean` | `false` | Lock body scroll when open |
| `lockScrollHtml` | `boolean` | `true` | Set `overflow: hidden` on `html` when locking |
| `overlayColor` | `string` | `'black'` | Overlay background color |
| `overlayOpacity` | `number` | `0.5` | Overlay opacity (0–1) |
| `overlayDuration` | `number` | `500` | Overlay transition duration (ms) |
| `panelColor` | `string` | `'white'` | Panel background color |
| `panelDuration` | `number` | `300` | Panel transition duration (ms) |
| `transitionName` | `string` | `slide-{side}` | Custom transition class name |
| `headerClass` | `string` | `''` | Class for header container |
| `bodyClass` | `string` | `''` | Class for body container |
| `footerClass` | `string` | `''` | Class for footer container |
| `header` | `ReactNode` | — | Header content |
| `footer` | `ReactNode` | — | Footer content |
| `children` | `ReactNode` | — | Body content |
| `className` | `string` | — | Extra class for panel root |
| `style` | `CSSProperties` | — | Inline styles for panel root |

### SidePanelCloseButton

Optional close button component (used by default inside the panel).

| Prop | Type | Description |
|------|------|-------------|
| `onClose` | `() => void` | Called when the button is clicked |
| `className` | `string` | Optional class name |

## License

MIT
