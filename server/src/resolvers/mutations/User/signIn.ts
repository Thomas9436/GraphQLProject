import { comparePasswords, createJWT } from "../../../modules/auth.js";
import { MutationResolvers } from "../../../types.js";

export const signIn: MutationResolvers['signIn'] = async (_, { username, password }, {dataSources}) => {
    try {
        const user = await dataSources.db.user.findFirstOrThrow({
          where: {
            username
          }
        })
  
        const isValidPassword = await comparePasswords(password, user.password)

        if (!isValidPassword) {
          return {
            code: 401,
            message: 'Invalid credentials',
            success: false,
            user: null,
          }
        }

        if (!user) {
          return {
            code: 401,
            message: 'Invalid credentials',
            success: false,
            user: null,
          }
        }
          
        const token = createJWT(user)
  
        return {
          code: 200,
          message: 'Successfully signed in',
          success: true,
          token
        }
    } catch (err) {
        return {
          code: 400,
          message: (err as Error)?.message ?? 'Resource not modified, an internal error occured',
          success: false,
          token: null,
        }
    }
};