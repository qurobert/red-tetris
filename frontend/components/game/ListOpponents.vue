<script setup lang="ts">
import TetrisBoard from "~/components/game/utility/TetrisBoard.vue";
import Block from "~/components/game/utility/Block.vue";
import {useGameStateStore} from "~/stores/gameState";
import {computed} from "vue";
import {useSocketStore} from "#imports";

const gameState = useGameStateStore();
const socketStore = useSocketStore();
const players = computed(() => gameState.infoGame?.players?.filter(player => player.id !== socketStore.socket.id));
</script>

<template>
  <div>
    <h1 class="font-bold text-xl mt-8 mb-2 text-center">Opponents</h1>
    <div class="m-4 flex flex-wrap gap-4 justify-center">
      <div v-if="players?.length === 0" class="text-center">
        No opponents
      </div>
      <div v-for="(player, index) in players?.sort((a, b) => b.currentScore - a.currentScore)" class="flex-col justify-center" v-else>
        <TetrisBoard size="sm">
          <Block :col="block.col" :row="block.row" :color="block.color ?? ''" :is-border="false" v-for="block in player.board" />
        </TetrisBoard>
        <p class="text-center mt-2">{{player.name}} #{{index + 1}}</p>
        <p class="text-center">{{player.currentScore}}</p>
      </div>
    </div>
  </div>
</template>
