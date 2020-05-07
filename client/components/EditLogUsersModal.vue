<template>
  <v-row justify="end" class="mr-1">
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Log</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="d-flex justify-space-between">
              <v-col cols="5" md="5">
              </v-col>
              <v-col cols="5" md="5">
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

  @Emit('close-modal')
  confirm() {
    
  }

  @Emit('close-modal')
  cancel() {
    
  }

}
</script>