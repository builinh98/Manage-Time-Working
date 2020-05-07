<template>
  <v-row justify="end" class="mr-1">
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <!-- <template v-slot:activator="{ on }">
        <v-icon size="30" v-on="on">mdi-table-edit</v-icon>
      </template> -->
      <v-card>
        <v-card-title>
          <span class="headline">Edit User</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="d-flex justify-space-between">
              <v-col cols="5" md="5">
                <v-row>
                  <v-text-field v-model="firstname" label="First Name" required></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field v-model="lastname" label="Last Name" required></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field v-model="fullname" label="Full Name" disabled></v-text-field>
                </v-row>
                <v-row>
                  <FileInput @change-avatar="changeAvatar" />
                </v-row>
              </v-col>
              <v-col cols="5" md="5">
                <v-row>
                  <Datepicker @change-dob="changeDateOfBirth" />
                </v-row>
                <v-row>
                  <v-radio-group v-model="radios" row>
                    <v-radio label="Male" value="male"></v-radio>
                    <v-radio label="Female" value="female"></v-radio>
                  </v-radio-group>
                </v-row>
                <v-row>
                  <label>Roles</label>
                  <MultiCombobox />
                </v-row>
                <v-row>
                  <label>Positions</label>
                  <MultiCombobox />
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">Close</v-btn>
          <v-btn color="blue darken-1" text @click="confirm">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import Datepicker from '@/components/Datepicker.vue'
import MultiCombobox from '@/components/MultiCombobox.vue'
import FileInput from '@/components/FileInput.vue'

@Component({
  components: {
    Datepicker,
    MultiCombobox,
    FileInput
  }
})
export default class Breadcumd extends Vue {
  @Prop({ required: true }) editDialog!: boolean

  get fullname(): string {
    return this.firstname + ' ' + this.lastname
  }

  firstname: string = ''
  lastname: string = ''
  dob: string = ''
  radios: string = 'male'
  position: Array<string> = []
  avatar: string = ''


  @Emit('close-modal')
  confirm() {
    
  }

  @Emit('close-modal')
  cancel() {
    
  }

  changeDateOfBirth(dobFormated: string, dob: string) {
    this.dob = dob
  }

  changeAvatar(avatar: string) {
    this.avatar = avatar
  }
}
</script>