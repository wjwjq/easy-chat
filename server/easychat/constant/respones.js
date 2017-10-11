const CODE_200 = '200';
const CODE_204 = '204';
const CODE_400 = '400';
const CODE_401 = '401';
const CODE_404 = '400';
const CODE_500 = '400';

//200
const CODE_SEND_SUCCESS_RES = {
    'status': 200,
    'message': '验证码已发送,请注意查收手机短信'
};

const SIGN_IN_SUCCESS_RES ={
    'status': 200,
    'message': '注册成功'
};

//204
const PHONE_EXISTED_RES = {
    'status': 204,
    'message': '手机号已存在, 请更换手机号'
};

//400
const REQUEST_PARAMS_ERROR_RES = {
    'status': 400,
    'message': '请求参数错误'
};
const PHONE_FORMAT_ERROR_RES = {
    'status': 401,
    'message': '手机号格式错误'
};

//401
const PHONE_NOT_EXISTED_RES = {
    'status': 401,
    'message': '无此手机号,请更换手机号或注册'
};
const PHONE_AND_PASSWORD_ERROR_RES = {
    'status': 401,
    'message': '手机号或密码错误'
};

const CODE_EXPIRED_RES = {
    'status': 401,
    'message': '验证码已过期'
};
const CODE_NOT_FIND_RES = {
    'status': 401,
    'message': '验证码不存在'
};
const CODE_NOT_EQUAL_RES = {
    'status': 401,
    'message': '验证码错误'
};
const USER_NOT_EXISTED_RES = {
    'status': 401,
    'message': '用户名不存在'
};
const USER_AUTH_FAIL_RES = {
    'status': 401,
    'message': '账号或密码不正确'
};

//404

//500
const CODE_SEND_FAIL_RES = {
    'status': 500,
    'message': '发送验证码失败,请稍后重试'
};
const SERVER_IS_BUSY_RES = {
    'status': 500,
    'message': '服务器正忙,请稍后重试'
};

module.exports = {
    PHONE_EXISTED_RES,
    PHONE_NOT_EXISTED_RES,
    
    CODE_SEND_FAIL_RES,
    CODE_SEND_SUCCESS_RES,

    REQUEST_PARAMS_ERROR_RES,

    SERVER_IS_BUSY_RES
};