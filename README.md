# Repo Creator 🚀

A Node.js utility script that automatically generates customizable folder structures for your projects. Save time by automating the creation of your project's directory structure.

## 🌟 Features

- Create complex folder structures with a single command
- Customizable directory templates
- Cross-platform compatibility
- Lightweight and easy to use

## 📋 Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)

## 🔧 Installation

1. Clone this repository:
```bash
git clone https://github.com/adwaitjr10/repo-creator.git
cd repo-creator
```

2. Install dependencies:
```bash
npm install child_process
```

## 💻 Usage

1. Open `onlineCompilerFolderStructure.js`
2. Customize the folder structure according to your needs
3. Run the script:
```bash
node onlineCompilerFolderStructure.js
```

## 📁 Example Folder Structure

```
project/
├── src/
│   ├── components/
│   ├── utils/
│   └── styles/
├── public/
├── tests/
└── docs/
```

## 🛠️ Customization

To modify the folder structure, edit the configuration in `onlineCompilerFolderStructure.js`:

```javascript
const structure = {
  src: {
    components: {},
    utils: {},
    styles: {}
  },
  public: {},
  tests: {},
  docs: {}
};
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✨ Acknowledgments

- Thanks to all contributors who have helped shape this project
- Inspired by the need for quick project scaffolding

## 📞 Support

If you have any questions or issues, please open an issue in the GitHub repository.