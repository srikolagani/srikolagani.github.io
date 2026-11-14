import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const MASTER_GAIN = 0.75;
const STORAGE_MUTE_KEY = 'f1-race-muted';
const TARGET_LAPS = 3;

class F1AudioEngine {
  muted = false;
  ctx: AudioContext | null = null;
  master: GainNode | null = null;
  noiseBuf: AudioBuffer | null = null;
  engineOsc: OscillatorNode | null = null;
  engineGain: GainNode | null = null;
  wantEngine = false;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.muted = localStorage.getItem(STORAGE_MUTE_KEY) === '1';
      } catch {
        // ignore storage errors
      }
      document.addEventListener('visibilitychange', () => {
        if (this.ctx) {
          if (document.hidden) {
            this.ctx.suspend();
          } else {
            this.ctx.resume();
          }
        }
      });
    }
  }

  unlock() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : MASTER_GAIN;
      this.master.connect(this.ctx.destination);

      const sr = this.ctx.sampleRate;
      const buf = this.ctx.createBuffer(1, sr, sr);
      const data = buf.getChannelData(0);
      for (let i = 0; i < sr; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      this.noiseBuf = buf;
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.wantEngine) {
      this.startEngineHum();
    }
  }

  setMuted(nextMuted: boolean) {
    this.muted = nextMuted;
    try {
      localStorage.setItem(STORAGE_MUTE_KEY, nextMuted ? '1' : '0');
    } catch {
      // ignore
    }
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(nextMuted ? 0 : MASTER_GAIN, this.ctx.currentTime, 0.02);
    }
  }

  play = (sfx: string, intensity = 1) => {
    if (this.muted || !this.ctx || !this.master || this.ctx.state === 'closed') return;
    const vol = Math.max(0.15, Math.min(1, intensity));
    switch (sfx) {
      case 'redLight':
        this.tone(440, 440, 0.12, 'square', 0.14);
        break;
      case 'lightsOut':
        this.tone(880, 920, 0.28, 'sawtooth', 0.18);
        this.tone(1760, 1760, 0.25, 'triangle', 0.12);
        break;
      case 'drs':
        this.noise(0.14, 0.35 * vol, 'bandpass', 1400, 2600);
        this.tone(240, 620, 0.18, 'sawtooth', 0.22 * vol);
        break;
      case 'kerb':
        this.tone(130, 85, 0.06, 'square', 0.18 * vol);
        break;
      case 'bump':
        this.noise(0.08, 0.4 * vol, 'lowpass', 700, 200);
        this.tone(110, 50, 0.09, 'sine', 0.32 * vol);
        break;
      case 'lap':
        [587, 784, 1047].forEach((freq, idx) =>
          this.tone(freq, freq, 0.12, 'triangle', 0.14, idx * 0.07)
        );
        break;
      case 'win':
        this.noise(1.5, 0.35, 'bandpass', 800, 1400, 0.1, 0.2);
        [523, 659, 784, 1047, 1319].forEach((freq, idx) =>
          this.tone(freq, freq, 0.22, 'triangle', 0.15, 0.15 + idx * 0.11)
        );
        this.tone(1047, 1047, 0.65, 'triangle', 0.12, 0.75);
        this.tone(1319, 1319, 0.65, 'triangle', 0.1, 0.75);
        break;
      case 'lose':
        [392, 349, 311, 261].forEach((freq, idx) =>
          this.tone(freq, freq * 0.96, 0.28, 'sawtooth', 0.11, 0.15 + idx * 0.22)
        );
        break;
    }
  };

  tone(
    freqStart: number,
    freqEnd: number,
    duration: number,
    type: OscillatorType,
    gainVal: number,
    delay = 0
  ) {
    if (!this.ctx || !this.master) return;
    const t0 = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freqStart, t0);
    if (freqEnd !== freqStart) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(1, freqEnd), t0 + duration);
    }
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, gainVal), t0 + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  }

  noise(
    duration: number,
    gainVal: number,
    filterType: BiquadFilterType,
    freqStart: number,
    freqEnd: number,
    delay = 0,
    attack = 0.005
  ) {
    if (!this.ctx || !this.master || !this.noiseBuf) return;
    const t0 = this.ctx.currentTime + delay;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.loop = true;
    const filter = this.ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.setValueAtTime(freqStart, t0);
    if (freqEnd !== freqStart) {
      filter.frequency.exponentialRampToValueAtTime(freqEnd, t0 + duration);
    }
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, gainVal), t0 + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    src.start(t0, Math.random() * 0.4);
    src.stop(t0 + duration + 0.02);
  }

  setEngineActive(active: boolean) {
    this.wantEngine = active;
    if (active) {
      this.startEngineHum();
    } else {
      this.stopEngineHum();
    }
  }

  setEnginePitch(normSpeed: number) {
    if (!this.engineOsc || !this.ctx) return;
    const targetFreq = 75 + normSpeed * 165;
    this.engineOsc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.05);
  }

  startEngineHum() {
    if (this.engineOsc || !this.ctx || !this.master) return;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = 85;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 340;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.035, this.ctx.currentTime + 0.4);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    osc.start();
    this.engineOsc = osc;
    this.engineGain = gain;
  }

  stopEngineHum() {
    if (!this.engineOsc || !this.engineGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    this.engineGain.gain.cancelScheduledValues(now);
    this.engineGain.gain.setValueAtTime(Math.max(0.0001, this.engineGain.gain.value), now);
    this.engineGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
    this.engineOsc.stop(now + 0.3);
    this.engineOsc = null;
    this.engineGain = null;
  }
}

