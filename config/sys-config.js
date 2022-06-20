//************************ */

console.log(process.argv);

var devFlag = false;
if(process.argv[2]=='develop'){
    devFlag = true;
    console.log('Runnig in develop mode');
}



module.exports = {
    log_in_out_callBackUrl: {
        DevMode: '/profile/',
        //ServiceMode: 'http://insurance-customer-portal.s3-website-ap-northeast-1.amazonaws.com/profile/'
        ServiceMode: 'https://www.insurancecustomerportal.com/profile/'
    },
    DevMode: devFlag  //control the call back URL
};
