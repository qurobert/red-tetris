<script setup lang="ts">
import {capitalizeFirstLetter} from "@/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {computed, ref, watch} from "vue";
import {Button} from "~/components/ui/button";
import HeaderTableRoom from "~/components/home/Header.vue";
import DialogJoin from "~/components/home/DialogJoin.vue";
import {useAsyncData} from "#app";
import {useAsyncState} from "@vueuse/core";

const {state , isReady} = useAsyncState(await $fetch('http://localhost:3000/games'), [] as any[]);

const games = ref(null as any[] | null);

watch(state, (newState) => {
  games.value = newState;
})

function updateGames(newGames: any[]) {
  games.value = newGames;
}
</script>

<template>
  <HeaderTableRoom :data="state" :update-games="updateGames" v-if="isReady"/>
  <DialogJoin v-slot="{setIdRoom, toggleDialog}">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Players</TableHead>
          <TableHead class="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
          <TableRow v-for="game in games" :key="game.id" :class="game.status === 'playing' ? 'cursor-pointer' : ''" @click="() => {if (game.status === 'playing') return ;setIdRoom(game.id);toggleDialog()}">
              <TableCell>
                <div class="flex items-center">
                  <font-awesome :icon="(game.status === 'playing' ? 'fa-solid' : 'fa-regular') + ' fa-circle'" class="mr-2"/>
                  {{capitalizeFirstLetter(game.status)}}
                </div>
              </TableCell>
              <TableCell class="truncate max-w-32">
                {{ game.players.map((player: any) => player.name).join(", ") }}
              </TableCell>
              <TableCell class="text-right">
                  <Button size="sm" :variant="game.status !== 'playing' ? 'default' : 'secondary'" :disabled="game.status === 'playing'">
                    Join
                  </Button>
              </TableCell>
          </TableRow>
      </TableBody>
    </Table>
  </DialogJoin>
</template>