const f1Audio = new F1AudioEngine();

const PIXEL_FONT: Record<string, string> = {
  A: '010101111101101',
  B: '110101110101110',
  C: '011100100100011',
  D: '110101101101110',
  E: '111100110100111',
  F: '111100110100100',
  G: '011100101101011',
  H: '101101111101101',
  I: '111010010010111',
  J: '001001001101010',
  K: '101101110101101',
  L: '100100100100111',
  M: '101111111101101',
  N: '110101101101101',
  O: '010101101101010',
  P: '110101110100100',
  Q: '010101101110011',
  R: '110101110101101',
  S: '011100010001110',
  T: '111010010010010',
  U: '101101101101111',
  V: '101101101101010',
  W: '101101111111101',
  X: '101101010101101',
  Y: '101101010010010',
  Z: '111001010100111',
  '0': '111101101101111',
  '1': '010110010010111',
  '2': '110001010100111',
  '3': '110001010001110',
  '4': '101101111001001',
  '5': '111100110001110',
  '6': '011100111101111',
  '7': '111001010010010',
  '8': '111101111101111',
  '9': '111101111001110',
  '!': '010010010000010',
  ':': '000010000010000',
  '-': '000000111000000',
  '.': '000000000000010',
  '/': '001001010100100',
};

function measurePixelText(text: string, scale: number): number {
  return Math.max(0, text.length * 4 * scale - scale);
}

function drawPixelText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  scale: number,
  color: string,
  shadowColor?: string
) {
  const drawPass = (dx: number, dy: number, fill: string) => {
    ctx.fillStyle = fill;
    let cx = x + dx;
    for (const ch of text.toUpperCase()) {
      const glyph = PIXEL_FONT[ch];
      if (glyph) {
        for (let i = 0; i < 15; i++) {
          if (glyph[i] === '1') {
            ctx.fillRect(cx + (i % 3) * scale, y + dy + Math.floor(i / 3) * scale, scale, scale);
          }
        }
      }
      cx += 4 * scale;
    }
  };
  if (shadowColor) drawPass(0, scale, shadowColor);
  drawPass(0, 0, color);
}

export interface RaceControls {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  drs: boolean;
}

const emptyControls = (): RaceControls => ({
  up: false,
  down: false,
  left: false,
  right: false,
  drs: false,
});

export interface RaceUiState {
  phase: 'ready' | 'countdown' | 'race' | 'over';
  youLaps: number;
  sriLaps: number;
  winner: 'you' | 'sri' | null;
  redLights: number;
  drsCharge: number;
}

interface CarState {
  id: 'you' | 'sri';
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  distance: number;
  laps: number;
  drsEnergy: number;
  drsActive: number;
  primaryColor: string;
  secondaryColor: string;
  helmetColor: string;
  aiTargetY: number;
  aiCooldown: number;
}

interface ObstacleCar {
  x: number;
  y: number;
  speed: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

class F1GameSimulation {
  W: number;
  H: number;
  demo: boolean;
  phase: 'ready' | 'countdown' | 'race' | 'over' = 'ready';
  winner: 'you' | 'sri' | null = null;
  trackTop: number;
  trackBottom: number;
  lapLength = 1900;
  cameraX = 0;
  frame = 0;
  phaseTick = 0;
  redLights = 0;
  shake = 0;
  flash = { text: '', t: 0, color: '#ffffff' };
  ctl: RaceControls = emptyControls();
  you: CarState;
  sri: CarState;
  backmarkers: ObstacleCar[] = [];
  particles: Particle[] = [];
  sfx: ((name: string, vol?: number) => void) | null = null;
  sfxLast: Record<string, number> = {};

  constructor(w: number, h: number, opts: { demo?: boolean } = {}) {
    this.W = w;
    this.H = h;
    this.demo = !!opts.demo;
    this.trackTop = Math.max(26, Math.round(h * 0.32));
    this.trackBottom = h - Math.max(10, Math.round(h * 0.1));

    this.you = this.createCar('you', 'YOU', '#ef4444', '#fca5a5', '#facc15', 0);
    this.sri = this.createCar('sri', 'SRI', '#00b4d8', '#90e0ef', '#f472b6', 1);

    this.resetPositions();
    if (this.demo) {
      this.beginRace();
    }
  }

  createCar(
    id: 'you' | 'sri',
    name: string,
    primaryColor: string,
    secondaryColor: string,
    helmetColor: string,
    laneIdx: number
  ): CarState {
    const trackH = this.trackBottom - this.trackTop;
    const y = this.trackTop + trackH * (laneIdx === 0 ? 0.34 : 0.68);
    return {
      id,
      name,
      x: 34,
      y,
      vx: 0,
      vy: 0,
      distance: 0,
      laps: 0,
      drsEnergy: 100,
      drsActive: 0,
      primaryColor,
      secondaryColor,
      helmetColor,
      aiTargetY: y,
      aiCooldown: 0,
    };
  }

  emit(name: string, vol = 1, cooldown = 0) {
    if (!this.sfx) return;
    if (this.frame - (this.sfxLast[name] ?? -999) < cooldown) return;
    this.sfxLast[name] = this.frame;
    this.sfx(name, vol);
  }

