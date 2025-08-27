# Remove Comments Frontend

![Demo](https://raw.githubusercontent.com/Soto92/remove-comments-frontend/main/demo.gif)

A **VS Code extension** that removes all comments from **frontend files**:

- JavaScript (.js)
- TypeScript (.ts)
- React JSX (.jsx)
- React TSX (.tsx)
- CSS (.css)

## 🚀 Usage

- Open any supported file.
- Run from Command Palette: **Remove All Comments (Frontend)**  
  or use the keyboard shortcut:

  - **Windows/Linux**: `Ctrl + Alt + R`
  - **macOS**: `Cmd + Alt + R`

All comments (`// ...`, `/* ... */`, CSS comments) will be removed safely.

## 📦 Installation

You can install it directly from the [VS Code Marketplace](https://marketplace.visualstudio.com/)
or package it locally:

```bash
vsce package
code --install-extension remove-comments-frontend-0.0.1.vsix
```

## 🛠 How it works

- JavaScript / TypeScript / JSX / TSX: Uses the Babel parser to remove comments without breaking strings or regex literals.

- CSS: Uses PostCSS to walk the AST and remove comments.

### Author

[Mauricio Soto](https://soto92.github.io/portfolio/)

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
