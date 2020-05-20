import { Module, VuexModule, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'
import * as store from '@/store'

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

  @Action
  public setUserInfo(user) {
    console.log(user)
    this.SET_USERNAME(user)
  }

}
