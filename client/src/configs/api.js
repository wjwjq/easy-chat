const baseUrl = '/api';
export default  {
    messages: baseUrl + `/messages`,
    friends: baseUrl + `/friends`,
    auth: {
        signup: baseUrl + `/auth/signup`,
        signin: baseUrl + `/auth/signin`,
        valid: baseUrl + `/auth/valid`,
        query: baseUrl + `/auth/users`
    },
    user: baseUrl + `/users`,
    chat: baseUrl + '/chat'
};