  setControls(c: RaceControls) {
    this.ctl = c;
  }

  ui(): RaceUiState {
    return {
      phase: this.phase,
      youLaps: Math.min(TARGET_LAPS, this.you.laps),
      sriLaps: Math.min(TARGET_LAPS, this.sri.laps),
      winner: this.winner,
      redLights: this.redLights,
      drsCharge: Math.round(this.you.drsEnergy),
    };
  }

  resetPositions() {
    const trackH = this.trackBottom - this.trackTop;
    this.you.y = this.trackTop + trackH * 0.33;
    this.sri.y = this.trackTop + trackH * 0.68;
    this.you.vx = 0;
    this.you.vy = 0;
    this.sri.vx = 0;
    this.sri.vy = 0;
    this.you.distance = 0;
    this.sri.distance = 0;
    this.you.laps = 0;
    this.sri.laps = 0;
    this.you.drsEnergy = 100;
    this.sri.drsEnergy = 100;
    this.you.drsActive = 0;
    this.sri.drsActive = 0;
    this.cameraX = 0;
    this.backmarkers = [];
    this.spawnBackmarkers();
  }

  spawnBackmarkers() {
    const colors = ['#f97316', '#10b981', '#a855f7', '#eab308'];
    const trackH = this.trackBottom - this.trackTop;
    for (let i = 1; i <= 14; i++) {
      this.backmarkers.push({
        x: i * 360 + (i % 2) * 90,
        y: this.trackTop + 10 + ((i * 37) % Math.max(16, trackH - 22)),
        speed: 3.1 + (i % 3) * 0.35,
        color: colors[i % colors.length],
      });
    }
  }

  start() {
    if (this.phase === 'ready' || this.phase === 'over') {
      this.winner = null;
      this.resetPositions();
      this.beginRace();
    }
  }

  beginRace() {
    this.phase = 'countdown';
    this.phaseTick = 0;
    this.redLights = 0;
    this.flash = { text: '5 LIGHTS', t: 24, color: '#ef4444' };
  }

  step() {
    this.frame++;

    if (this.phase === 'countdown') {
      this.phaseTick++;
      const stepLen = 22;
      const lightIdx = Math.floor(this.phaseTick / stepLen) + 1;
      if (lightIdx <= 5 && lightIdx !== this.redLights) {
        this.redLights = lightIdx;
        if (!this.demo) this.emit('redLight');
      }
      if (this.phaseTick >= stepLen * 5 + 18) {
        this.redLights = 0;
        this.phase = 'race';
        this.phaseTick = 0;
        if (!this.demo) this.emit('lightsOut');
        this.flash = { text: 'LIGHTS OUT!', t: 42, color: '#4ade80' };
      }
    } else if (this.phase === 'race') {
      this.stepRace();
    } else if (this.phase === 'over') {
      this.phaseTick++;
      if (this.demo && this.phaseTick > 180) {
        this.winner = null;
        this.resetPositions();
        this.beginRace();
      }
    }

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
    }
    this.particles = this.particles.filter((p) => p.life > 0);
    if (this.flash.t > 0 && this.flash.t < 9999) this.flash.t--;
    if (this.shake > 0) this.shake--;
  }

  stepRace() {
    const youInput = this.demo ? this.computeAiInput(this.you) : this.ctl;
    const sriInput = this.computeAiInput(this.sri);

    this.updateCar(this.you, youInput);
    this.updateCar(this.sri, sriInput);

    // Move backmarkers
    for (const bm of this.backmarkers) {
      bm.x += bm.speed;
      for (const car of [this.you, this.sri]) {
        const dx = Math.abs(car.distance + 44 - bm.x);
        const dy = Math.abs(car.y - bm.y);
        if (dx < 20 && dy < 9) {
          car.vx = Math.max(2.4, car.vx * 0.68);
          car.vy += car.y < bm.y ? -1.4 : 1.4;
          this.shake = 7;
          if (!this.demo) this.emit('bump', 0.8, 12);
          for (let i = 0; i < 8; i++) {
            this.particles.push({
              x: car.x + 18,
              y: car.y,
              vx: (Math.random() - 0.5) * 3,
              vy: (Math.random() - 0.5) * 3,
              life: 14,
              color: '#facc15',
              size: 2,
            });
          }
        }
      }
    }

    // Car vs Car wheel-to-wheel rub
    const distDiff = Math.abs(this.you.distance - this.sri.distance);
    const yDiff = Math.abs(this.you.y - this.sri.y);
    if (distDiff < 20 && yDiff < 9) {
      const push = this.you.y < this.sri.y ? -1.1 : 1.1;
      this.you.vy += push;
      this.sri.vy -= push;
      if (!this.demo) this.emit('bump', 0.5, 15);
    }

    // Camera tracks leader/player
    const refDist = this.demo
      ? Math.max(this.you.distance, this.sri.distance)
      : this.you.distance;
    this.cameraX = refDist;

    this.you.x = clamp(42 + (this.you.distance - this.cameraX) * 0.45, 18, this.W - 48);
    this.sri.x = clamp(42 + (this.sri.distance - this.cameraX) * 0.45, 18, this.W - 48);

    if (!this.demo) {
      f1Audio.setEnginePitch(clamp(this.you.vx / 8.5, 0, 1));
    }
  }

