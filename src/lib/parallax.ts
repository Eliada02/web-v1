/**
 * A single, app-wide scroll/resize controller for parallax layers.
 *
 * Why a singleton?
 *  - One `scroll` listener + one `requestAnimationFrame` loop drives *every*
 *    layer on the page, instead of each layer attaching its own. This is the
 *    single biggest performance win when you have multiple parallax elements.
 *  - Scroll events fire far more often than the screen repaints (60–120 Hz).
 *    We coalesce every burst of scroll events into at most one rAF callback,
 *    so we do the work once per frame, perfectly in sync with paint.
 */

export interface ParallaxFrame {
  scrollX: number;
  scrollY: number;
  viewportWidth: number;
  viewportHeight: number;
}

/** Called once per animation frame with the current scroll position. */
type FrameListener = (frame: ParallaxFrame) => void;
/** Called when geometry may have changed (mount, resize) so layers re-measure. */
type MeasureListener = () => void;

class ParallaxScrollManager {
  private frameListeners = new Set<FrameListener>();
  private measureListeners = new Set<MeasureListener>();
  private rafId: number | null = null;
  private active = false;

  private frame: ParallaxFrame = {
    scrollX: 0,
    scrollY: 0,
    viewportWidth: 0,
    viewportHeight: 0,
  };

  /**
   * Register a layer. Returns an unsubscribe function — call it on unmount.
   * The listeners are invoked immediately so the layer is positioned correctly
   * on first paint (no flash of un-parallaxed content).
   */
  subscribe(onFrame: FrameListener, onMeasure: MeasureListener): () => void {
    if (this.frameListeners.size === 0) this.activate();

    this.frameListeners.add(onFrame);
    this.measureListeners.add(onMeasure);

    onMeasure();
    onFrame(this.frame);

    return () => {
      this.frameListeners.delete(onFrame);
      this.measureListeners.delete(onMeasure);
      // Tear down global listeners once nothing is using them.
      if (this.frameListeners.size === 0) this.deactivate();
    };
  }

  private activate() {
    if (this.active || typeof window === "undefined") return;
    this.active = true;
    this.readViewport();
    this.frame.scrollX = window.scrollX;
    this.frame.scrollY = window.scrollY;
    // `passive: true` lets the browser scroll without waiting on our handler.
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    window.addEventListener("resize", this.handleResize);
  }

  private deactivate() {
    if (!this.active) return;
    this.active = false;
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private readViewport() {
    this.frame.viewportWidth = window.innerWidth;
    this.frame.viewportHeight = window.innerHeight;
  }

  private handleScroll = () => this.requestTick();

  private handleResize = () => {
    this.readViewport();
    // Element boxes can move/resize on a resize → let every layer re-measure,
    // then schedule a repaint with the new geometry.
    this.measureListeners.forEach((listener) => listener());
    this.requestTick();
  };

  /** Coalesce any number of scroll events into a single frame of work. */
  private requestTick() {
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(this.tick);
  }

  private tick = () => {
    this.rafId = null;
    // One cheap layout read per frame, batched before all the writes below.
    this.frame.scrollX = window.scrollX;
    this.frame.scrollY = window.scrollY;
    this.frameListeners.forEach((listener) => listener(this.frame));
  };
}

/** Shared instance used by every parallax layer. */
export const parallaxManager = new ParallaxScrollManager();
