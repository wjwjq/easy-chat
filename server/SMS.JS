const SMSClient = require('@alicloud/sms-sdk');
const SMSConfig = require('./SMSConfig');
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = SMSConfig.accessKeyId; //'yourAccessKeyId'
const secretAccessKey = SMSConfig.accessKeySecret; //'yourAccessKeySecret'

//初始化sms_client
let smsClient = new SMSClient({ accessKeyId, secretAccessKey });

//发送短信
smsClient.sendSMS({
    PhoneNumbers: '18990655830',
    SignName: SMSConfig.signName,
    TemplateCode: SMSConfig.templateCode,
    TemplateParam: '{"code":"12345","product":"云通信"}'
}).then(function (res) {
    let { Code }=res;
    if (Code === 'OK') {
        //处理返回参数
        console.info(res);
    }
}, function (err) {
    console.info(err);
});

return;
//短信回执报告
smsClient.receiveMsg(0, queueName).then(function (res) {
    //消息体需要base64解码
    let { code, body }=res;
    if (code === 200) {
        //处理消息体,messagebody
        console.info(body);
    }
}, function (err) {
    console.info(err);
});

//短信上行报告
smsClient.receiveMsg(1, queueName).then(function (res) {
    //消息体需要base64解码
    let { code, body }=res;
    if (code === 200) {
        //处理消息体,messagebody
        console.info(body);
    }
}, function (err) {
    console.info(err);
});
 
//查询短信发送详情
smsClient.queryDetail({
    PhoneNumber: '1500000000',
    SendDate: '20170731',
    PageSize: '10',
    CurrentPage: '1'
}).then(function (res) {
    let { Code, SmsSendDetailDTOs }=res;
    if (Code === 'OK') {
        //处理发送详情内容
        console.info(SmsSendDetailDTOs);
    }
}, function (err) {
    //处理错误
    console.info(err);
});