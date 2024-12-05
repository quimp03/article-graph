import User from "../model/user.model"
import {generateRandomString} from "../helper/generate.helper"
import md5 from "md5";
export const resolversUser = {
  Query: {
    getUser: async (_, args, context) => {
        const tokenVerify = context.req.tokenVerify;
        const infoUser = await User.findOne({
          token: tokenVerify,
          deleted: false
        });
        if(infoUser) {
          return {
            code: 200,
            message: "Thành công!",
            id: infoUser.id,
            fullName: infoUser.fullName,
            email: infoUser.email,
            token: infoUser.token
          }
        } else {
          return {
            code: 400,
            message: "Thất bại!",
          }
        }
      }
  },
  Mutation: {
    registerUser: async (_, args) => {
      const { user } = args;
      const existUser = await User.findOne({
        email: user.email,
        deleted: false
      });
      if(existUser) {
        return {
          code: 400,
          message: "Email đã tồn tại!"
        }
      } else {
        user.password = md5(user.password);
        user.token = generateRandomString(30);
        const newUser = new User(user);
        const data = await newUser.save();
        return {
          code: 200,
          message: "Đăng ký tài khoản thành công!",
          id: data.id,
          fullName: data.fullName,
          email: data.email,
          token: data.token
        };
      }
    },
    loginUser:  async (_, agrs) => {
        const {email, password} = agrs.user
        const user = await User.findOne({
            email: email,
            deleted: false
        })
        if(!user){
            return{
                fullName: user.fullName,
                code: 400,
                message: "Email not exist!"
            }
        }
        if(md5(password) !== user.password){
            return{
                
                code: 400,
                message: "Wrong password!"
            }
        }
        return{
            code: 200,
            message: "Login successfully!",
            fullName: user.fullName,
            token: user.token,
        }
    }
  }
}