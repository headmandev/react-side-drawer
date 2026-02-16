import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useLayoutEffect,
} from 'react';
import { createPortal } from 'react-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { SidePanelCloseButton } from './SidePanelCloseButton';
import './styles.css';

export type SidePanelSide = 'top' | 'right' | 'bottom' | 'left';

export interface SidePanelProps {
  /** Controlled open state */
  open: boolean;
  /** Called when open state should change (e.g. close requested) */
  onOpenChange: (open: boolean) => void;
  /** Called after panel leave transition finishes */
  onClosed?: () => void;
  /** Called after panel enter transition finishes */
  onOpened?: () => void;
  /** Id for the portal container element. Default "rsp-container" */
  idName?: string;
  /** Hide the default close button */
  hideCloseBtn?: boolean;
  /** Prevent closing when clicking overlay */
  noClose?: boolean;
  /** Which side the panel slides from */
  side?: SidePanelSide;
  /** When true, panel content is unmounted when closed (rerender on open) */
  rerender?: boolean;
  /** z-index of overlay and panel, or "auto" to use max z-index on page */
  zIndex?: number | 'auto';
  /** Panel width (for left/right) */
  width?: string;
  /** Panel height (for top/bottom) */
  height?: string;
  /** Lock body scroll when open */
  lockScroll?: boolean;
  /** Also set overflow hidden on html when locking scroll */
  lockScrollHtml?: boolean;
  /** Overlay background color */
  overlayColor?: string;
  /** Overlay opacity 0–1 */
  overlayOpacity?: number;
  /** Overlay transition duration in ms */
  overlayDuration?: number;
  /** Panel background color */
  panelColor?: string;
  /** Panel transition duration in ms */
  panelDuration?: number;
  /** Custom transition name (default is slide-{side}) */
  transitionName?: string;
  /** Class for header container */
  headerClass?: string;
  /** Class for body container */
  bodyClass?: string;
  /** Class for footer container */
  footerClass?: string;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Body content (children) */
  children?: React.ReactNode;
  /** Additional class for the panel root */
  className?: string;
  /** Inline styles for the panel root */
  style?: React.CSSProperties;
}

const getMaxZIndex = (): number =>
  Math.max(
    ...Array.from(document.querySelectorAll('body *'))
      .map((el) => parseFloat(window.getComputedStyle(el).zIndex))
      .filter((z) => !Number.isNaN(z)),
    0
  );

