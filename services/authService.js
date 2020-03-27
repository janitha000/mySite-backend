global.fetch = require('node-fetch')
global.navigator = () => null;

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const userPoolId = 'us-east-1_mIZPhv0YF';
const clientId = '7q9tdoa66324d270dm0v6daacq';

const poolData = {
    UserPoolId: userPoolId,
    ClientId: clientId
}
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const request = require('request')
const jwt = require('jsonwebtoken')


exports.Register = (body) => {
    return new Promise((resolve, reject) => {
        let name = body.name;
        let email = body.email;
        let firstName = body.firstName;
        let lastName = body.lastName;
        let password = body.password;
        let attributeList = [];

        // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'name' , Value : name}))
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: email }))
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "given_name", Value: firstName }))
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'family_name', Value: lastName }))

        userPool.signUp(email, password, attributeList, null, (err, res) => {
            if (err) {
                console.log(err);
                return reject(err.message);
            }

            let cognitoUser = res.user;
            resolve(cognitoUser);

        })
    })

}

exports.Login = (body) => {
    return new Promise((resolve, reject) => {

        const userPoolId = 'us-east-1_mIZPhv0YF';
        const clientId = '7q9tdoa66324d270dm0v6daacq';

        const poolData = {
            UserPoolId: userPoolId,
            ClientId: clientId
        }
        const userPool2 = new AmazonCognitoIdentity.CognitoUserPool(poolData);



        let userName = body.userName;
        let password = body.password;


        let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: userName,
            Password: password
        })

        let userData = {
            UserName: userName,
            Pool: userPool2
        }

        let poolId = userPool.getUserPoolId();

        let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        // cognitoUser.authenticateUser(authenticationDetails, {
        //     onSuccess: (res) => {
        //         let accessToken = res.getAccessToken().getJwtToken();
        //         resolve(accessToken);
        //     },
        //     onFailure: (err) => {
        //         console.error(err);
        //         reject(err);
        //     }
        // })

        cognitoUser.authenticateUser(authenticationDetails, (err, res) => {
            if (err) {
                console.error(err);
            }
            console.log(res)
        })

    })
}

exports.GetGoogleLoginUrl = (params) => {
    let url = 'https://accounts.google.com/o/oauth2/v2/auth?'
    let queryParams = [
        `redirect_uri=http://localhost:3000/oauth_callback`,
        `login_hint=paramsinghvc@gmail.com`,
        `scope=email`,
        `prompt=consent`,
        `state=google`,
        `client_id=386958280-koi0ufa7pflsl0trdolj7gklr3oe2t0q.apps.googleusercontent.com`,
        `response_type=code`
    ].join("&");

    return `${url}${queryParams}`;
}

exports.GoogleLogin = async (code) => {

    let url = 'https://googleapis.com/oauth2/v4/token'

    try {
        const response = await request
          .post(url, {
            resolveWithFullResponse: true
          })
          .form({
            code: code,
            client_secret : 'P-j2BEbMdivDBwKe8Uli1Fd4',
            redirect_uri: 'http://localhost:3000/oauth_callback',
            access_type: "online",
            grant_type: "authorization_code"
          });
        let tokenResponse = JSON.parse(response.body);
        let decoded = jwt.decode(token);
        return decoded
      } catch (e) {
        return { error: e };
      }

}

