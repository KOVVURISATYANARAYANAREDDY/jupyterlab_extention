import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';
import { requestAPI } from './handler';

/**
 * The command IDs used by the extension.
 */
namespace CommandIDs {
  export const getCompletion: string = 'llama2:getCompletion';
}

/**
 * The JupyterLab plugin.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'codecompletion:plugin',
  description: 'code completion',
  autoStart: true,
  requires: [INotebookTracker],
  activate: (
    app: JupyterFrontEnd,
    notebookTracker: INotebookTracker
  ) => {
    console.log('JupyterLab extension my_extension is activated!');

    // Register the command.
    app.commands.addCommand(CommandIDs.getCompletion, {
      label: 'Get Llama-2 Completion',
      isEnabled: () =>
        notebookTracker.currentWidget !== null &&
        notebookTracker.currentWidget === app.shell.currentWidget,
      execute: async () => {
        if (!notebookTracker.activeCell) {
          return;
        }
        const inputCode: string = notebookTracker.activeCell.model.sharedModel.source;
          console.log(inputCode)
        try {
          const response = await requestAPI<{ completions: string }>(
            'llama2',
            {
              body: JSON.stringify({ code: inputCode }),
              method: 'POST',
            }
          );
            const completions = response.completions;
            console.log("completions")
            console.log(completions)
            
          notebookTracker.activeCell.model.sharedModel.source = notebookTracker.activeCell.model.sharedModel.source.concat(completions);
        } catch (error) {
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


