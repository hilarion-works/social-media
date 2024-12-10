import JWT from 'jsonwebtoken'

export const generateToken = (user: {id: number, level: number}) => {
      const { id, level } = user
      const credentials = { id, level }
      const token = JWT.sign(credentials, process.env.JWT_SECRET ?? "", {
        expiresIn: '30d'
      }) // Expiration Date For 30 days
      return token
    }


export const verifyToken = (token: string) => {
  const content = JWT.verify(token, 'shhhhh', function(err, decoded) {
  });
  return content
}