  computeAiInput(car: CarState): RaceControls {
    const input = emptyControls();
    input.right = true;
    car.aiCooldown--;

    const trackH = this.trackBottom - this.trackTop;
    // Look ahead for backmarkers
    let threat: ObstacleCar | null = null;
    for (const bm of this.backmarkers) {
      const ahead = bm.x - (car.distance + 44);
      if (ahead > -10 && ahead < 130 && Math.abs(bm.y - car.y) < 13) {
        threat = bm;
        break;
      }
    }

    if (threat) {
      const upperSpace = threat.y - (this.trackTop + 10);
      const lowerSpace = this.trackBottom - 10 - threat.y;
      car.aiTargetY =
        upperSpace > lowerSpace
          ? Math.max(this.trackTop + 10, threat.y - 16)
          : Math.min(this.trackBottom - 10, threat.y + 16);
    } else if (car.aiCooldown <= 0) {
      car.aiCooldown = 25 + Math.floor(Math.random() * 25);
      car.aiTargetY = this.trackTop + 10 + Math.random() * Math.max(12, trackH - 20);
    }

    if (car.y < car.aiTargetY - 2) input.down = true;
    if (car.y > car.aiTargetY + 2) input.up = true;

    // Rubber-banding so races are exciting
    const other = car.id === 'sri' ? this.you : this.sri;
    const behind = other.distance - car.distance;
    if (car.drsEnergy >= 35 && (behind > 25 || Math.random() < 0.03)) {
      input.drs = true;
    }
    return input;
  }

  updateCar(car: CarState, input: RaceControls) {
    const isAi = this.demo || car.id === 'sri';
    const other = car.id === 'sri' ? this.you : this.sri;
    const gap = other.distance - car.distance;
    const rubberBand = isAi ? clamp(1 + gap * 0.00055, 0.91, 1.07) : 1;

    // DRS activation
    if (input.drs && car.drsEnergy >= 20 && car.drsActive <= 0) {
      car.drsActive = 38;
      if (!this.demo && car.id === 'you') this.emit('drs', 0.9, 20);
    }
    if (car.drsActive > 0) {
      car.drsActive--;
      car.drsEnergy = Math.max(0, car.drsEnergy - 1.3);
    } else {
      car.drsEnergy = Math.min(100, car.drsEnergy + 0.32);
    }

    const topSpeed = (car.drsActive > 0 ? 8.3 : 6.4) * rubberBand;
    const accel = input.right ? 0.16 : input.left ? -0.18 : 0.09; // F1 auto-throttles slightly, right/W gives full throttle
    car.vx = clamp(car.vx + accel, 2.2, topSpeed);
    if (!input.right && !isAi) {
      car.vx = Math.max(3.6, car.vx * 0.985);
    }

    const steer = (input.down ? 1 : 0) - (input.up ? 1 : 0);
    car.vy = car.vy * 0.75 + steer * 0.65;
    car.y += car.vy;

    // Kerb collision
    if (car.y < this.trackTop + 6) {
      car.y = this.trackTop + 6;
      car.vy = 0;
      car.vx *= 0.96;
      if (!this.demo && car.id === 'you' && this.frame % 6 === 0) this.emit('kerb', 0.5, 5);
    } else if (car.y > this.trackBottom - 8) {
      car.y = this.trackBottom - 8;
      car.vy = 0;
      car.vx *= 0.96;
      if (!this.demo && car.id === 'you' && this.frame % 6 === 0) this.emit('kerb', 0.5, 5);
    }

    car.distance += car.vx;

    // Exhaust / DRS flame particles
    if (this.frame % (car.drsActive > 0 ? 1 : 3) === 0) {
      this.particles.push({
        x: car.x - 2,
        y: car.y + (Math.random() - 0.5) * 2,
        vx: -car.vx * 0.45 - Math.random() * 1.2,
        vy: (Math.random() - 0.5) * 0.5,
        life: car.drsActive > 0 ? 14 : 9,
        color: car.drsActive > 0 ? (this.frame % 2 === 0 ? '#38bdf8' : '#facc15') : '#94a3b8',
        size: car.drsActive > 0 ? 2 : 1,
      });
    }

    // Lap check
    const newLaps = Math.floor(car.distance / this.lapLength);
    if (newLaps > car.laps) {
      car.laps = newLaps;
      if (car.laps >= TARGET_LAPS && this.phase === 'race') {
        this.phase = 'over';
        this.phaseTick = 0;
        this.winner = car.id;
        if (!this.demo) {
          this.emit(this.winner === 'you' ? 'win' : 'lose');
        }
        const winText = this.demo
          ? this.winner === 'you'
            ? 'VERSTAPPEN WINS'
            : 'SRI WINS GP!'
          : this.winner === 'you'
            ? 'P1! YOU WIN!'
            : 'SRI WINS GP!';
        this.flash = {
          text: winText,
          t: this.demo ? 9999 : 0,
          color: this.winner === 'you' ? '#f87171' : '#38bdf8',
        };
      } else if (!this.demo && car.id === 'you') {
        this.emit('lap');
        this.flash = {
          text: `LAP ${car.laps + 1}/${TARGET_LAPS}`,
          t: 38,
          color: '#facc15',
        };
      }
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    const { W, H, trackTop, trackBottom } = this;
    ctx.save();
    if (this.shake > 0) {
      ctx.translate(Math.round((Math.random() - 0.5) * 2), Math.round((Math.random() - 0.5) * 2));
    }

    // Night Grand Prix sky
    ctx.fillStyle = '#070a14';
    ctx.fillRect(0, 0, W, trackTop);

    // Grandstand & floodlights
    const standTop = Math.max(4, Math.floor(trackTop * 0.22));
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, standTop, W, trackTop - standTop);

    // Crowd pixels scrolling slightly in parallax
    const parallax = Math.floor(this.cameraX * 0.18);
    const crowdColors = ['#ef4444', '#38bdf8', '#facc15', '#f8fafc', '#fb923c'];
    for (let y = standTop + 2; y < trackTop - 7; y += 3) {
      for (let x = 0; x < W; x += 4) {
        const seed = ((x + parallax) * 13 + y * 31) & 255;
        if (seed < 95) {
          ctx.fillStyle = crowdColors[seed % crowdColors.length];
          ctx.fillRect(x, y, 2, 2);
        }
      }
    }

    // Sponsor barrier with scrolling banner
    const barrierY = trackTop - 7;
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, barrierY, W, 7);
    const bannerText = 'SRIKOLAGANI.GITHUB.IO';
    const bannerStep = measurePixelText(bannerText, 1) + 18;
    const bannerOffset = Math.floor(this.cameraX * 0.5) % bannerStep;
    for (let x = -bannerOffset, idx = 0; x < W; x += bannerStep, idx++) {
      drawPixelText(
        ctx,
        bannerText,
        x,
        barrierY + 1,
        1,
        idx % 2 === 0 ? '#ef4444' : '#38bdf8'
     );
    }

