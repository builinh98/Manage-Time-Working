import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

interface UserData {
  username: string
  firstname: string
  lastname: string
  dob: string
  gender: string
  avatar: string
  token: string
  positions: string[]
  roles: string[]

}

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true
})
export default class User extends VuexModule {
  public info: UserData = {
    username: 'linhbq.intern@gmail.com',
    firstname: 'Bùi Quang',
    lastname: 'Linh',
    positions: ['dev'],
    roles: ['amin, user'],
    dob: '23/02/1998',
    gender: 'Male',
    avatar: '',
    token: ''
  }

  get fullName(): string {
    return this.info.firstname + ' ' + this.info.lastname
  }

  @Mutation
  public updateUserInfo(data: UserData) {
    this.info = { ...this.info, ...data }
  }
}