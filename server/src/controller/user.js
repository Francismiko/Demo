const User = require('../service/user')

class UserController {
  async register(ctx, next) {
    const { account, password } = ctx.request.body
    const user = await User.checkAccount(account)
    if (user === null) {
      await User.createUser(account, password)
      ctx.body = {
        code: 200,
        msg: '注册成功',
      }

    } else {
      ctx.body = {
        code: 400,
        msg: '注册失败',
      }
    }
  }

  async login(ctx, next) {
    const { account, password, isAdmin } = ctx.request.body
    const user = await User.checkUser(account, password, isAdmin)
    if (user !== null) {
      ctx.body = {
        code: 200,
        msg: '登录成功',
        uid: user.uid,
        isAdmin: user.isAdmin,
      }
    } else {
      ctx.body = {
        code: 400,
        msg: '登录失败',
      }
    }
  }
}

module.exports = new UserController()