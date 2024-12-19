<script setup lang="ts">
import {Button} from "~/components/ui/button";
import {useUserStore} from "~/stores/user";
import {useRoute, useRouter} from "#app";
import {useSocketStore} from "~/stores/useSocket";
const userStore = useUserStore();

function goToGame() {
  // const router = useRouter();
  // const route = router.currentRoute.value.fullPath;

   // console.log("GO TO GAME");
  // router.push(`${route}/${userStore.player_name}`);
}

function startGame() {
  const socketStore = useSocketStore();
  const route = useRoute();
  console.log("START GAME");
  socketStore.socket.emit('start-game',
      route.params.id_room
  );

  // goToGame();
}
</script>

<template>
  <div class="my-8 text-center">
    <p class="text-lg" v-if="!userStore.isAdmin">
      Waiting to the admin start the game...
    </p>
    <Button v-else @click="startGame">
      Start game
    </Button>
  </div>
</template>

<style scoped>

</style>