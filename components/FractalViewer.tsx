
import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DeJongParams } from '../types';
import { NUM_PARTICLES, PARTICLE_SIZE, CAMERA_Z_POSITION, ITERATIONS_TO_SETTLE } from '../constants';

interface FractalViewerProps {
  params: DeJongParams;
  isAnimatingParams: boolean;
  animationTick: number;
}

const FractalViewer: React.FC<FractalViewerProps> = ({ params, isAnimatingParams, animationTick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  const generateParticles = useCallback((currentParams: DeJongParams, isAnim: boolean, animTick: number) => {
    if (!particlesRef.current || !particlesRef.current.geometry) return;

    const positions = new Float32Array(NUM_PARTICLES * 3);
    let x = 0.1, y = 0.1, z = 0.1;

    let { a, b, c, d, e, f } = currentParams; // Make a local copy

    if (isAnim) {
      const timeFactor = animTick * 0.005; // Adjust speed/sensitivity of morphing
      a += Math.sin(timeFactor * 0.31) * 0.25;
      b += Math.cos(timeFactor * 0.23) * 0.25;
      c += Math.sin(timeFactor * 0.37) * 0.25;
      d += Math.cos(timeFactor * 0.29) * 0.25;
      e += Math.sin(timeFactor * 0.41) * 0.20;
      f += Math.cos(timeFactor * 0.27) * 0.20;
    }

    // Settle attractor
    for (let i = 0; i < ITERATIONS_TO_SETTLE; i++) {
      const nextX = Math.sin(a * y) - Math.cos(b * x);
      const nextY = Math.sin(c * z) - Math.cos(d * y);
      const nextZ = Math.sin(e * x) - Math.cos(f * z);
      x = nextX;
      y = nextY;
      z = nextZ;
    }

    // Generate particle positions
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const nextX = Math.sin(a * y) - Math.cos(b * x);
      const nextY = Math.sin(c * z) - Math.cos(d * y);
      const nextZ = Math.sin(e * x) - Math.cos(f * z);
      x = nextX;
      y = nextY;
      z = nextZ;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    
    const geom = particlesRef.current.geometry as THREE.BufferGeometry;
    if (geom.attributes.position && (geom.attributes.position as THREE.BufferAttribute).array.length === positions.length) {
        (geom.attributes.position as THREE.BufferAttribute).set(positions);
        (geom.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    } else {
        geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
    geom.computeBoundingSphere(); 
  }, []);


  useEffect(() => {
    if (!mountRef.current) return;

    sceneRef.current = new THREE.Scene();
    
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current.position.z = CAMERA_Z_POSITION;

    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    rendererRef.current.setClearColor(0x111827); 
    mountRef.current.appendChild(rendererRef.current.domElement);

    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({
      color: 0xffffff, 
      size: PARTICLE_SIZE,
      sizeAttenuation: true,
      vertexColors: false, // Set to false if not using per-vertex colors initially
    });
    particlesRef.current = new THREE.Points(geometry, material);
    sceneRef.current.add(particlesRef.current);
    
    generateParticles(params, isAnimatingParams, animationTick);

    controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
    controlsRef.current.enableDamping = true;
    controlsRef.current.dampingFactor = 0.05;
    controlsRef.current.screenSpacePanning = false; 
    controlsRef.current.minDistance = 0.5;
    controlsRef.current.maxDistance = 50;


    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      if (controlsRef.current) controlsRef.current.update();

      // Color animation
      if (particlesRef.current && particlesRef.current.material instanceof THREE.PointsMaterial) {
        const time = Date.now() * 0.0001; // Slower color cycle (10-second cycle)
        const hue = (time % 1); 
        (particlesRef.current.material as THREE.PointsMaterial).color.setHSL(hue, 1.0, 0.65); // Full saturation, good lightness
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    const handleResize = () => {
      if (mountRef.current && rendererRef.current && cameraRef.current) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        rendererRef.current.setSize(width, height);
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      if (controlsRef.current) controlsRef.current.dispose();
      if (particlesRef.current) {
        if (particlesRef.current.geometry) particlesRef.current.geometry.dispose();
        if (particlesRef.current.material) {
            if (Array.isArray(particlesRef.current.material)) {
                particlesRef.current.material.forEach(mat => mat.dispose());
            } else {
                (particlesRef.current.material as THREE.Material).dispose();
            }
        }
      }
      if (rendererRef.current) {
        rendererRef.current.dispose(); 
        if (mountRef.current && rendererRef.current.domElement && mountRef.current.contains(rendererRef.current.domElement)) {
          mountRef.current.removeChild(rendererRef.current.domElement); 
        }
      }
      sceneRef.current = null;
      cameraRef.current = null;
      particlesRef.current = null;
      rendererRef.current = null;
      controlsRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Initial setup runs once.

  // Effect to update particles when params, isAnimatingParams, or animationTick change
  useEffect(() => {
    if (particlesRef.current && rendererRef.current) { 
      generateParticles(params, isAnimatingParams, animationTick);
    }
  }, [params, generateParticles, isAnimatingParams, animationTick]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default FractalViewer;