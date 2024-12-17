<script setup lang="ts">
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";
import {Button} from "~/components/ui/button";
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
import {computed, ref} from "vue";
import {useUserStore} from "~/stores/user";
import {useRouter} from "#app";


const players = [
  {
    name: 'Alexis',
    highScore: 100,
  },
  {
    name: 'Quentin',
    highScore: 0,
  },
  {
    name: 'Jesse',
    highScore: 80,
  },
  {
    name: 'Jenny',
    highScore: 70,
  },
  {
    name: 'Bobby',
    highScore: 60,
  },
  {
    name: 'Samantha',
    highScore: 50,
  },
  {
    name: 'Dylan',
    highScore: 40,
  },
  {
    name: 'Megan',
    highScore: 30,
  },
  {
    name: 'Derek',
    highScore: 20,
  },
  {
    name: 'Hannah',
    highScore: 10,
  },
  {
    name: 'John',
    highScore: 5,
  },
  {
    name: 'Liam',
    highScore: 4,
  },
  {
    name: 'Olivia',
    highScore: 3,
  },
  {
    name: 'Noah',
    highScore: 2,
  },
  {
    name: 'Emma',
    highScore: 1,
  },
]
const page = ref(1);

const playersPage = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return players.slice(start, end);
})
const itemsPerPage = 5;
const userStore = useUserStore();

function handleUpdate(newPage: number) {
  page.value = newPage;
}

function startGame() {
  const router = useRouter();
  const route = router.currentRoute.value.fullPath;

  router.push(`${route}/${userStore.player_name}`);
}
</script>

<template>
  <div>
    <h1 class="text-xl font-bold text-center my-4">
      Lobby
    </h1>
    <Table class="max-w-96" center>
      <TableHeader>
        <TableRow>
          <TableHead>Players</TableHead>
          <TableHead class="text-right">High Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="player in playersPage" :key="player.name">
          <TableCell>
            {{player.name}}
          </TableCell>
          <TableCell class="text-right">
            {{player.highScore}}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <div class="flex flex-col items-center">
      <p class="my-4 text-muted-foreground text-sm">
        Page {{ page }} of {{ Math.ceil(players.length / itemsPerPage) }} ({{ players.length }} players)
      </p>
      <Pagination v-slot="{ page }"
                  :total="players.length"
                  :sibling-count="1"
                  show-edges
                  :default-page="1"
                  @update:page="handleUpdate"
                  :itemsPerPage="itemsPerPage"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationPrev />
          <template v-for="(item, index) in items">
            <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
              <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext />
        </PaginationList>
      </Pagination>
    </div>
    <div class="my-8 text-center">
      <p class="text-lg" v-if="!userStore.isAdmin">
        Waiting to the admin start the game...
      </p>
      <Button v-else @click="startGame">
        Start game
      </Button>
    </div>
  </div>
</template>
