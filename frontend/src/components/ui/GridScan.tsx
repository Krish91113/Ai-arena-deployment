'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

interface GridScanProps {
    sensitivity?: number;
    lineThickness?: number;
    linesColor?: string;
    gridScale?: number;
    scanColor?: string;
    scanOpacity?: number;
    enablePost?: boolean;
    bloomIntensity?: number;
    chromaticAberration?: number;
    noiseIntensity?: number;
}

function GridMesh({
    sensitivity = 0.55,
    lineThickness = 1,
    linesColor = '#8B7AA8',
    gridScale = 0.1,
    scanColor = '#A78BFA',
    scanOpacity = 0.4,
    noiseIntensity = 0.01,
}: GridScanProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    const fragmentShader = `
    uniform float time;
    uniform vec3 linesColor;
    uniform vec3 scanColor;
    uniform float scanOpacity;
    uniform float gridScale;
    uniform float lineThickness;
    uniform float sensitivity;
    uniform float noiseIntensity;
    varying vec2 vUv;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    void main() {
      vec2 grid = fract(vUv / gridScale);
      float line = step(1.0 - lineThickness * 0.01, grid.x) + step(1.0 - lineThickness * 0.01, grid.y);
      
      // Scanning effect
      float scan = abs(sin((vUv.y + time * 0.3) * 10.0));
      scan = smoothstep(sensitivity, 1.0, scan);
      
      // Noise
      float noise = random(vUv + time * 0.1) * noiseIntensity;
      
      vec3 color = mix(linesColor, scanColor, scan * scanOpacity);
      color += noise;
      
      gl_FragColor = vec4(color, line * 0.8);
    }
  `;

    const uniforms = useMemo(
        () => ({
            time: { value: 0 },
            linesColor: { value: new THREE.Color(linesColor) },
            scanColor: { value: new THREE.Color(scanColor) },
            scanOpacity: { value: scanOpacity },
            gridScale: { value: gridScale },
            lineThickness: { value: lineThickness },
            sensitivity: { value: sensitivity },
            noiseIntensity: { value: noiseIntensity },
        }),
        [linesColor, scanColor, scanOpacity, gridScale, lineThickness, sensitivity, noiseIntensity]
    );

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.time.value = state.clock.elapsedTime;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <planeGeometry args={[20, 20, 1, 1]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

export default function GridScan({
    sensitivity = 0.55,
    lineThickness = 1,
    linesColor = '#8B7AA8',
    gridScale = 0.1,
    scanColor = '#A78BFA',
    scanOpacity = 0.4,
    enablePost = true,
    bloomIntensity = 0.6,
    chromaticAberration = 0.002,
    noiseIntensity = 0.01,
}: GridScanProps) {
    return (
        <div className="absolute inset-0 w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                style={{ background: 'transparent' }}
            >
                <GridMesh
                    sensitivity={sensitivity}
                    lineThickness={lineThickness}
                    linesColor={linesColor}
                    gridScale={gridScale}
                    scanColor={scanColor}
                    scanOpacity={scanOpacity}
                    noiseIntensity={noiseIntensity}
                />
                {enablePost && (
                    <EffectComposer>
                        <Bloom intensity={bloomIntensity} luminanceThreshold={0.2} />
                        <ChromaticAberration offset={[chromaticAberration, chromaticAberration]} />
                    </EffectComposer>
                )}
            </Canvas>
        </div>
    );
}
