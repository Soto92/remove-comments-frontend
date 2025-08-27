const vscode = require("vscode");
const { removeComments } = require("./removeComments.js");

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension.removeComments",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const document = editor.document;
      const code = document.getText();

      // Map languageId to type
      const lang = document.languageId;
      let type = "js";
      if (lang === "typescript") type = "ts";
      else if (lang === "javascriptreact") type = "jsx";
      else if (lang === "typescriptreact") type = "tsx";
      else if (lang === "css") type = "css";

      if (code.length > 50000) {
        vscode.window.showWarningMessage(
          "File is large, removing comments may take a few seconds..."
        );
      }

      try {
        const newCode = await removeComments(code, type);

        const edit = new vscode.WorkspaceEdit();
        const firstLine = document.lineAt(0);
        const lastLine = document.lineAt(document.lineCount - 1);
        const fullRange = new vscode.Range(
          firstLine.range.start,
          lastLine.range.end
        );

        edit.replace(document.uri, fullRange, newCode);
        await vscode.workspace.applyEdit(edit);

        vscode.window.showInformationMessage(
          "Comments removed successfully! ✨"
        );
      } catch (err) {
        vscode.window.showErrorMessage(
          "Error removing comments: " + err.message
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
