<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {useGameStateStore} from "~/stores/gameState";

const gameStateStore = useGameStateStore()
</script>

<template>
  <Dialog :open="gameStateStore.isEndGame" @update:open="gameStateStore.setIsEndGame" v-if="gameStateStore.isEndGame">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        Save changes
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