export function SidePanel({
  open,
  onOpenChange,
  onClosed,
  onOpened,
  idName = 'rsp-container',
  hideCloseBtn = false,
  noClose = false,
  side = 'right',
  rerender = false,
  zIndex: zIndexProp = 'auto',
  width = 'auto',
  height = 'auto',
  lockScroll = false,
  lockScrollHtml = true,
  overlayColor = 'black',
  overlayOpacity = 0.5,
  overlayDuration = 500,
  panelColor = 'white',
  panelDuration = 300,
  transitionName,
  headerClass = '',
  bodyClass = '',
  footerClass = '',
  header,
  footer,
  children,
  className = '',
  style: styleProp,
}: SidePanelProps) {
  const [zIndex, setZIndex] = useState<number>(0);
  const [isExiting, setIsExiting] = useState(false);
  const [overlayPhase, setOverlayPhase] = useState<'enter' | 'leave' | null>(null);
  const [panelPhase, setPanelPhase] = useState<'enter' | 'leave' | null>(null);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  const [footerHeight, setFooterHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [bodyScrollHeight, setBodyScrollHeight] = useState(0);
  const [panelHeight, setPanelHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const isBodyAlreadyLockedRef = useRef(false);
  const wasOpenRef = useRef(false);
  const containerCreatedByUsRef = useRef(false);
  const lockedElementRef = useRef<HTMLElement | null>(null);

  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  const transition = transitionName ?? `slide-${side}`;
  const visible = open || isExiting;

  const closePanel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const calculateSizes = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerHeight > 0) {
      setWindowHeight(window.innerHeight);
    }
    setFooterHeight(footerRef.current?.clientHeight ?? 0);
    setHeaderHeight(headerRef.current?.clientHeight ?? 0);
    setBodyScrollHeight(bodyRef.current?.scrollHeight ?? 0);
    setPanelHeight(panelRef.current?.clientHeight ?? 0);
  }, []);

  const lockUnlockBodyScroll = useCallback(
    (elem: HTMLElement | null, lock: boolean) => {
      if (!elem) return;
      if (lock) {
        lockedElementRef.current = elem;
        setTimeout(() => {
          disableBodyScroll(elem, { reserveScrollBarGap: true });
          if (lockScrollHtml) {
            document.documentElement.style.overflow = 'hidden';
          }
        }, 0);
        return;
      }
      enableBodyScroll(elem);
      if (lockScrollHtml) {
        document.documentElement.style.removeProperty('overflow');
      }
      lockedElementRef.current = null;
    },
    [lockScrollHtml]
  );

  // Set z-index on mount (use max+1 so panel always stacks on top)
  useEffect(() => {
    setZIndex(zIndexProp === 'auto' ? getMaxZIndex() + 1 : zIndexProp);
  }, [zIndexProp, open]);

  // Create or find portal container in layout effect so it exists before paint
  useLayoutEffect(() => {
    if (typeof document === 'undefined') return;
    let el = document.getElementById(idName);
    if (!el) {
      el = document.createElement('div');
      el.setAttribute('id', idName);
      document.body.appendChild(el);
      containerCreatedByUsRef.current = true;
    }
    setPortalContainer(el);
    return () => {
      if (containerCreatedByUsRef.current && el?.parentNode) {
        document.body.removeChild(el);
        containerCreatedByUsRef.current = false;
      }
    };
  }, [idName]);

  // Enter/exit phases and scroll lock. useLayoutEffect so we set isExiting/leave before
  // paint — avoids one frame where visible=false and overlay/panel unmount then remount (flash).
  useLayoutEffect(() => {
    const panelEl = panelRef.current;

    if (open) {
      wasOpenRef.current = true;
      isBodyAlreadyLockedRef.current = !!document.body.style.overflow;
      setOverlayPhase('enter');
      setPanelPhase('enter');
      setIsExiting(false);
      if (lockScroll && panelEl) {
        lockUnlockBodyScroll(panelEl, true);
      }
      calculateSizes();
      openedTimeoutRef.current = setTimeout(() => {
        onOpened?.();
      }, Math.max(overlayDuration, panelDuration));
    } else {
      if (openedTimeoutRef.current) {
        clearTimeout(openedTimeoutRef.current);
        openedTimeoutRef.current = null;
      }
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        setOverlayPhase('leave');
        setPanelPhase('leave');
        setIsExiting(true);
      }
      if (!lockScroll || isBodyAlreadyLockedRef.current) {
        // no scroll lock to restore
      } else {
        const elToUnlock = lockedElementRef.current;
        closedTimeoutRef.current = setTimeout(() => {
          if (elToUnlock) lockUnlockBodyScroll(elToUnlock, false);
        }, panelDuration);
      }
    }
  }, [open, lockScroll, overlayDuration, panelDuration, onOpened, calculateSizes, lockUnlockBodyScroll]);

  // Clear exit state after leave animation; also unlock scroll here as fallback
  useEffect(() => {
    if (!open && isExiting) {
      exitTimeoutRef.current = setTimeout(() => {
        const elToUnlock = lockedElementRef.current;
        if (elToUnlock) lockUnlockBodyScroll(elToUnlock, false);
        setIsExiting(false);
        setOverlayPhase(null);
        setPanelPhase(null);
        onClosed?.();
      }, Math.max(overlayDuration, panelDuration));
    }
    return () => {
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
      if (openedTimeoutRef.current) clearTimeout(openedTimeoutRef.current);
      if (closedTimeoutRef.current) clearTimeout(closedTimeoutRef.current);
    };
  }, [open, isExiting, overlayDuration, panelDuration, onClosed, lockUnlockBodyScroll]);

  // Resize listener when open
  useEffect(() => {
    if (!open) return;
    window.addEventListener('resize', calculateSizes);
    return () => window.removeEventListener('resize', calculateSizes);
  }, [open, calculateSizes]);

  // Initial size calc when refs/visibility change
  useLayoutEffect(() => {
    if (visible) {
      calculateSizes();
    }
  }, [visible, side, width, height, header, footer, children, calculateSizes]);

  // Cleanup scroll lock on unmount or when open becomes false (cancel scheduled unlock to avoid double enableBodyScroll)
  useEffect(() => {
    return () => {
      if (closedTimeoutRef.current) {
        clearTimeout(closedTimeoutRef.current);
        closedTimeoutRef.current = null;
      }
      const elToUnlock = lockedElementRef.current;
      if (lockScroll && elToUnlock && open) {
        lockUnlockBodyScroll(elToUnlock, false);
      }
    };
  }, [lockScroll, open, lockUnlockBodyScroll]);

  const bodyHeight = useMemo(() => {
    if (!panelHeight) return undefined;
    const panelMaxHeight = bodyScrollHeight + headerHeight + footerHeight;
    let h = panelHeight - headerHeight - footerHeight;
    if ((side === 'top' || side === 'bottom') && height === 'auto') {
      h =
        windowHeight >= panelMaxHeight
          ? bodyScrollHeight
          : windowHeight - headerHeight - footerHeight;
    }
    return h;
  }, [
    panelHeight,
    bodyScrollHeight,
    headerHeight,
    footerHeight,
    windowHeight,
    side,
    height,
  ]);

  const overlayStyles: React.CSSProperties = useMemo(
    () => ({
      zIndex,
      animationDuration: `${overlayDuration}ms`,
      ['--overlay-opacity' as string]: overlayOpacity,
      opacity: overlayPhase === 'enter' ? overlayOpacity : 0,
      backgroundColor: overlayColor,
      pointerEvents: overlayPhase === 'enter' ? 'all' : 'none',
    }),
    [zIndex, overlayDuration, overlayOpacity, overlayColor, overlayPhase]
  );

  const panelStyles: React.CSSProperties = useMemo(() => {
    const base: React.CSSProperties = {
      zIndex,
      backgroundColor: panelColor,
      animationDuration: `${panelDuration}ms`,
      maxWidth: '100%',
      ...styleProp,
    };
    if (side === 'left' || side === 'right') {
      base.width = width;
    } else {
      base.height = height;
      base.maxHeight = '100%';
    }
    return base;
  }, [zIndex, panelColor, panelDuration, side, width, height, styleProp]);

  const overlayTransitionClass =
    overlayPhase === 'enter'
      ? 'overlay-enter-active'
      : overlayPhase === 'leave'
        ? 'overlay-leave-active'
        : '';
  const panelTransitionClass =
    panelPhase === 'enter'
      ? `${transition}-enter-active`
      : panelPhase === 'leave'
        ? `${transition}-leave-active`
        : '';

  if (!portalContainer) return null;

  const panelContent = (
    <div
      ref={panelRef}
      className={`rsp rsp--${side}-side ${panelTransitionClass} ${className}`.trim()}
      style={panelStyles}
    >
      {header != null && (
        <div
          ref={headerRef}
          className={[headerClass, 'rsp__header'].filter(Boolean).join(' ')}
        >
          {header}
        </div>
      )}
      <div
        ref={bodyRef}
        className={[bodyClass, 'rsp__body'].filter(Boolean).join(' ')}
        style={{ height: bodyHeight != null ? `${bodyHeight}px` : undefined }}
      >
        {children}
        {!hideCloseBtn && <SidePanelCloseButton onClose={closePanel} />}
      </div>
      {footer != null && (
        <div
          ref={footerRef}
          className={[footerClass, 'rsp__footer'].filter(Boolean).join(' ')}
        >
          {footer}
        </div>
      )}
    </div>
  );

  const showPanel = visible && (!rerender || open);

  const content = (
    <div className={`rsp-wrapper${visible ? ' rsp-wrapper--active' : ''}`}>
      {visible && (
        <div
          ref={overlayRef}
          className={`rsp-overlay ${overlayTransitionClass}`}
          style={overlayStyles}
          onClick={() => !noClose && closePanel()}
          role="presentation"
          aria-hidden="true"
        />
      )}
      {showPanel && panelContent}
    </div>
  );

  return createPortal(content, portalContainer);
}

SidePanel.displayName = 'SidePanel';
