export class AzureMdLogger {
    
     constructor(azureApi, restClient) {
         this.azureApi = azureApi;
         this.restClient = restClient;
     }
 
     log(message, callback) {
         let args = {
             data: message,
             headers: { "Content-Type": "application/json" }
         };
        
        this.restClient.post(this.azureApi, args, callback);
     }
}
 
 