    // Asphalt Track
    ctx.fillStyle = '#18181b';
    ctx.fillRect(0, trackTop, W, trackBottom - trackTop);

    // Scrolling asphalt stripes & lane markers
    const kerbW = 8;
    const scrollKerb = Math.floor(this.cameraX * 1.2) % (kerbW * 2);
    for (let x = -scrollKerb; x < W; x += kerbW) {
      const isRed = Math.floor((x + Math.floor(this.cameraX * 1.2)) / kerbW) % 2 === 0;
      ctx.fillStyle = isRed ? '#ef4444' : '#f8fafc';
      ctx.fillRect(x, trackTop, kerbW, 3);
      ctx.fillRect(x, trackBottom - 3, kerbW, 3);
    }

    // Center dashed racing line
    const midY = Math.round((trackTop + trackBottom) / 2);
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    const dashOffset = Math.floor(this.cameraX * 1.2) % 24;
    for (let x = -dashOffset; x < W; x += 24) {
      ctx.fillRect(x, midY, 12, 1);
    }

    // Checkered Start/Finish lines at each lap boundary
    for (let lap = 0; lap <= TARGET_LAPS; lap++) {
      const lineWorldX = lap * this.lapLength;
      const screenX = Math.round(42 + (lineWorldX - this.cameraX) * 0.45);
      if (screenX >= -8 && screenX <= W + 8) {
        for (let y = trackTop + 3; y < trackBottom - 3; y += 3) {
          ctx.fillStyle = ((y / 3) | 0) % 2 === 0 ? '#ffffff' : '#09090b';
          ctx.fillRect(screenX, y, 3, 3);
          ctx.fillStyle = ((y / 3) | 0) % 2 === 0 ? '#09090b' : '#ffffff';
          ctx.fillRect(screenX + 3, y, 3, 3);
        }
      }
    }

    // Bottom pit wall / grass apron
    ctx.fillStyle = '#0b1320';
    ctx.fillRect(0, trackBottom, W, H - trackBottom);

    // Particles
    for (const p of this.particles) {
      ctx.fillStyle = p.color;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
    }

    // Backmarker cars
    for (const bm of this.backmarkers) {
      const sx = Math.round(42 + (bm.x - this.cameraX) * 0.45);
      if (sx >= -24 && sx <= W + 24) {
        this.drawF1Car(ctx, sx, Math.round(bm.y), bm.color, '#e2e8f0', '#ffffff', false);
      }
    }

    // Sort cars by Y so lower car overlaps cleanly
    const cars = [this.you, this.sri].sort((a, b) => a.y - b.y);
    for (const car of cars) {
      this.drawF1Car(
        ctx,
        Math.round(car.x),
        Math.round(car.y),
        car.primaryColor,
        car.secondaryColor,
        car.helmetColor,
        car.drsActive > 0
      );
    }

    if (!this.demo) {
      const labelY = Math.round(this.you.y) - 13;
      drawPixelText(ctx, 'YOU', Math.round(this.you.x) + 2, labelY, 1, '#fca5a5', '#000000');
    }

