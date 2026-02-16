import { useState } from 'react';
import { SidePanel } from 'react-side-panel';

type PanelId =
  | 'right'
  | 'left'
  | 'top'
  | 'bottom'
  | 'withHeaderFooter'
  | 'noClose'
  | 'lockScroll'
  | 'customWidth'
  | 'noCloseBtn';

export default function App() {
  const [open, setOpen] = useState<Record<PanelId, boolean>>({
    right: false,
    left: false,
    top: false,
    bottom: false,
    withHeaderFooter: false,
    noClose: false,
    lockScroll: false,
    customWidth: false,
    noCloseBtn: false,
  });

  const openPanel = (id: PanelId) => setOpen((s) => ({ ...s, [id]: true }));
  const closePanel = (id: PanelId) => setOpen((s) => ({ ...s, [id]: false }));

  return (
    <div className="demo-page">
      <h1>React Side Panel</h1>
      <p>Click a button to open each panel variant. Use the demo to debug before deploying.</p>

      <section className="section-title">Sides</section>
      <div className="demo-grid">
        <button className="demo-btn" onClick={() => openPanel('right')}>
          Open from right
        </button>
        <button className="demo-btn" onClick={() => openPanel('left')}>
          Open from left
        </button>
        <button className="demo-btn" onClick={() => openPanel('top')}>
          Open from top
        </button>
        <button className="demo-btn" onClick={() => openPanel('bottom')}>
          Open from bottom
        </button>
      </div>

      <section className="section-title">Variants</section>
      <div className="demo-grid">
        <button className="demo-btn" onClick={() => openPanel('withHeaderFooter')}>
          Header + Footer
        </button>
        <button className="demo-btn secondary" onClick={() => openPanel('noClose')}>
          No overlay close
        </button>
        <button className="demo-btn secondary" onClick={() => openPanel('lockScroll')}>
          Lock scroll
        </button>
        <button className="demo-btn secondary" onClick={() => openPanel('customWidth')}>
          Custom width
        </button>
        <button className="demo-btn secondary" onClick={() => openPanel('noCloseBtn')}>
          No close button
        </button>
      </div>

      {/* Right (default) */}
      <SidePanel
        open={open.right}
        onOpenChange={(v) => setOpen((s) => ({ ...s, right: v }))}
        side="right"
        onOpened={() => console.log('Panel opened')}
        onClosed={() => console.log('Panel closed')}
      >
        <div className="demo-panel-content">
          <h2>Right panel</h2>
          <p>Default side panel from the right. Click the overlay or the X to close.</p>
        </div>
      </SidePanel>

      {/* Left */}
      <SidePanel open={open.left} onOpenChange={(v) => setOpen((s) => ({ ...s, left: v }))} side="left">
        <div className="demo-panel-content">
          <h2>Left panel</h2>
          <p>Panel sliding in from the left.</p>
        </div>
      </SidePanel>

      {/* Top */}
      <SidePanel open={open.top} onOpenChange={(v) => setOpen((s) => ({ ...s, top: v }))} side="top" height="40%">
        <div className="demo-panel-content">
          <h2>Top panel</h2>
          <p>Panel from the top with fixed height.</p>
        </div>
      </SidePanel>

      {/* Bottom */}
      <SidePanel open={open.bottom} onOpenChange={(v) => setOpen((s) => ({ ...s, bottom: v }))} side="bottom" height="50%">
        <div className="demo-panel-content">
          <h2>Bottom panel</h2>
          <p>Panel from the bottom.</p>
        </div>
      </SidePanel>

      {/* Header + Footer */}
      <SidePanel
        open={open.withHeaderFooter}
        onOpenChange={(v) => setOpen((s) => ({ ...s, withHeaderFooter: v }))}
        side="right"
        width="420px"
        header={
          <div style={{ padding: '1rem', borderBottom: '1px solid #eee', fontWeight: 600 }}>
            Panel with header & footer
          </div>
        }
        footer={
          <div className="demo-footer">
            <button type="button" onClick={() => closePanel('withHeaderFooter')}>
              Done
            </button>
          </div>
        }
      >
        <div className="demo-panel-content">
          <p>Body content between header and footer. Scroll if content is long.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
      </SidePanel>

      {/* No overlay close */}
      <SidePanel
        open={open.noClose}
        onOpenChange={(v) => setOpen((s) => ({ ...s, noClose: v }))}
        side="right"
        noClose
      >
        <div className="demo-panel-content">
          <h2>No overlay close</h2>
          <p>Clicking the overlay does not close this panel. Use the X button.</p>
        </div>
      </SidePanel>

      {/* Lock scroll */}
      <SidePanel
        open={open.lockScroll}
        onOpenChange={(v) => setOpen((s) => ({ ...s, lockScroll: v }))}
        side="right"
        lockScroll
      >
        <div className="demo-panel-content">
          <h2>Lock scroll</h2>
          <p>Body scroll is locked when this panel is open. Scroll inside the panel only.</p>
        </div>
      </SidePanel>

      {/* Custom width */}
      <SidePanel
        open={open.customWidth}
        onOpenChange={(v) => setOpen((s) => ({ ...s, customWidth: v }))}
        side="right"
        width="min(400px, 90vw)"
      >
        <div className="demo-panel-content">
          <h2>Custom width</h2>
          <p>Width: min(400px, 90vw).</p>
        </div>
      </SidePanel>

      {/* No close button */}
      <SidePanel
        open={open.noCloseBtn}
        onOpenChange={(v) => setOpen((s) => ({ ...s, noCloseBtn: v }))}
        side="right"
        hideCloseBtn
      >
        <div className="demo-panel-content">
          <h2>No close button</h2>
          <p>Close button is hidden. Close via overlay or your own control.</p>
          <button type="button" className="demo-btn" onClick={() => closePanel('noCloseBtn')}>
            Close
          </button>
        </div>
      </SidePanel>
    </div>
  );
}
