<template>
  <v-container fluid class="grey lighten-4 fill-height">
    <v-row class="white no-gutters mb-4">
      <Breadcumb title=""/>
    </v-row>
    <v-row class="white no-gutters">
      <v-col cols="12">
        <v-form class="fill-height">
          <v-container class="pa-8">
            <v-row class="d-flex justify-space-between">
              <v-col cols="5" md="5">
                <v-row >
                  <v-text-field v-model="firstname" label="First Name" required></v-text-field>
                </v-row>
                <v-row >
                  <v-text-field v-model="lastname" label="Last Name" required></v-text-field>
                </v-row>
                <v-row >
                  <v-text-field v-model="fullname" label="Full Name" disabled></v-text-field>
                </v-row>
                <v-row >
                  <FileInput @change-avatar="changeAvatar"/>
                </v-row>
                <v-row>
                  <v-avatar size="90">
                    <v-icon size="90">mdi-account-circle</v-icon>
                  </v-avatar>
                </v-row>
              </v-col>
              <v-col cols="5" md="5">
                <v-row >
                  <Datepicker @change-dob="changeDateOfBirth"/>
                </v-row>
                <v-row >
                  <v-radio-group v-model="radios" row>
                    <v-radio label="Male" value="male"></v-radio>
                    <v-radio label="Female" value="female"></v-radio>
                  </v-radio-group>
                </v-row>
                <v-row >
                  <MultiCombobox />
                </v-row>
                <v-row>
                  <v-spacer></v-spacer>
                  <v-btn depressed large color="primary">Save</v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Breadcumb from '@/components/Breadcumb.vue'
import Datepicker from '@/components/Datepicker.vue'
import MultiCombobox from '@/components/MultiCombobox.vue'
import FileInput from '@/components/FileInput.vue'

@Component({
  components: {
    Breadcumb,
    Datepicker,
    MultiCombobox,
    FileInput,
  }
})
export default class Profile extends Vue {
  firstname: string = ''
  lastname: string = ''
  dob: string = ''
  radios: string = 'male'
  position: Array<string> = []
  avatar: string = ''

  get fullname(): string {
    return this.firstname + ' ' + this.lastname
  }

  changeDateOfBirth(dobFormated: string, dob: string){
    this.dob = dob
  }

  changeAvatar(avatar: string){
    this.avatar = avatar
  }
}
</script>