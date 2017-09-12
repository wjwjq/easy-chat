const baseUrl = '/api';//'../../mock/';
const ext = '';//'.json';
export default  {
    messages: baseUrl + `/messages${ext}`,
    friends: baseUrl + `/friends${ext}`,
    auth: baseUrl + `/auth${ext}`
};