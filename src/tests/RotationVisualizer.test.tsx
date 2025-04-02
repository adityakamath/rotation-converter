import { render } from '@testing-library/react';
import RotationVisualizer from '@/components/visualization/RotationVisualizer';
import { RotationResults } from '@/types/rotations';

// Mock Three.js and OrbitControls
jest.mock('three', () => ({
  Scene: jest.fn(),
  PerspectiveCamera: jest.fn(),
  WebGLRenderer: jest.fn(() => ({
    setSize: jest.fn(),
    render: jest.fn(),
    dispose: jest.fn(),
    domElement: document.createElement('canvas')
  })),
  Color: jest.fn(),
  BoxGeometry: jest.fn(),
  MeshNormalMaterial: jest.fn(),
  Mesh: jest.fn(),
  AxesHelper: jest.fn(),
  AmbientLight: jest.fn(),
  DirectionalLight: jest.fn()
}));

jest.mock('three/examples/jsm/controls/OrbitControls', () => ({
  OrbitControls: jest.fn(() => ({
    enableDamping: true,
    update: jest.fn()
  }))
}));

describe('RotationVisualizer', () => {
  const mockRotation: RotationResults = {
    euler: { x: 0, y: 0, z: 0 },
    quaternion: { w: 1, x: 0, y: 0, z: 0 },
    matrix: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ],
    axisAngle: {
      axis: { x: 1, y: 0, z: 0 },
      angle: 0
    }
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<RotationVisualizer rotation={mockRotation} />);
  });

  it('applies custom className', () => {
    const { container } = render(
      <RotationVisualizer
        rotation={mockRotation}
        className="custom-class"
      />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  // Note: Most Three.js functionality is mocked and can't be fully tested
  // in a Jest environment. Consider using a visual regression testing tool
  // for thorough testing of 3D rendering.
}); 