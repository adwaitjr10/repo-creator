const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Project structure configuration
const projectStructure = {
    src: {
        controllers: ['compilerController.js', 'userController.js'],
        models: ['compilerModel.js', 'userModel.js'],
        routes: ['compilerRoutes.js', 'userRoutes.js'],
        services: ['compilerService.js', 'userService.js'],
        views: ['index.html', 'error.html']
    },
    assets: {
        icons: ['favicon.ico', 'logo.png'],
        fonts: []
    },
    lib: [],
    config: ['dbConfig.js', 'appConfig.js', 'logger.js'],
    tests: ['compiler.test.js', 'user.test.js'],
    docs: ['README.md', 'CONTRIBUTING.md']
};

// Root directory name
const projectRoot = 'node-js-compiler';

// create directory and files
function createProjectStructure(root, structure) {
    fs.mkdirSync(root, { recursive: true });

    fs.writeFileSync(path.join(root, 'server.js'), `
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Import Routes
const compilerRoutes = require('./src/routes/compilerRoutes');
const userRoutes = require('./src/routes/userRoutes');

// Use Routes
app.use('/api/compiler', compilerRoutes);
app.use('/api/user', userRoutes);

// Root endpoint
app.get('/', (req, res) => res.sendFile(__dirname + '/src/views/index.html'));

// Start server
app.listen(PORT, () => {
    console.log(\`Server running on http://localhost:\${PORT}\`);
});
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
        description: 'Online JavaScript Compiler using Node.js',
        main: 'server.js',
        scripts: {
            start: 'node server.js',
            test: 'jest'
        },
        dependencies: {
            express: '^4.0.0'
        },
        devDependencies: {
            jest: '^27.0.0'
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
