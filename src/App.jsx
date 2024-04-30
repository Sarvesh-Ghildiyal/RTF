/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useRef, useState } from "react";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";

const Cube = ({ position, rotation, size, color }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
    ref.current.position.z = Math.sin(state.clock.elapsedTime);
  });

  return (
    <mesh castShadow position={position} rotation={rotation} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Sphere = ({ position, size, color }) => {
  const ref = useRef();

  const [isHovered, setIsHovered] = useState(false);
  useFrame((state, delta) => {
    ref.current.rotation.y -= delta;
    // ref.current.position.x = Math.sin(state.clock.elapsedTime);
    // ref.current.position.y = Math.sin(state.clock.elapsedTime);
  });
  return (
    <mesh
      ref={ref}
      onPointerEnter={(event) => {
        event.stopPropagation(), setIsHovered(true);
      }}
      onPointerLeave={() => setIsHovered(false)}
    >
      <sphereGeometry args={[2, 2]} />
      <meshStandardMaterial wireframe color={isHovered ? "green" : "red"} />
    </mesh>
  );
};

const Scene = () => {
  const directionalLigthRef = useRef();
  useHelper(directionalLigthRef, DirectionalLightHelper, 0.5, "white");
  return (
    <>
      <directionalLight
        args={["white", 10]}
        position={[-1, 0, 4]}
        ref={directionalLigthRef}
      />
      
      {/* <ambientLight intensity={2} /> */}
      {/* <Cube
            position={[-1, 0, 2]}
            rotation={[1.5, 0, 2]}
            size={[1, 1, 1]}
            color={"blue"}
          />
          <Cube
            position={[1, 0, 2]}
            rotation={[1, 0, 2]}
            size={[1, 1, 1]}
            color={"pink"}
          /> */}
      <Sphere />
      <Text color="white">Hello Sarvesh here!</Text>
      <OrbitControls />
    </>
  );
};

function App() {
  return (
    <>
      <div id="canvas-container">
        <Canvas>
          <Scene/>
        </Canvas>
      </div>
    </>
  );
}

export default App;
