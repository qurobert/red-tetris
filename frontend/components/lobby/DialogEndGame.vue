<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Separator} from "~/components/ui/separator";
import {useGameStateStore} from "~/stores/gameState";
import {useRouter} from "#app";

const gameStateStore = useGameStateStore()
function goToHome() {
  const router = useRouter();

  gameStateStore.setIsEndGame(false)
  router.push('/')
}
console.log(gameStateStore.gameOver)
</script>

<template>
  <Dialog :open="gameStateStore.isEndGame" @update:open="gameStateStore.setIsEndGame" v-if="gameStateStore.isEndGame">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <span v-if="!gameStateStore.gameOver">
            You won !
          </span>
          <span v-else>
             You lost...
          </span>
        </DialogTitle>
        <DialogDescription>
          <span v-if="!gameStateStore.gameOver">
            Congratulations
          </span>
          <span v-else>
            Better luck next time
          </span>
        </DialogDescription>
      </DialogHeader>
      <Button @click="gameStateStore.setIsEndGame(false)">
        Close
      </Button>
      <Separator />
      <Button @click="goToHome" variant="secondary">
        Go to home
      </Button>
    </DialogContent>
  </Dialog>
</template>