    this.drawHud(ctx);
    ctx.restore();
  }

  drawF1Car(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    bodyColor: string,
    accentColor: string,
    helmetColor: string,
    drsOpen: boolean
  ) {
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(x - 1, y + 4, 22, 2);

    // Rear wing
    ctx.fillStyle = drsOpen ? '#38bdf8' : accentColor;
    ctx.fillRect(x, y - 4, 3, 8);

    // Rear tires (Pirelli P-Zero pixel wheels)
    ctx.fillStyle = '#09090b';
    ctx.fillRect(x + 3, y - 5, 4, 2);
    ctx.fillRect(x + 3, y + 3, 4, 2);

    // Sidepods & engine cover
    ctx.fillStyle = bodyColor;
    ctx.fillRect(x + 3, y - 3, 12, 6);
    ctx.fillStyle = accentColor;
    ctx.fillRect(x + 5, y - 1, 9, 2);

    // Cockpit & driver helmet
    ctx.fillStyle = '#111827';
    ctx.fillRect(x + 8, y - 2, 4, 4);
    ctx.fillStyle = helmetColor;
    ctx.fillRect(x + 9, y - 1, 2, 2);

    // Front wheels
    ctx.fillStyle = '#09090b';
    ctx.fillRect(x + 14, y - 5, 4, 2);
    ctx.fillRect(x + 14, y + 3, 4, 2);

    // Nose cone & Front wing
    ctx.fillStyle = bodyColor;
    ctx.fillRect(x + 15, y - 1, 5, 2);
    ctx.fillStyle = accentColor;
    ctx.fillRect(x + 19, y - 4, 2, 8);
  }

  drawHud(ctx: CanvasRenderingContext2D) {
    const { W, H } = this;
    const isWide = W >= 320;
    const scale = isWide ? 2 : 1;
    const leftName = this.demo ? 'MAX' : 'YOU';
    const rightName = 'SRI';
    const scoreStr = `${Math.min(TARGET_LAPS, this.you.laps)}-${Math.min(TARGET_LAPS, this.sri.laps)}`;

    const wLeft = measurePixelText(leftName, 1);
    const wRight = measurePixelText(rightName, 1);
    const wScore = measurePixelText(scoreStr, scale);
    const gap = 5;
    const boxW = wLeft + gap + wScore + gap + wRight + 10;
    const boxH = 5 * scale + 6;
    const boxX = Math.round((W - boxW) / 2);
    const boxY = 2;

    ctx.fillStyle = 'rgba(6,10,24,0.86)';
    ctx.fillRect(boxX, boxY, boxW, boxH);
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(boxX, boxY, boxW, 1);
    ctx.fillRect(boxX, boxY + boxH - 1, boxW, 1);

    const textY = boxY + 3;
    drawPixelText(ctx, leftName, boxX + 5, textY + (5 * scale - 5) / 2, 1, '#f87171');
    drawPixelText(ctx, scoreStr, boxX + 5 + wLeft + gap, textY, scale, '#ffffff');
    drawPixelText(
      ctx,
      rightName,
      boxX + 5 + wLeft + gap + wScore + gap,
      textY + (5 * scale - 5) / 2,
      1,
      '#38bdf8'
    );

    // FIA 5 Red Lights Gantry during countdown
    if (this.phase === 'countdown') {
      const gantryW = 66;
      const gantryH = 14;
      const gx = Math.round((W - gantryW) / 2);
      const gy = Math.round(H * 0.24);
      ctx.fillStyle = '#09090b';
      ctx.fillRect(gx, gy, gantryW, gantryH);
      ctx.fillStyle = '#3f3f46';
      ctx.fillRect(gx, gy, gantryW, 1);
      for (let i = 0; i < 5; i++) {
        const lx = gx + 6 + i * 12;
        const lit = i < this.redLights;
        ctx.fillStyle = lit ? '#ef4444' : '#27272a';
        ctx.fillRect(lx, gy + 3, 6, 8);
      }
    } else if (this.flash.t > 0) {
      const fScale = isWide ? 2 : 1;
      const fw = measurePixelText(this.flash.text, fScale);
      drawPixelText(
        ctx,
        this.flash.text,
        Math.round((W - fw) / 2),
        Math.round(H * 0.28),
        fScale,
        this.flash.color,
        '#090d16'
      );
    }
  }
}

interface F1CanvasProps {
  demo?: boolean;
  getControls?: () => RaceControls;
  onUi?: (ui: RaceUiState) => void;
  onSfx?: (name: string, vol?: number) => void;
  gameRef?: React.MutableRefObject<F1GameSimulation | null>;
}

function F1Canvas({ demo = false, getControls, onUi, onSfx, gameRef }: F1CanvasProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cbRef = useRef({ getControls, onUi, onSfx });
  cbRef.current = { getControls, onUi, onSfx };

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let sim: F1GameSimulation | null = null;
    let rafId = 0;
    let lastTime = 0;
    let accum = 0;
    let visible = true;
    let prevUiKey = '';
    const defaultCtl = emptyControls();
    const STEP_MS = 1000 / 60;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width < 60 || rect.height < 30) return;
      const w = clamp(Math.round(rect.width / 2.25), 240, 380);
      const scale = rect.width / w;
      const h = Math.max(64, Math.round(rect.height / scale));
      if (sim && Math.abs(w - sim.W) < 10 && Math.abs(h - sim.H) < 8) return;

      sim = new F1GameSimulation(w, h, { demo });
      sim.sfx = (name, vol) => cbRef.current.onSfx?.(name, vol);
      canvas.width = w;
      canvas.height = h;
      ctx.imageSmoothingEnabled = false;
      if (gameRef) gameRef.current = sim;
      prevUiKey = '';
    };

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      if (!sim || !visible || document.hidden) {
        lastTime = 0;
        return;
      }
      if (!lastTime) lastTime = now;
      accum += Math.min(100, now - lastTime);
      lastTime = now;

      let steps = 0;
      while (accum >= STEP_MS && steps < 5) {
        sim.setControls(cbRef.current.getControls ? cbRef.current.getControls() : defaultCtl);
        sim.step();
        accum -= STEP_MS;
        steps++;
      }
      if (steps === 5) accum = 0;
      sim.render(ctx);

      const ui = sim.ui();
      const key = `${ui.phase}|${ui.youLaps}|${ui.sriLaps}|${ui.redLights}|${Math.floor(ui.drsCharge / 10)}`;
      if (key !== prevUiKey) {
        prevUiKey = key;
        cbRef.current.onUi?.(ui);
      }
    };

    resize();
    rafId = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => resize());
    ro.observe(wrap);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      if (gameRef) gameRef.current = null;
    };
  }, [demo, gameRef]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden bg-[#070a14]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full select-none"
        style={{ imageRendering: 'pixelated' }}
        role="img"
        aria-label="Pixel Formula 1 Grand Prix vs Sri"
      />
    </div>
  );
}

