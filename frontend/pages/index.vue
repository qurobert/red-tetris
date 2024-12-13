<script setup>
import {
  Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {capitalizeFirstLetter} from "../utils/index.js";
import {ref} from 'vue';
import {Input} from "../components/ui/input/index.js";
const filterValue = ref("");

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
function joinGame(id) {
  const router = useRouter()
  router.push({ path: "/" + id });
}
function goToCreateRoom() {
  const router = useRouter()
  router.push({ path: "/create" });
}
function onChangeFilter() {
  games.value = data.filter(game => game.players.join("").includes(filterValue.value));
}
</script>

<template>
  <div class="m-4">
    <h1 class="text-xl my-4 font-bold">
      Room
    </h1>
    <div class="flex w-full justify-between items-center mb-2">
      <Input type="text" placeholder="Filter" v-model="filterValue" class="w-64" @input="onChangeFilter"/>
      <Button size="sm" @click="goToCreateRoom">
        <font-awesome icon="plus" class="mr-2"/>
        Create room
      </Button>
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Players</TableHead>
          <TableHead class="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="game in games" :key="game.id" :class="game.status === 'playing' ? 'cursor-pointer' : ''" @click="() => game.status === 'playing' ? joinGame(game.id) : null">
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
  </div>
</template>
