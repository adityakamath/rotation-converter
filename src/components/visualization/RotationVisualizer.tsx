import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RotationResults } from '@/types/rotation';

interface RotationVisualizerProps {
  results: RotationResults;
  className?: string;
}

export default function RotationVisualizer({ results, className = '' }: RotationVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const frameRef = useRef<number | null>(null);
  const targetQuaternion = useRef(new THREE.Quaternion());

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(300, 300);
    containerRef.current.appendChild(renderer.domElement);

    // Grid helper
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    // Axes helper with labels
    const axesHelper = new THREE.AxesHelper(3);
    scene.add(axesHelper);

    // Add axis labels
    const addLabel = (text: string, position: THREE.Vector3, color: string) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      canvas.width = 64;
      canvas.height = 64;
      
      context.fillStyle = color;
      context.font = '48px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, 32, 32);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);
      sprite.position.copy(position);
      sprite.scale.set(0.5, 0.5, 1);
      scene.add(sprite);
    };

    addLabel('X', new THREE.Vector3(3.2, 0, 0), '#ff0000');
    addLabel('Y', new THREE.Vector3(0, 3.2, 0), '#00ff00');
    addLabel('Z', new THREE.Vector3(0, 0, 3.2), '#0000ff');

    // Cube setup
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
    const cube = new THREE.Mesh(geometry, material);
    cubeRef.current = cube;
    scene.add(cube);

    // Add edges to cube
    const edges = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const edgesMesh = new THREE.LineSegments(edges, edgesMaterial);
    cube.add(edgesMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      controls.update();

      if (cubeRef.current) {
        cubeRef.current.quaternion.slerp(targetQuaternion.current, 0.1);
      }

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Update rotation when results change
  useEffect(() => {
    if (!results.quaternion) return;
    const [x, y, z, w] = results.quaternion;
    targetQuaternion.current.set(x, y, z, w);
  }, [results]);

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} className="w-[300px] h-[300px]" />
      <div className="absolute bottom-0 left-0 right-0 text-center text-sm text-gray-600 bg-white/80 py-1">
        Click and drag to rotate view
      </div>
    </div>
  );
} 