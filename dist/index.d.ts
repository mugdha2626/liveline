import * as react_jsx_runtime from 'react/jsx-runtime';
import { CSSProperties, ReactElement } from 'react';

interface LivelinePoint {
    time: number;
    value: number;
}
type Momentum = 'up' | 'down' | 'flat';
type ThemeMode = 'light' | 'dark';
type WindowStyle = 'default' | 'rounded' | 'text';
type BadgeVariant = 'default' | 'minimal';
interface ReferenceLine {
    value: number;
    label?: string;
}
interface HoverPoint {
    time: number;
    value: number;
    x: number;
    y: number;
}
interface Padding {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}
interface WindowOption {
    label: string;
    secs: number;
}
interface OrderbookData {
    bids: [number, number][];
    asks: [number, number][];
}
interface DegenOptions {
    /** Multiplier for particle count and size (default 1) */
    scale?: number;
    /** Show particles on down-momentum swings (default false) */
    downMomentum?: boolean;
}
interface LivelineSeries {
    id: string;
    data: LivelinePoint[];
    value: number;
    color: string;
    label?: string;
}
interface LivelineProps {
    data: LivelinePoint[];
    value: number;
    series?: LivelineSeries[];
    theme?: ThemeMode;
    color?: string;
    window?: number;
    grid?: boolean;
    badge?: boolean;
    momentum?: boolean | Momentum;
    fill?: boolean;
    loading?: boolean;
    paused?: boolean;
    emptyText?: string;
    scrub?: boolean;
    exaggerate?: boolean;
    showValue?: boolean;
    valueMomentumColor?: boolean;
    degen?: boolean | DegenOptions;
    badgeTail?: boolean;
    windows?: WindowOption[];
    onWindowChange?: (secs: number) => void;
    windowStyle?: WindowStyle;
    badgeVariant?: BadgeVariant;
    tooltipY?: number;
    tooltipOutline?: boolean;
    orderbook?: OrderbookData;
    referenceLine?: ReferenceLine;
    formatValue?: (v: number) => string;
    formatTime?: (t: number) => string;
    lerpSpeed?: number;
    padding?: Padding;
    onHover?: (point: HoverPoint | null) => void;
    /** Override any resolved palette color/font; merged over the theme palette. */
    palette?: Partial<LivelinePalette>;
    /** Per-frame scale + head position, for aligning custom React/SVG overlays. */
    onViewport?: (v: Viewport) => void;
    cursor?: string;
    pulse?: boolean;
    lineWidth?: number;
    mode?: 'line' | 'candle';
    candles?: CandlePoint[];
    candleWidth?: number;
    liveCandle?: CandlePoint;
    lineMode?: boolean;
    lineData?: LivelinePoint[];
    lineValue?: number;
    onModeChange?: (mode: 'line' | 'candle') => void;
    onSeriesToggle?: (id: string, visible: boolean) => void;
    seriesToggleCompact?: boolean;
    className?: string;
    style?: CSSProperties;
}
interface CandlePoint {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
}
interface LivelinePalette {
    line: string;
    lineWidth: number;
    fillTop: string;
    fillBottom: string;
    gridLine: string;
    gridLabel: string;
    dotUp: string;
    dotDown: string;
    dotFlat: string;
    glowUp: string;
    glowDown: string;
    glowFlat: string;
    badgeOuterBg: string;
    badgeOuterShadow: string;
    badgeBg: string;
    badgeText: string;
    dashLine: string;
    refLine: string;
    refLabel: string;
    timeLabel: string;
    crosshairLine: string;
    tooltipBg: string;
    tooltipText: string;
    tooltipBorder: string;
    bgRgb: [number, number, number];
    labelFont: string;
    valueFont: string;
    badgeFont: string;
}
interface ChartLayout {
    w: number;
    h: number;
    pad: Required<Padding>;
    chartW: number;
    chartH: number;
    leftEdge: number;
    rightEdge: number;
    minVal: number;
    maxVal: number;
    valRange: number;
    toX: (t: number) => number;
    toY: (v: number) => number;
}
/**
 * A snapshot of the current draw scale, emitted each frame via `onViewport`.
 * Lets a consumer position custom overlays (head markers, target lines,
 * crosshairs) in perfect alignment with the canvas.
 */
interface Viewport {
    /** Map a unix-seconds timestamp to a canvas x pixel. */
    toX: (t: number) => number;
    /** Map a value to a canvas y pixel. */
    toY: (v: number) => number;
    /** Unix seconds at the left/right visible edges. */
    leftEdge: number;
    rightEdge: number;
    /** Value range currently displayed on the y-axis. */
    minVal: number;
    maxVal: number;
    /** Plot-area (inside padding) and full canvas dimensions. */
    chartW: number;
    chartH: number;
    w: number;
    h: number;
    pad: Required<Padding>;
    /** Unix seconds at the live head, and the eased value drawn there. */
    now: number;
    headValue: number;
}

declare function Liveline({ data, value, series: seriesProp, theme, color, window: windowSecs, grid, badge, momentum, fill, scrub, loading, paused, emptyText, exaggerate, degen: degenProp, badgeTail, badgeVariant, showValue, valueMomentumColor, windows, onWindowChange, windowStyle, tooltipY, tooltipOutline, orderbook, referenceLine, formatValue, formatTime, lerpSpeed, padding: paddingOverride, onHover, palette: paletteOverride, onViewport, cursor, pulse, mode, candles, candleWidth, liveCandle, lineMode, lineData, lineValue, onModeChange, onSeriesToggle, seriesToggleCompact, lineWidth, className, style, }: LivelineProps): react_jsx_runtime.JSX.Element;

interface LivelineTransitionProps {
    /** Key of the active child to display. Must match a child's `key` prop. */
    active: string;
    /** Chart elements with unique `key` props */
    children: ReactElement | ReactElement[];
    /** Cross-fade duration in ms (default 300) */
    duration?: number;
    className?: string;
    style?: CSSProperties;
}
/**
 * Cross-fade between chart components (e.g. line ↔ candlestick).
 * Children must have unique `key` props matching possible `active` values.
 *
 * @example
 * ```tsx
 * <LivelineTransition active={chartType}>
 *   <Liveline key="line" data={data} value={value} />
 *   <Liveline key="candle" mode="candle" candles={candles} candleWidth={5} data={data} value={value} />
 * </LivelineTransition>
 * ```
 */
declare function LivelineTransition({ active, children, duration, className, style, }: LivelineTransitionProps): react_jsx_runtime.JSX.Element;

export { type BadgeVariant, type CandlePoint, type ChartLayout, type DegenOptions, type HoverPoint, Liveline, type LivelinePalette, type LivelinePoint, type LivelineProps, type LivelineSeries, LivelineTransition, type LivelineTransitionProps, type Momentum, type OrderbookData, type Padding, type ReferenceLine, type ThemeMode, type Viewport, type WindowOption, type WindowStyle };
