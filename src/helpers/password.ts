import bcrypt from 'bcryptjs';

export const generatePassword = function async (username: string, password: string) {
  return new Promise(function (resolve: (arg0: string) => void, reject: (arg0: Error) => void) {
    const saltRound = 10
    const usernamePassword = username + password
    bcrypt.genSalt(saltRound, function (err: Error | null, salt: string): void {
      bcrypt.hash(usernamePassword, salt, function (err: Error | null, hash: string) {
        if (!err) {
          resolve(hash)
        } else {
          reject(err)
        }
      })
    })
  })
}

export const checkPassword = function async (password: string, hashedPassword: string, username: string) {
  const usernamePassword = username + password
  return bcrypt.compare(usernamePassword, hashedPassword)
}