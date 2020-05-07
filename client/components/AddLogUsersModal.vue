<template>
  <v-row justify="end" class="mr-1">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add Log</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Log</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="d-flex justify-space-between">
              <v-col cols="5" md="5">
                <v-row>
                  <v-select :items="items" label="Username" dense></v-select>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="firstname"
                    label="Check-in"
                    required
                    placeholder="hh:mm:ss"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="firstname"
                    label="Check-out"
                    required
                    placeholder="hh:mm:ss"
                  ></v-text-field>
                </v-row>
              </v-col>
              <v-col cols="5" md="5">
                <v-row>
                  <Datepicker @change-dob="changeDate" />
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Datepicker from '@/components/Datepicker.vue'
import MultiCombobox from '@/components/MultiCombobox.vue'

@Component({
  components: {
    Datepicker,
    MultiCombobox
  }
})
export default class Breadcumd extends Vue {
  items: Array<string> = ['Foo', 'Bar', 'Fizz', 'Buzz']
  dialog: boolean = false

  changeDate() {}
}
</script>
