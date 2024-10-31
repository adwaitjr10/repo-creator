const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Project structure configuration
const projectStructure = {
    'src': {
        'css': ['styles.css'],
        'js': ['compiler.js', 'console.js', 'storage.js'],
        'themes': ['light.css', 'dark.css']
    },
    'assets': {
        'icons': ['favicon.ico', 'logo.png'],
        'fonts': []
    },
    'lib': [],
    'docs': ['README.md', 'CONTRIBUTING.md'],
    'tests': ['compiler.test.js', 'storage.test.js'],
    'config': ['webpack.config.js', '.eslintrc']
};

// Root directory name
const projectRoot = 'online-js-compiler';

// Function to create directory and files
function createProjectStructure(root, structure) {
    // Create root directory
    fs.mkdirSync(root, { recursive: true });

    // Create index.html in root
    fs.writeFileSync(path.join(root, 'index.html'), `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Online JS Compiler</title>
    <link rel="stylesheet" href="src/css/styles.css">
</head>
<body>
    <div id="app">
        <textarea id="code-editor"></textarea>
        <div id="output"></div>
        <button id="run-btn">Run Code</button>
    </div>
    <script src="src/js/compiler.js"></script>
</body>
</html>
    `);

    // Recursively create directories and files
    function createStructure(currentPath, currentStructure) {
        Object.entries(currentStructure).forEach(([dir, contents]) => {
            const fullPath = path.join(currentPath, dir);

            // Create directory
            fs.mkdirSync(fullPath, { recursive: true });

            // Create files
            if (Array.isArray(contents)) {
                contents.forEach(file => {
                    const filePath = path.join(fullPath, file);
                    fs.writeFileSync(filePath, '');
                });
            } else {
                createStructure(fullPath, contents);
            }
        });
    }

    // Create package.json
    const packageJson = {
        name: 'online-js-compiler',
        version: '1.0.0',
        description: 'Online JavaScript Compiler',
        main: 'index.html',
        scripts: {
            start: 'webpack serve',
            build: 'webpack',
            test: 'jest'
        },
        dependencies: {},
        devDependencies: {
            'webpack': '^5.0.0',
            'webpack-cli': '^4.0.0',
            'html-webpack-plugin': '^5.0.0'
        }
    };

    fs.writeFileSync(
        path.join(root, 'package.json'),
        JSON.stringify(packageJson, null, 2)
    );

    // Start creating the structure
    createStructure(root, structure);

    // Initialize git
    try {
        process.chdir(root);
        execSync('git init');
        console.log('Git repository initialized');
    } catch (error) {
        console.error('Error initializing git:', error);
    }
}

createProjectStructure(projectRoot, projectStructure);

console.log(`Project structure created in ${projectRoot}`);