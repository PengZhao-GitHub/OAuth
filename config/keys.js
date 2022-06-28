// add this file to .gitignore
// Step to configure the third party login
// https://developers.facebook.com/   ta
// https://console.developers.google.com/  ha
// https://account.mongodb.com/account/login?signedOut=true  ta
//************************************** */
// Step #1 get third party access keys
//************************************** */
module.exports = {
    google: {
        clientID: '617835213115-7b1hdi2o6k9e86ljjiggsv6aquq7ug82.apps.googleusercontent.com',
        clientSecret: 'XUV8AbpXGk-N-RcMXUrX_acw'
    },

    facebook: {
        clientID: '2728579343950130',
        clientSecret: '4c3d68e897859580b3d071d192a42aa2'
    },

    twitter: {
        clientID: 'Y7dX2b66pjChct0Lj54vmIHRP',
        clientSecret: 'yWg5rMAQgrgzo71G82jTgCzqxHY0DxxOnX8dzJ8AthouI7kMGy'
    },

    linkedin: {
        clientID: '77y9intm3a5qt0',
        clientSecret: '8ONRI9x70iJOcVQF'
    },

    line: {
        clientID: '1654774972',
        clientSecret: 'e02071ed659cbc8986d7ceab36785207'
    },

    mongodb: {
        //dbURI: 'mongodb+srv://admin:admin@cluster0.w5fwz.mongodb.net/test?retryWrites=true&w=majority'
        dbURI: 'mongodb+srv://admin:admin@cluster0.ftcg2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    },

    session: {
        cookieKey: 'pengzhaocookie1'
    }

};
