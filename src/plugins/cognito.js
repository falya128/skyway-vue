import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js'

export default {
  install: (app) => {
    const userPool = new CognitoUserPool({
      UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID
    })

    const login = async (username, password) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password
      })
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool
      })
      return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (result) => {
            resolve(result)
          },
          onFailure: (err) => {
            console.error(err.message || JSON.stringify(err))
            reject(err)
          }
        })
      })
    }
    app.provide('cognitoLogin', login)

    const logout = () => {
      const cognitoUser = userPool.getCurrentUser()
      if (cognitoUser === null) {
        throw new Error('UnAuthorized')
      }
      cognitoUser.signOut()
    }
    app.provide('cognitoLogout', logout)

    const isAuthenticated = () => {
      return new Promise((resolve, reject) => {
        const cognitoUser = userPool.getCurrentUser()
        if (cognitoUser === null) {
          reject('UnAuthorized')
        }
        cognitoUser.getSession((err, session) => {
          if (err || !session.isValid()) {
            reject(err)
          } else {
            resolve(session)
          }
        })
      })
    }
    app.provide('cognitoIsAuthenticated', isAuthenticated)
  }
}
