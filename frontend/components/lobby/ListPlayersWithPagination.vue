<script setup lang="ts">
import {Button} from "~/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";
import {
  Pagination, PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
} from "~/components/ui/pagination";
import {computed, ref} from "vue";
import {useLobbyStore} from "~/stores/lobby";

const page = ref(1);
const lobbyStore = useLobbyStore();

const playersPage = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return lobbyStore.players.slice(start, end);
})

const itemsPerPage = 5;

function handleUpdate(newPage: number) {
  page.value = newPage;
}

</script>

<template>
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
</template>

<style scoped>

</style>