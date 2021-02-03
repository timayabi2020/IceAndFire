import Configs from '../config/Configs';
class APIService{
    BASE_URL = Configs.apiurl;
    GATEWAY_URL = Configs.gateway_url;
    
    
    //Perform Get requests
    async makeApiGetRequest(url) {
        let api_result = null;
        const request = {
          method: "GET",
        };
        let response = await fetch(this.BASE_URL+url, request)
        .then(this._parseResponse.bind(this))
        .then(this._parseServerJsonResponse.bind(this))
        .catch(this._handleNetworkCode.bind(this));
        return response;
      }
    
      //Perform post requests
      async makePostRequest(url, body) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*");
        const request = {
          method: "POST",
          redirect: 'follow',
          headers: myHeaders,
          
          
        };
        if (body != null) {
          request["body"] = JSON.stringify(body);
        }
         console.log("base url ",this.BASE_URL+url)
        let response = await fetch(this.BASE_URL+url, request)
          .then(this._parseResponse.bind(this))
          .then(this._parseServerJsonResponse.bind(this))
          .catch(this._handleNetworkCode.bind(this));
    
        return response;
      }
 
      
      _parseResponse(response) {
        if (!response.ok) {
          var contentType = response.headers.get("content-type");
    
          if (contentType && contentType.includes("application/json")) {
            try {
              return response.json();
            } catch (e) {}
          } else {
          
            return {
              success: false,
              message:
                "Response content type is not understandable. Please contact administrator"
            };
          }
        } else {
          var contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            try {
              return response.json();
            } catch (e) {}
          } else {
          
            return {
              success: false,
              message:
                "Response content type is not understandable. Please contact administrator"
            };
          }
        }
      }
        /**
       * @param {*} response
       */
      _parseResponse(response) {
        if (!response.ok) {
        
          var contentType = response.headers.get("content-type");
    
          if (contentType && contentType.includes("application/json")) {
            try {
              return response.json();
            } catch (e) {}
          } else {
         
            return {
              success: false,
              message:
                "Response content type is not understandable. Please contact administrator"
            };
          }
        } else {
          var contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            try {
              return response.json();
            } catch (e) {}
          } else {
           
            return {
              success: false,
              message:
                "Response content type is not understandable. Please contact administrator"
            };
          }
        }
      }
       /**
       *
       * @param {*} error
       * @param {*} data
       */
      _handleNetworkCode(error) {
    
        return { success: false, message: "Network error. Please check your internet settings" };
      }
      _parseServerJsonResponse(data) {
        return data || {};
      }
      /**
       *
       * @param {*} data
       */
    
     
      _buildAPIURL(url) {
        return this.BASE_URL + url;
      }
    }
    export default new APIService();