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
import {computed, onMounted, ref} from "vue";
import {useUserStore} from "~/stores/user";
import {useRoute, useRouter} from "#app";
import {useSocketStore} from "~/stores/useSocket";
import {useLobbyStore} from "~/stores/lobby";


const lobbyStore = useLobbyStore();
const page = ref(1);

const playersPage = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return lobbyStore.players.slice(start, end);
})
const itemsPerPage = 5;
const userStore = useUserStore();

function handleUpdate(newPage: number) {
  page.value = newPage;
}

function goToGame() {
  const router = useRouter();
  const route = router.currentRoute.value.fullPath;

  router.push(`${route}/${userStore.player_name}`);
}
function startGame() {
  const socketStore = useSocketStore();
  const route = useRoute();
  const userStore = useUserStore();
  socketStore.socket.emit('start-game',
      route.params.id_room,
      userStore.id,
  );

  goToGame();
}

onMounted(() => {
  const socketStore = useSocketStore();
  const userStore = useUserStore();
  const route = useRoute();
  const router = useRouter();

  socketStore.socket.on('connect', () => {


    socketStore.socket.on('error', (_: string) => {
      router.push('/');
    });
  });

  socketStore.socket.emit('join-game',
      route.params.id_room,
      userStore.player_name,
      userStore.id,
      userStore.highScore
  );
})
// onUnmounted(() => {
  // const socket = useSocket();
  // socketStore.socket.emit('leave-game');
// })
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
        Page {{ page }} of {{ Math.ceil(lobbyStore.players.length / itemsPerPage) }} ({{ lobbyStore.players.length }} players)
      </p>
      <Pagination v-slot="{ page }"
                  :total="lobbyStore.players.length"
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
