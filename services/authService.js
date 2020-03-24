global.fetch = require('node-fetch')
global.navigator = () => null;

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const request = require('request')

const userPoolId = 'us-east-1_mIZPhv0YF';
const clientId = '7q9tdoa66324d270dm0v6daacq';

const poolData = {
    UserPoolId: userPoolId,
    ClientId: clientId
}
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

exports.Register = (body) => {
    return new Promise((resolve, reject) => {
        let name = body.name;
        let email = body.email;
        let firstName = body.firstName;
        let lastName = body.lastName;
        let password = body.password;
        let attributeList = [];

        // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'name' , Value : name}))
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email' , Value : email}))
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "given_name" , Value : firstName}))
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'family_name', Value : lastName }))

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
        let userName = body.userName;
        let password = body.password;
        const userPool = 'my-site-cog';


        let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: userName,
            Password: password
        })

        let userData = {
            UserName: userName,
            Pool: userPool
        }

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
            if(err){
                console.error(err);
            }
            console.log(res)
        })

    })
}