export function F1GameBanner({ onNavigateContact }: { onNavigateContact?: () => void }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const launchModal = () => {
    f1Audio.unlock();
    setOpen(true);
  };

  return (
    <>
      <div
        className="group relative h-36 cursor-pointer overflow-hidden border border-[var(--line)] bg-neutral-950 sm:h-44"
        onClick={launchModal}
        data-cursor-label="click to race F1 vs Sri"
      >
        {!open && <F1Canvas demo />}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)]/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_5px)]" />
        <div className="pointer-events-none absolute left-2.5 top-2.5 flex items-center gap-1.5 border border-white/20 bg-black/65 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur">
          <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
          <span>F1 GRAND PRIX · 3 LAPS</span>
        </div>
        <button
          ref={btnRef}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            launchModal();
          }}
          className="absolute bottom-2 right-2 flex items-center gap-2 border border-white/30 bg-black/75 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur transition-colors hover:bg-white hover:text-black cursor-pointer"
          aria-label="Race Formula 1 against Sri"
        >
          <span>Race me</span>
        </button>
      </div>
      {open && (
        <F1RaceModal
          onClose={() => {
            setOpen(false);
            btnRef.current?.focus();
          }}
          onNavigateContact={onNavigateContact}
        />
      )}
    </>
  );
}

