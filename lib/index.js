import { INotebookTracker } from '@jupyterlab/notebook';
import { requestAPI } from './handler';
/**
 * The command IDs used by the extension.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.getCompletion = 'llama2:getCompletion';
})(CommandIDs || (CommandIDs = {}));
/**
 * The JupyterLab plugin.
 */
const extension = {
    id: 'codecompletion:plugin',
    description: 'code completion',
    autoStart: true,
    requires: [INotebookTracker],
    activate: (app, notebookTracker) => {
        console.log('JupyterLab extension my_extension is activated!');
        // Register the command.
        app.commands.addCommand(CommandIDs.getCompletion, {
            label: 'Get Llama-2 Completion',
            isEnabled: () => notebookTracker.currentWidget !== null &&
                notebookTracker.currentWidget === app.shell.currentWidget,
            execute: async () => {
                if (!notebookTracker.activeCell) {
                    return;
                }
                const inputCode = notebookTracker.activeCell.model.sharedModel.source;
                console.log(inputCode);
                try {
                    const response = await requestAPI('llama2', {
                        body: JSON.stringify({ code: inputCode }),
                        method: 'POST',
                    });
                    const completions = response.completions;
                    console.log("completions");
                    console.log(completions);
                    notebookTracker.activeCell.model.sharedModel.source = notebookTracker.activeCell.model.sharedModel.source.concat(completions);
                }
                catch (error) {
                    console.error('Error fetching code completion:', error);
                }
            },
        });
        // Add the command to the palette.
        app.contextMenu.addItem({
            command: CommandIDs.getCompletion,
            selector: '.jp-Notebook',
        });
    },
};
export default extension;
//# sourceMappingURL=index.js.map