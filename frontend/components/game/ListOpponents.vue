<script setup lang="ts">
import TetrisBoard from "~/components/game/utility/TetrisBoard.vue";
import Block from "~/components/game/utility/Block.vue";

const players = [
  {
    name: 'Alexis',
    score: 100,
    blocks: [] as { col: number, row: number, color: string }[]
  },
  {
    name: 'John',
    score: 200,
    blocks: [] as { col: number, row: number, color: string }[]
  },
  {
    name: 'Steven',
    score: 300,
    blocks: [] as { col: number, row: number, color: string }[]
  }
]

for (let i = 20; i > 15; i--) {
  for (let j = 1; j <= 10; j++) {
    for (const player of players) {
      player.blocks.push({
        col: j,
        row: i,
        color: 'bg-white'
      })
    }
  }
}

</script>

<template>
  <h1 class="font-bold text-xl mt-8 mb-2 text-center">Opponents</h1>
  <div class="m-4 flex flex-wrap gap-4 justify-center">
    <div v-for="(player, index) in players.sort((a, b) => b.score - a.score)" class="flex-col justify-center">
      <TetrisBoard size="sm">
        <Block :col="block.col" :row="block.row" :color="block.color" :is-border="false" v-for="block in player.blocks" />
      </TetrisBoard>
      <p class="text-center mt-2">{{player.name}} #{{index + 1}}</p>
      <p class="text-center">{{player.score}}</p>
    </div>
  </div>
</template>
