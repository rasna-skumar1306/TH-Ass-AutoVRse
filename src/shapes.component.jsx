import { useBox, useCylinder, useSphere } from '@react-three/cannon'
import { MeshWobbleMaterial } from '@react-three/drei'
import { useState } from 'react'
import { a } from 'react-spring/three'

const CubeMesh = ({ position, color, speed, args, id, setCurrentId }) => {
  const [ref, api] = useBox(() => ({ mass: 1, position: position }))

  const [expand, setExpand] = useState(false)

  const animate = () => {
    setExpand(!expand)
    api.velocity.set(0, 3, 0)
  }

  return (
    <a.mesh
      key={id}
      position={position}
      ref={ref}
      onClick={() => {
        animate()
        setCurrentId(id)
      }}
      castShadow
    >
      <boxBufferGeometry attach='geometry' args={args} />
      {expand ? (
        <MeshWobbleMaterial
          color={color}
          speed={speed}
          attach='material'
          factor={0.6}
        />
      ) : (
        <meshLambertMaterial attach='material' color={color} />
      )}
    </a.mesh>
  )
}

const CylindricalMesh = ({
  position,
  color,
  speed,
  args,
  id,
  setCurrentId,
}) => {
  const [ref, api] = useCylinder(() => ({ mass: 1, position: position }))
  const [expand, setExpand] = useState(false)

  const animate = () => {
    setExpand(!expand)
    api.velocity.set(0, 3, 0)
  }

  return (
    <a.mesh
      key={id}
      position={position}
      ref={ref}
      onClick={() => {
        animate()
        setCurrentId(id)
      }}
      castShadow
    >
      <cylinderBufferGeometry attach='geometry' args={args} />
      {expand ? (
        <MeshWobbleMaterial
          color={color}
          speed={speed}
          attach='material'
          factor={0.6}
        />
      ) : (
        <meshLambertMaterial attach='material' color={color} />
      )}
    </a.mesh>
  )
}

const SphericalMesh = ({ position, color, speed, args, id, setCurrentId }) => {
  const [ref, api] = useSphere(() => ({ mass: 1, position: position }))
  const [expand, setExpand] = useState(false)

  const animate = () => {
    setExpand(!expand)
    api.velocity.set(0, 3, 0)
  }

  return (
    <a.mesh
      key={id}
      position={position}
      ref={ref}
      onClick={() => {
        animate()
        setCurrentId(id)
      }}
      castShadow
    >
      <sphereBufferGeometry attach='geometry' args={args} />
      {expand ? (
        <MeshWobbleMaterial
          color={color}
          speed={speed}
          attach='material'
          factor={0.6}
        />
      ) : (
        <meshPhysicalMaterial attach='material' color={color} />
      )}
    </a.mesh>
  )
}

export { CubeMesh, CylindricalMesh, SphericalMesh }
