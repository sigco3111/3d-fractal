import { DeJongParams } from './types';

export const INITIAL_PARAMS: DeJongParams = {
  a: 1.4,
  b: -2.3,
  c: 2.4,
  d: -2.1,
  e: 1.5,
  f: -1.8,
};

export const NUM_PARTICLES = 200000;
export const PARTICLE_SIZE = 0.01;
export const CAMERA_Z_POSITION = 5; // Initial Z position for the camera
export const ITERATIONS_TO_SETTLE = 100; // Iterations to skip before collecting points
