import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
  RoundedBox,
  Sparkles,
} from '@react-three/drei'
import type { Group } from 'three'

const GOLD = '#f5b942'
const BODY = '#13334f'
const DARK = '#0c1320'

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.24, 28]} />
        <meshStandardMaterial color="#101418" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.02, 20]} />
        <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.13, 0]} rotation={[Math.PI, 0, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.02, 20]} />
        <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.25} />
      </mesh>
    </group>
  )
}

/** 程式化低多边形展车：车身 + 座舱 + 轮毂 + 灯组 */
function StylizedCar() {
  const group = useRef<Group>(null)
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.25
    }
  })

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.08} floatIntensity={0.25} floatingRange={[-0.04, 0.06]}>
        <group position={[0, 0.05, 0]}>
          {/* 车身 */}
          <RoundedBox args={[3.3, 0.6, 1.5]} radius={0.16} smoothness={5} position={[0, 0.52, 0]} castShadow>
            <meshStandardMaterial color={BODY} metalness={0.85} roughness={0.22} envMapIntensity={1.4} />
          </RoundedBox>
          {/* 座舱 */}
          <RoundedBox args={[1.75, 0.5, 1.28]} radius={0.2} smoothness={5} position={[-0.15, 0.98, 0]} castShadow>
            <meshStandardMaterial color="#0e1a2a" metalness={0.6} roughness={0.1} envMapIntensity={1.6} />
          </RoundedBox>
          {/* 金色腰线 */}
          <RoundedBox args={[3.34, 0.06, 1.52]} radius={0.03} smoothness={3} position={[0, 0.66, 0]}>
            <meshStandardMaterial color={GOLD} metalness={1} roughness={0.18} emissive={GOLD} emissiveIntensity={0.12} />
          </RoundedBox>
          {/* 前大灯 */}
          <mesh position={[1.66, 0.55, 0.45]}>
            <boxGeometry args={[0.05, 0.1, 0.3]} />
            <meshStandardMaterial color="#fff" emissive="#ffe9b0" emissiveIntensity={2.4} />
          </mesh>
          <mesh position={[1.66, 0.55, -0.45]}>
            <boxGeometry args={[0.05, 0.1, 0.3]} />
            <meshStandardMaterial color="#fff" emissive="#ffe9b0" emissiveIntensity={2.4} />
          </mesh>
          {/* 尾灯 */}
          <mesh position={[-1.66, 0.58, 0]}>
            <boxGeometry args={[0.04, 0.08, 1.1]} />
            <meshStandardMaterial color="#ff3b30" emissive="#ff3b30" emissiveIntensity={1.6} />
          </mesh>
          {/* 车轮 */}
          <Wheel position={[1.05, 0.34, 0.78]} />
          <Wheel position={[1.05, 0.34, -0.78]} />
          <Wheel position={[-1.05, 0.34, 0.78]} />
          <Wheel position={[-1.05, 0.34, -0.78]} />
        </group>
      </Float>

      {/* 展台圆盘 */}
      <mesh position={[0, -0.02, 0]} receiveShadow>
        <cylinderGeometry args={[2.6, 2.8, 0.08, 64]} />
        <meshStandardMaterial color={DARK} metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.025, 0]}>
        <torusGeometry args={[2.6, 0.015, 12, 90]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.9} />
      </mesh>
    </group>
  )
}

export function Hero3D() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [4.2, 2.2, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      className="!touch-pan-y"
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[6, 8, 4]} angle={0.5} penumbra={0.8} intensity={130} color="#ffffff" castShadow />
      <pointLight position={[-6, 3, -4]} intensity={45} color={GOLD} />
      <directionalLight position={[-3, 5, 6]} intensity={1.1} color="#cfe3ff" />
      <StylizedCar />
      <Sparkles count={70} scale={[9, 4, 9]} size={1.6} speed={0.35} color={GOLD} opacity={0.55} />
      <ContactShadows position={[0, 0.03, 0]} opacity={0.55} scale={9} blur={2.4} far={3} />
      {/* HDR 环境贴图来自 CDN，单独 Suspense，加载慢时不阻塞车模渲染 */}
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  )
}

export default Hero3D
