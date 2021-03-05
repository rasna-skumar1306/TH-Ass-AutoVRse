import { OrbitControls } from '@react-three/drei'
import { Canvas } from 'react-three-fiber'
import { Physics, usePlane } from '@react-three/cannon'

import { CubeMesh, CylindricalMesh, SphericalMesh } from './shapes.component'

import './App.scss'
import { useEffect, useState } from 'react'

const SetLights = () => (
  <mesh>
    <ambientLight intensity={0.3} />
    <directionalLight
      castShadow
      position={[0, 10, 0]}
      intensity={1.5}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-camera-far={50}
      shadow-camera-left={-10}
      shadow-camera-right={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
    />
    <pointLight position={[-10, 0, -20]} intensity={0.5} />
    <pointLight position={[0, -10, 0]} intensity={1.5} />
  </mesh>
)

const GroundLayer = () => {
  const [ref] = usePlane(() => ({
    position: [0, -1, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }))
  return (
    <group>
      <mesh
        ref={ref}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.95, 0]}
        receiveShadow
      >
        <planeBufferGeometry attach='geometry' args={[300, 300]} />
        <shadowMaterial attach='material' opacity={0.2} />
      </mesh>
      <mesh
        ref={ref}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow
      >
        <planeBufferGeometry attach='geometry' args={[300, 300]} />
        <meshBasicMaterial attach='material' color='lightblue' />
      </mesh>
    </group>
  )
}

const randomInt = (num) =>
  num < 0
    ? Math.ceil(Math.random() * num) * (Math.round(Math.random()) ? 1 : -1)
    : Math.floor(Math.random() * num + 1)

function App() {
  const [shapes, setShapes] = useState([])
  const [currentId, setCurrentId] = useState(null)

  useEffect(() => {}, [shapes])

  const generateShape = (shape) => {
    const colors = [
      'skyblue',
      'red',
      'yellow',
      'orange',
      'pink',
      'hotpink',
      'blue',
      'green',
      'lightgreen',
    ]
    const c = colors[randomInt(9)]
    let vertices = [randomInt(-20), randomInt(-10), randomInt(-10)]

    let updatedShape = shapes.map((props) => ({ ...props }))
    let id = updatedShape.length

    updatedShape.push({
      shape: shape,
      color: c,
      position: vertices,
      id: id + 1,
    })
    setShapes([...updatedShape])
  }

  const RenderShapes = ({ shape, position, color, id, setCurrentId }) => {
    switch (shape) {
      case 'cube':
        return (
          <CubeMesh
            key={id}
            position={position}
            color={color}
            id={id}
            setCurrentId={setCurrentId}
          />
        )
      case 'sphere':
        return (
          <SphericalMesh
            key={id}
            position={position}
            color={color}
            id={id}
            setCurrentId={setCurrentId}
          />
        )
      case 'cylinder':
        return (
          <CylindricalMesh
            key={id}
            position={position}
            color={color}
            id={id}
            setCurrentId={setCurrentId}
          />
        )
      default:
        return <CubeMesh position={position} color={color} id={id} />
    }
  }

  const deleteShape = (id) =>
    setShapes((model) => model.filter((geomentryModel, i) => i !== 0))

  return (
    <>
      <div className='btns'>
        <button onClick={() => generateShape('cube')}>Cube</button>
        <button onClick={() => generateShape('sphere')}>Sphere</button>
        <button onClick={() => generateShape('cylinder')}>Cylinder</button>
        <button onClick={() => deleteShape(currentId)}>Delete</button>
      </div>
      <Canvas
        shadowMap
        colorManagement
        camera={{ position: [-5, 2, 10], fov: 60 }}
      >
        <SetLights />
        <Physics>
          {shapes.map(({ id, color, position, shape }) => (
            <RenderShapes
              id={id}
              shape={shape}
              color={color}
              position={position}
              setCurrentId={(id) => {
                setCurrentId(id)
                console.log(id)
              }}
            />
          ))}

          <GroundLayer />
        </Physics>
        <OrbitControls />
      </Canvas>
    </>
  )
}

export default App
