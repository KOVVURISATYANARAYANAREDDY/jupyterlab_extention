"use strict";
(self["webpackChunkcodecompletion"] = self["webpackChunkcodecompletion"] || []).push([["lib_index_js"],{

/***/ "./lib/handler.js":
/*!************************!*\
  !*** ./lib/handler.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   requestAPI: () => (/* binding */ requestAPI)
/* harmony export */ });
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);


const LLAMA2_API_URL = '/llama2';
async function requestAPI(endpoint, init = {}) {
    const settings = _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__.ServerConnection.makeSettings({
        baseUrl: 'http://localhost:8000/',
        wsUrl: 'ws://localhost:8000/'
    });
    console.log(settings.baseUrl);
    console.log(LLAMA2_API_URL);
    const requestUrl = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.URLExt.join("http://localhost:8000/", LLAMA2_API_URL);
    // Update init with CORS configuration
    init.mode = 'cors'; // Add this line
    init.credentials = 'same-origin'; // Add this line
    console.log(requestUrl);
    let response;
    try {
        console.log("init");
        console.log(init);
        console.log("settings");
        console.log(settings);
        response = await _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__.ServerConnection.makeRequest(requestUrl, init, settings);
    }
    catch (error) {
        throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__.ServerConnection.NetworkError(new Error(String(error)));
    }
    const data = await response.json();
    if (!response.ok) {
        throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__.ServerConnection.ResponseError(response, data.message);
    }
    return data;
}


/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handler */ "./lib/handler.js");


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
    requires: [_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__.INotebookTracker],
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
                    const response = await (0,_handler__WEBPACK_IMPORTED_MODULE_1__.requestAPI)('llama2', {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extension);


/***/ })

}]);
//# sourceMappingURL=lib_index_js.0c8b942ddb5efde6a471.js.map