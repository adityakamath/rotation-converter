# 3D Rotation Converter

A modern web application for converting between different 3D rotation formats with real-time visualization.

## Features

- **Multiple Rotation Formats**:
  - Euler angles (XYZ, XZY, YXZ, YZX, ZXY, ZYX)
  - Quaternions
  - Rotation matrices (3x3)
  - Axis-angle representation
  - Triple points (P,Q,R) for frame definition
  - Axis with angle magnitude

- **Interactive 3D Visualization**:
  - Real-time rotation preview
  - Interactive orbit controls
  - Axis labels and grid
  - Smooth transitions between rotations

- **User-Friendly Interface**:
  - Radians/Degrees toggle
  - Real-time validation
  - Copy-to-clipboard functionality
  - Mobile-responsive design
  - Clear error messages
  - Helpful tooltips and explanations

- **Batch Processing**:
  - Convert multiple rotations at once
  - Support for all input formats
  - Bulk copy results

## Prerequisites

- Node.js 20.x or later
- npm 10.x or later

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rotation-converter.git
   cd rotation-converter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Single Conversion
1. Select your input format (Euler, Quaternion, Matrix, etc.)
2. Choose angle format (Radians/Degrees) if applicable
3. Enter your rotation values
4. View the results in all formats
5. Use the 3D visualization to verify the rotation
6. Copy results to clipboard as needed

### Batch Conversion
1. Navigate to the batch conversion page
2. Select your input format
3. Enter multiple rotations (one per line)
4. Convert all at once
5. Copy results in your preferred format

## Project Structure

```
rotation-converter/
├── src/
│   ├── app/                 # Next.js pages
│   │   ├── conversion/      # Conversion-related components
│   │   ├── inputs/         # Input components for different formats
│   │   ├── ui/            # Reusable UI components
│   │   └── visualization/  # 3D visualization components
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript type definitions
│   └── tests/              # Test files
├── public/                 # Static assets
└── package.json           # Project dependencies
```

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## Development

- Code style is enforced using ESLint and Prettier
- Tests use Jest and React Testing Library
- Commits should follow conventional commit format
- PRs should include tests for new features

## Deployment

The application is configured for deployment on Vercel:
1. Push changes to the main branch
2. CI/CD pipeline will automatically:
   - Run tests
   - Check types
   - Deploy to Vercel if all checks pass

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Three.js for 3D visualization
- Next.js for the framework
- TailwindCSS for styling
- Jest and React Testing Library for testing
