<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {ModeRoom} from "~/types/modeRoom";
import FormDialogCreateOrJoin from "~/components/home/FormDialogCreateOrJoin.vue";
import {ref} from "vue";

const isOpen = ref(false);
const idRoom = ref('');

function toggleDialog() {
  isOpen.value = !isOpen.value;
}

function setIdRoom(newIdRoom: string) {
  idRoom.value = newIdRoom;
}

</script>

<template>
  <Dialog :open="isOpen" @update:open="toggleDialog">
    <slot :setIdRoom="setIdRoom" :toggleDialog="toggleDialog"/>
  <DialogContent>
    <DialogHeader>
      <DialogTitle class="text-xl font-bold">
        Join room
      </DialogTitle>
      <DialogDescription>
          Join the room to play with your friends
      </DialogDescription>
    </DialogHeader>
    <FormDialogCreateOrJoin :mode-room="ModeRoom.join" :id-room="idRoom"/>
  </DialogContent>
  </Dialog>
</template>