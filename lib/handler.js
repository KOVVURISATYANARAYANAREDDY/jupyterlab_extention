import { ServerConnection } from '@jupyterlab/services';
import { URLExt } from '@jupyterlab/coreutils';
const LLAMA2_API_URL = '/llama2';
export async function requestAPI(endpoint, init = {}) {
    const settings = ServerConnection.makeSettings({
        baseUrl: 'http://localhost:8000/',
        wsUrl: 'ws://localhost:8000/'
    });
    console.log(settings.baseUrl);
    console.log(LLAMA2_API_URL);
    const requestUrl = URLExt.join("http://localhost:8000/", LLAMA2_API_URL);
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
        response = await ServerConnection.makeRequest(requestUrl, init, settings);
    }
    catch (error) {
        throw new ServerConnection.NetworkError(new Error(String(error)));
    }
    const data = await response.json();
    if (!response.ok) {
        throw new ServerConnection.ResponseError(response, data.message);
    }
    return data;
}
//# sourceMappingURL=handler.js.map