import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ACCENT = '#8fb0ce'
const LINE = '#3d5670'

/** 斐波那契球面均匀采样，生成点云坐标 */
function fibonacciSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    positions[i * 3] = Math.cos(theta) * r * radius
    positions[i * 3 + 1] = y * radius
    positions[i * 3 + 2] = Math.sin(theta) * r * radius
  }
  return positions
}

/** 随机散布的远景星点 */
function scatterPoints(count: number, spread: number) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * spread
  }
  return positions
}

function useBufferGeometry(positions: Float32Array) {
  return useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [positions])
}

function Globe() {
  const group = useRef<THREE.Group>(null)
  const ringsRef = useRef<THREE.Group>(null)

  const pointsGeo = useBufferGeometry(useMemo(() => fibonacciSphere(900, 2.3), []))
  const wireGeo = useMemo(
    () => new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.3, 2)),
    [],
  )
  const ringGeo = useMemo(() => {
    // 圆环轨道线
    const curve = new THREE.EllipseCurve(0, 0, 3.1, 3.1, 0, Math.PI * 2)
    const pts = curve.getPoints(120)
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [])

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.07
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.02
    }
  })

  return (
    <group rotation={[0.42, 0, -0.12]}>
      <group ref={group}>
        {/* 球面点云 */}
        <points geometry={pointsGeo}>
          <pointsMaterial
            color={ACCENT}
            size={0.032}
            sizeAttenuation
            transparent
            opacity={0.75}
            depthWrite={false}
          />
        </points>
        {/* 球体线框 */}
        <lineSegments geometry={wireGeo}>
          <lineBasicMaterial color={LINE} transparent opacity={0.22} />
        </lineSegments>
      </group>

      {/* 轨道环 */}
      <group ref={ringsRef}>
        <lineLoop geometry={ringGeo} rotation={[Math.PI / 2.15, 0, 0]}>
          <lineBasicMaterial color={LINE} transparent opacity={0.4} />
        </lineLoop>
        <lineLoop geometry={ringGeo} rotation={[Math.PI / 2.6, 0.5, 0.3]} scale={1.18}>
          <lineBasicMaterial color={LINE} transparent opacity={0.22} />
        </lineLoop>
      </group>
    </group>
  )
}

function Stars() {
  const ref = useRef<THREE.Points>(null)
  const geo = useBufferGeometry(useMemo(() => scatterPoints(260, 26), []))
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.008
  })
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#6f7d8c" size={0.02} sizeAttenuation transparent opacity={0.5} depthWrite={false} />
    </points>
  )
}

/** Landing Hero 的点线抽象背景：旋转线框地球仪 + 轨道环 + 远景星点 */
export function WireGlobe() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Globe />
      <Stars />
    </Canvas>
  )
}

export default WireGlobe
