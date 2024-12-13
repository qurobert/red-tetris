<script setup>
import { Input } from '@/components/ui/input'
import {ref} from 'vue'
const name = ref('');
const error = ref('');

function resetError() {
  error.value = '';
}

const createGame = () => {
  if (!name.value) {
    error.value = 'Name is required'
    return ;
  }
  const router = useRouter();
  const id = '1'; // TODO: replace with real id from server

}
</script>

<template>
  <div class="m-4">
    <h1 class="text-xl my-4 font-bold">
      Create room
    </h1>
    <div class="flex items-center">
      <Input type="text" placeholder="Your name" class="w-64" v-model="name" @input="resetError"/>
      <Button class="ml-2" @click="createGame">Create</Button>
    </div>
    <p v-if="error" class="mt-2 text-red-600">{{error}}</p>
  </div>
</template>