function F1RaceModal({
  onClose,
  onNavigateContact,
}: {
  onClose: () => void;
  onNavigateContact?: () => void;
}) {
  const [ui, setUi] = useState<RaceUiState>({
    phase: 'ready',
    youLaps: 0,
    sriLaps: 0,
    winner: null,
    redLights: 0,
    drsCharge: 100,
  });
  const [muted, setMuted] = useState(f1Audio.muted);
  const simRef = useRef<F1GameSimulation | null>(null);
  const keyCtl = useRef<RaceControls>(emptyControls());
  const touchCtl = useRef<RaceControls>(emptyControls());
  const mergedCtl = useRef<RaceControls>(emptyControls());

  const getControls = useCallback(() => {
    const out = mergedCtl.current;
    out.up = keyCtl.current.up || touchCtl.current.up;
    out.down = keyCtl.current.down || touchCtl.current.down;
    out.left = keyCtl.current.left || touchCtl.current.left;
    out.right = keyCtl.current.right || touchCtl.current.right;
    out.drs = keyCtl.current.drs || touchCtl.current.drs;
    return out;
  }, []);

  const startRace = useCallback(() => {
    f1Audio.unlock();
    simRef.current?.start();
  }, []);

  const toggleMute = () => {
    f1Audio.unlock();
    const next = !muted;
    f1Audio.setMuted(next);
    setMuted(next);
  };

  useEffect(() => {
    f1Audio.setEngineActive(ui.phase === 'race');
    return () => f1Audio.setEngineActive(false);
  }, [ui.phase]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (e: KeyboardEvent, isDown: boolean) => {
      const k = e.key.toLowerCase();
      let handled = true;
      switch (k) {
        case 'arrowup':
        case 'w':
          keyCtl.current.up = isDown;
          break;
        case 'arrowdown':
        case 's':
          keyCtl.current.down = isDown;
          break;
        case 'arrowleft':
        case 'a':
          keyCtl.current.left = isDown;
          break;
        case 'arrowright':
        case 'd':
          keyCtl.current.right = isDown;
          break;
        case ' ':
        case 'x':
        case 'shift':
          keyCtl.current.drs = isDown;
          break;
        default:
          handled = false;
      }
      return handled;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if ((ui.phase === 'ready' || ui.phase === 'over') && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        startRace();
        return;
      }
      if (handleKey(e, true)) e.preventDefault();
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (handleKey(e, false)) e.preventDefault();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      f1Audio.setEngineActive(false);
    };
  }, [onClose, startRace, ui.phase]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-3 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Formula 1 Grand Prix mini-game"
    >
      <div className="flex w-full max-w-[920px] flex-col border border-dashed border-white/20 bg-[#0a0a0a] text-white shadow-2xl">
        {/* Top bar */}
        <div className="flex h-11 items-center justify-between border-b border-dashed border-white/15 px-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-white/70">
              F1 Grand Prix · First to {TARGET_LAPS} Laps
            </span>
            <div className="hidden items-center gap-1.5 sm:flex">
              <span className="font-mono text-[10px] uppercase tracking-wider text-sky-400">
                DRS
              </span>
              <div className="h-2 w-20 overflow-hidden border border-white/20 bg-white/5">
                <div
                  className="h-full bg-sky-400 transition-all duration-150"
                  style={{ width: `${ui.drsCharge}%` }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleMute}
              className="grid size-8 place-items-center border border-dashed border-white/20 font-mono text-[11px] text-white/75 transition-colors hover:bg-white hover:text-black cursor-pointer"
              aria-label={muted ? 'Unmute sound' : 'Mute sound'}
            >
              {muted ? 'MUTE' : 'SFX'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="grid size-8 place-items-center border border-dashed border-white/20 font-mono text-xs text-white/75 transition-colors hover:bg-white hover:text-black cursor-pointer"
              aria-label="Close game"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Race Viewport */}
        <div className="relative aspect-[16/7] w-full min-h-[230px] overflow-hidden">
          <F1Canvas
            getControls={getControls}
            onUi={setUi}
            onSfx={f1Audio.play}
            gameRef={simRef}
          />

          {ui.phase === 'ready' && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/65 px-4 text-center backdrop-blur-[2px]">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">
                <span className="text-red-400">You (#1 Scuderia)</span> vs{' '}
                <span className="text-sky-400">Sri (#10 Alpine/Merc)</span>
              </p>
              <h2 className="mt-1.5 font-mono text-lg font-bold uppercase tracking-widest text-white sm:text-2xl">
                3-Lap Night Grand Prix
              </h2>
              <p className="mt-1 max-w-md font-mono text-[11px] text-white/60">
                Dodge backmarkers, hit the apex, and deploy DRS boost on the straights.
              </p>
              <button
                type="button"
                onClick={startRace}
                className="mt-4 border-2 border-white bg-white px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest text-black transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                Lights Out & Away We Go
              </button>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/50">
                Press Space or Enter to Start
              </p>
            </div>
          )}

          {ui.phase === 'over' && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center border-2 border-dashed border-white/30 bg-[#0a0a0a]/95 p-6 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400">
                Checkered Flag · Podium Classification
              </p>
              <h2
                className={`mt-2 font-mono text-2xl font-bold uppercase tracking-wider sm:text-4xl ${
                  ui.winner === 'you' ? 'text-red-400' : 'text-sky-400'
                }`}
              >
                {ui.winner === 'you' ? 'P1! You Win The Grand Prix!' : 'Sri Wins The Grand Prix!'}
              </h2>
              <div className="my-4 flex items-center gap-6 font-mono text-4xl font-bold sm:text-5xl">
                <div className="flex flex-col items-center">
                  <span className="text-red-400">{ui.youLaps}</span>
                  <span className="mt-1 text-[10px] uppercase tracking-widest text-white/60">
                    YOU (LAPS)
                  </span>
                </div>
                <span className="text-white/40">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-sky-400">{ui.sriLaps}</span>
                  <span className="mt-1 text-[10px] uppercase tracking-widest text-white/60">
                    SRI (LAPS)
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={startRace}
                  className="border-2 border-dashed border-white bg-white px-5 py-2 font-mono text-xs font-bold uppercase tracking-widest text-black transition-transform hover:scale-105 cursor-pointer"
                >
                  Race Again
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateContact?.();
                  }}
                  className="border-2 border-dashed border-white/40 px-5 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-white cursor-pointer"
                >
                  Say Hi in Paddock →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Touch controls for mobile + Keyboard legend for desktop */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-white/15 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-white/60">
          <div className="flex flex-wrap items-center gap-4">
            <span>
              <kbd className="border border-dashed border-white/25 bg-white/10 px-1.5 py-0.5 text-white">
                ↑ ↓
              </kbd>{' '}
              /{' '}
              <kbd className="border border-dashed border-white/25 bg-white/10 px-1.5 py-0.5 text-white">
                W S
              </kbd>{' '}
              Steer Lane
            </span>
            <span>
              <kbd className="border border-dashed border-white/25 bg-white/10 px-1.5 py-0.5 text-white">
                →
              </kbd>{' '}
              /{' '}
              <kbd className="border border-dashed border-white/25 bg-white/10 px-1.5 py-0.5 text-white">
                D
              </kbd>{' '}
              Full Throttle
            </span>
            <span>
              <kbd className="border border-dashed border-white/25 bg-white/10 px-1.5 py-0.5 text-white">
                Space
              </kbd>{' '}
              DRS Overtake Boost
            </span>
          </div>

          {/* Quick pointer buttons for touchscreens */}
          <div className="flex items-center gap-1.5 sm:hidden">
            <button
              type="button"
              onPointerDown={() => {
                touchCtl.current.up = true;
              }}
              onPointerUp={() => {
                touchCtl.current.up = false;
              }}
              className="border border-white/30 bg-white/10 px-2.5 py-1 text-white"
            >
              ▲ UP
            </button>
            <button
              type="button"
              onPointerDown={() => {
                touchCtl.current.down = true;
              }}
              onPointerUp={() => {
                touchCtl.current.down = false;
              }}
              className="border border-white/30 bg-white/10 px-2.5 py-1 text-white"
            >
              ▼ DN
            </button>
            <button
              type="button"
              onPointerDown={() => {
                touchCtl.current.right = true;
                touchCtl.current.drs = true;
              }}
              onPointerUp={() => {
                touchCtl.current.right = false;
                touchCtl.current.drs = false;
              }}
              className="border border-sky-400/50 bg-sky-500/20 px-2.5 py-1 text-sky-300"
            >
              ⚡ DRS
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
