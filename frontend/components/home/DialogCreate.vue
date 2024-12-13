<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {ModeRoom} from "~/types/modeRoom";
import FormDialogCreateOrJoin from "~/components/home/FormDialogCreateOrJoin.vue";

</script>

<template>
  <Dialog>
    <DialogTrigger>
      <slot/>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="text-xl font-bold">
          Create room
        </DialogTitle>
        <DialogDescription>
            Create a new room to play with your friends
        </DialogDescription>
      </DialogHeader>
      <FormDialogCreateOrJoin :mode-room="ModeRoom.create"/>
    </DialogContent>
  </Dialog>
</template>