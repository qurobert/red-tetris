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
import {ref} from "vue";
import {Button} from "~/components/ui/button";
import HeaderTableRoom from "~/components/home/Header.vue";
import DialogJoin from "~/components/home/DialogJoin.vue";
const data = [
  {
    id: 1,
    status: 'playing',
    players: [
      'Alexis',
      'Quentin',
      'Jesse',
      'Jenny',
    ],
    host: 'Alexis',
  },
  {
    id: 2,
    status: 'waiting',
    players: [
      'Bobby',
      'Samantha',
      'Dylan',
    ],
    host: 'Alexis',
  },
  {
    id: 3,
    status: 'playing',
    players: [
      'Megan',
      'Derek',
      'Hannah',
      'John',
    ],
    host: 'Alexis',
  },
  {
    id: 4,
    status: 'playing',
    players: [
      'Liam',
      'Olivia',
      'Noah',
      'Emma',
    ],
    host: 'Alexis',
  },
  {
    id: 5,
    status: 'waiting',
    players: [
      'Katie',
      'Evan',
      'Mason',
    ],
    host: 'Alexis',
  },
  {
    id: 6,
    status: 'playing',
    players: [
      'Alexis',
      'Quentin',
      'Jesse',
      'Jenny',
    ],
    host: 'Alexis',
  },
  {
    id: 7,
    status: 'waiting',
    players: [
      'Bobby',
      'Samantha',
      'Dylan',
    ],
    host: 'Alexis',
  },
  {
    id: 8,
    status: 'playing',
    players: [
      'Megan',
      'Derek',
      'Hannah',
      'John',
    ],
    host: 'Alexis',
  },
  {
    id: 9,
    status: 'playing',
    players: [
      'Liam',
      'Olivia',
      'Noah',
      'Emma',
    ],
    host: 'Alexis',
  },
  {
    id: 10,
    status: 'waiting',
    players: [
      'Katie',
      'Evan',
      'Mason',
    ],
    host: 'Alexis',
  },
];

const games = ref(data);

function updateGames(newGames: any[]) {
  games.value = newGames;
}
</script>

<template>
  <HeaderTableRoom :data="data" :update-games="updateGames" />
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
          <TableRow v-for="game in games" :key="game.id" :class="game.status === 'playing' ? 'cursor-pointer' : ''" @click="() => {setIdRoom(game.id);toggleDialog()}">
              <TableCell>
                <div class="flex items-center">
                  <font-awesome :icon="(game.status === 'playing' ? 'fa-solid' : 'fa-regular') + ' fa-circle'" class="mr-2"/>
                  {{capitalizeFirstLetter(game.status)}}
                </div>
              </TableCell>
              <TableCell class="truncate max-w-32">
                {{ game.players.join(", ") }}
              </TableCell>
              <TableCell class="text-right">
                  <Button size="sm" :variant="game.status === 'playing' ? 'default' : 'secondary'" :disabled="game.status !== 'playing'">
                    Join
                  </Button>
              </TableCell>
          </TableRow>
      </TableBody>
    </Table>
  </DialogJoin>
</template>