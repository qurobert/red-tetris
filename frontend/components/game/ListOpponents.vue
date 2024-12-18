<script setup lang="ts">
import TetrisBoard from "~/components/game/utility/TetrisBoard.vue";
import Block from "~/components/game/utility/Block.vue";
import {useGameStateStore} from "~/stores/gameState";
import {computed} from "vue";
import {useSocketStore} from "#imports";
import _ from "lodash";

const gameState = useGameStateStore();
const socketStore = useSocketStore();

const players = computed(() => gameState.infoGame?.players?.filter(player => player.id !== socketStore.socket.id));

function formatBoard(board: Board[]) {
  if (board.length === 0) {
    return board;
  }
  let newBoard = [] as Board[]

  for (let i = 1; i <= 10; i++) {
    const filteredBoard = board.filter(b => b.isFilled && !b.indestructible && b.col === i)
    const minRow = !filteredBoard.length ? undefined : Math.min(...filteredBoard?.map(b => b.row))
    const boardMinRow = board.find(b => b.row === minRow && b.col === i) as Board
    for (let j = 1; j <= 20; j++) {
      if (j === minRow) {
        newBoard.push(_.cloneDeep(boardMinRow) as Board)
      } else if (minRow && j > minRow) {
        newBoard.push({
          row: j,
          col: i,
          color: 'bg-[#666]',
          isFilled: true,
          indestructible: false
        })
      } else {
        newBoard.push({
          row: j,
          col: i,
          color: null,
          isFilled: false,
          indestructible: false
        })
      }
    }
  }
  return newBoard;
}
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
          <Block :col="block.col" :row="block.row" :color="block.color ?? ''" :is-border="block.isFilled  " v-for="block in formatBoard(player.board)" />
        </TetrisBoard>
        <p class="text-center mt-2">{{player.name}} #{{index + 1}}</p>
        <p class="text-center">{{player.currentScore}}</p>
      </div>
    </div>
  </div>
</template>
