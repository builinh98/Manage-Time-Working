// import {
//   VuexModule,
//   Module,
//   Action,
//   Mutation,
//   getModule
// } from 'vuex-module-decorators'
// import store from '@/store'
// import { $axios } from '~/utils/api'

// export interface IUserState {
//   token: string
//   username: string
//   firstname: string
//   lastname: string
//   avatar: string
//   roles: string[]
//   positions: string[]
// }

// @Module({
//   name: 'user',
//   stateFactory: true,
//   namespaced: true,
//   dynamic: true,
//   store
// })
// class User extends VuexModule implements IUserState {
//   public token =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxpbmhicS5pbnRlcm5AZ21haWwuY29tIiwiaWF0IjoxNTg4NTkyODM3LCJleHAiOjE1ODg5NTI4Mzd9.wOipnKndHxv7HHG6Q040i1h-9KBJcY_MxNLOFHmIFlQ'

//   public username = ''
//   public firstname = ''
//   public lastname = ''
//   public avatar = ''
//   public roles: string[] = []
//   public positions: string[] = []

//   @Mutation
//   private SET_TOKEN(token: string) {
//     this.token = token
//   }

//   @Mutation
//   private SET_USERNAME(username: string) {
//     this.username = username
//   }

//   @Mutation
//   private SET_LASTNAME(lastname: string) {
//     this.lastname = lastname
//   }

//   @Mutation
//   private SET_AVATAR(avatar: string) {
//     this.avatar = avatar
//   }

//   @Mutation
//   private SET_POSITIONS(positions: string[]) {
//     this.positions = positions
//   }

//   @Mutation
//   private SET_ROLES(roles: string[]) {
//     this.roles = roles
//   }

//   // @Action
//   // public async Login(userInfo: { username: string; password: string }) {
//   //   let { username, password } = userInfo
//   //   username = username.trim()
//   //   const { data } = await login({ username, password })
//   // setToken(data.accessToken)
//   //   this.SET_TOKEN(data.accessToken)
//   // }

//   // @Action
//   // public ResetToken() {
//   //   removeToken()
//   //   this.SET_TOKEN('')
//   //   this.SET_ROLES([])
//   // }

//   @Action
//   public async GetUserInfo() {
//     if (this.token === '') {
//       throw new Error('GetUserInfo: token is undefined!')
//     }
//     $axios.setToken(this.token, 'Bearer')
//     const data = await $axios.$get('users/1')

//     if (!data) {
//       throw new Error('Verification failed, please Login again.')
//     }

//     const {
//       username,
//       firstname,
//       lastname,
//       avatar,
//       roles,
//       positions
//     } = data.user

//     // roles must be a non-empty array
//     if (!roles || roles.length <= 0) {
//       throw new Error('GetUserInfo: roles must be a non-null array!')
//     }

//     this.SET_USERNAME(username)
//     this.SET_USERNAME(firstname)
//     this.SET_LASTNAME(lastname)
//     this.SET_AVATAR(avatar)
//     this.SET_ROLES(roles)
//     this.SET_POSITIONS(positions)
//   }

//   // @Action
//   // public async ChangeRoles(role: string) {
//   // // Dynamically modify permissions
//   // const token = role + '-token'
//   // this.SET_TOKEN(token)
//   // setToken(token)
//   // await this.GetUserInfo()
//   // resetRouter()
//   // // Generate dynamic accessible routes based on roles
//   // PermissionModule.GenerateRoutes(this.roles)
//   // // Add generated routes
//   // router.addRoutes(PermissionModule.dynamicRoutes)
//   // // Reset visited views and cached views
//   // TagsViewModule.delAllViews()
//   // }

//   // @Action
//   // public async LogOut() {
//   //   if (this.token === '') {
//   //     throw Error('LogOut: token is undefined!')
//   //   }
//   //   await logout()
//   //   removeToken()
//   //   resetRouter()

//   //   // Reset visited views and cached views
//   //   TagsViewModule.delAllViews()
//   //   this.SET_TOKEN('')
//   //   this.SET_ROLES([])
//   // }
// }

// export const UserModule = getModule(User)

import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'

@Module({
  name: 'UserModule',
  namespaced: true,
  stateFactory: true
})
export default class UserModule extends VuexModule {
  public token: string = ''
  public username: string = ''
  public firstname: string = ''
  public lastname: string = ''
  public avatar: string = ''
  public roles: string[] = []
  public positions: string[] = []

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_USERNAME(username: string) {
    this.username = username
  }

  @Mutation
  private SET_LASTNAME(lastname: string) {
    this.lastname = lastname
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_POSITIONS(positions: string[]) {
    this.positions = positions
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Mutation
  public getUserInfo() {
    console.log('fsdfsdfdsifhsdi')
    this.SET_USERNAME('linhbq')
    // if (this.token === '') {
    //   throw new Error('GetUserInfo: token is undefined!')
    // }
    // $axios.setToken(this.token, 'Bearer')
    // const data = await $axios.$get('users/1')
    // if (!data) {
    //   throw new Error('Verification failed, please Login again.')
    // }
  }
}
