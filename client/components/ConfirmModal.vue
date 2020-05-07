<template>
  <v-row justify="end" class="mr-1">
    <v-dialog v-model="confirmDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Confirm</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="d-flex justify-space-between">You are sure ?</v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="confirm">Confirm</v-btn>
          <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'

@Component
export default class Breadcumd extends Vue {
  @Prop({ required: true }) confirmDialog!: boolean

  @Emit('close-modal')
  confirm() {
    
  }

  @Emit('close-modal')
  cancel() {
    
  }
}
</script>
