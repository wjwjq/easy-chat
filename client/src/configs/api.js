const baseUrl = '/api';//'../../mock/';
const ext = '';//'.json';
export default  {
    messages: baseUrl + `/messages${ext}`,
    friends: baseUrl + `/friends${ext}`,
    auth: {
        signup: baseUrl + `/auth${ext}/signup`,
        signin: baseUrl + `/auth${ext}/signin`,
        valid: baseUrl + `/auth${ext}/valid`
    }
};