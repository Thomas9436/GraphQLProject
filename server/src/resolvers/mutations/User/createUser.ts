import { hashPassword } from "../../../modules/auth.js"
import { MutationResolvers } from "../../../types"

export const createUser: MutationResolvers['createUser'] = async (_, {username, password}, {dataSources}) => {
    try {
      const user = await dataSources.db.user.create({
        data: {
          username,
          password: await hashPassword(password)
        }
      })

      return {
        code: 201,
        message: `User ${user.username} successfully created`,
        success: true,
        user: {
          id: user.id,
          username: user.username
        }
      }
    } catch (err) {
      return {
        code: 400,
        message: (err as Error)?.message ?? 'Resource not modified, an internal error occured',
        success: false,
        user: null,
      }
    }
  }