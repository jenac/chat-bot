export class AzureMdLogger {
    
     constructor(azureApi, restClient) {
         this.azureApi = azureApi;
         this.restClient = restClient;
     }
 
     log(message) {
         let args = {
             data: message,
             headers: { "Content-Type": "application/json" }
         };
        
        this.restClient.post(this.azureApi, args, (data, response) => {
            // parsed response body as js object 
            console.log(data);
            // raw response 
            console.log(response);
        });
     }
}
 
 