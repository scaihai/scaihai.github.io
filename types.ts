
export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export interface OracleMessage {
  text: string;
  timestamp: number;
  author: 'user' | 'oracle';
}
