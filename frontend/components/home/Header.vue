<script setup lang="ts">
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import HomeRoomDialogContent from "~/components/home/DialogCreate.vue";
import {ModeRoom} from "~/types/modeRoom";
import {ref} from "vue";

const props = defineProps<{
  data: any[],
  updateGames: (newGames: any[]) => void,
}>();

const filterValue = ref('')

function onChangeFilter() {
  props.updateGames(props.data.filter(game => game.players.map((player: any) => player.name).join("").toLowerCase().includes(filterValue.value.toLowerCase())));
}

</script>

<template>
  <div class="flex w-full justify-between items-center mb-2">
    <Input type="text" placeholder="Filter" v-model="filterValue" class="w-64" @input="onChangeFilter"/>
      <HomeRoomDialogContent :mode-room="ModeRoom.create">
        <Button size="sm">
          <font-awesome icon="plus" class="mr-2"/>
          Create room
        </Button>
      </HomeRoomDialogContent>
  </div>
</template>