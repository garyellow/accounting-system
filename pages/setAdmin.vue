<template>
  <div>
    <div v-for="user in users">
      {{ user }}
    </div>
    <br />
    <q-btn
      v-for="(user, key) in users"
      :key="key"
      color="red"
      @click="removeUser(user.uid)"
    >
      {{ user }}
    </q-btn>
    <br />
    <q-input
      outlined
      v-model="newUser"
      label="Outlined"
    />
    <br />
    <q-btn
      color="primary"
      label="Primary"
      @click="addUser"
    />
    <br />
    <div v-for="admin in admins">
      {{ admin }}
    </div>
    <br />
    <q-btn
      v-for="(admin, key) in admins"
      :key="key"
      color="red"
      @click="removeAdmin(admin.uid)"
    >
      {{ admin }}
    </q-btn>
    <br />
    <q-input
      outlined
      v-model="newAdmin"
      label="Outlined"
    />
    <br />
    <q-btn
      color="primary"
      label="Primary"
      @click="addAdmin"
    />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth', 'super-admin'],
  title: '設定管理員',
})

const user = useCurrentUser()
const { data: admins, refresh: adminsRefresh } = useFetch('/api/admins', {
  method: 'GET',
  headers: {
    Authorization: 'Bearer ' + (await user.value?.getIdToken(true)),
  },
})

const newAdmin = ref('')
const addAdmin = async () => {
  await $fetch('/api/admin', {
    method: 'PUT',
    params: { id: newAdmin.value },
    headers: {
      Authorization: 'Bearer ' + (await user.value?.getIdToken(true)),
    },
  })

  await adminsRefresh()
}

const removeAdmin = async (id: string) => {
  await $fetch('/api/admin', {
    method: 'DELETE',
    params: { id },
    headers: {
      Authorization: 'Bearer ' + (await user.value?.getIdToken(true)),
    },
  })

  await adminsRefresh()
}

const { data: users, refresh: usersRefresh } = useFetch('/api/users', {
  method: 'GET',
  headers: {
    Authorization: 'Bearer ' + (await user.value?.getIdToken(true)),
  },
})

const newUser = ref('')
const addUser = async () => {
  await $fetch('/api/user', {
    method: 'PUT',
    params: { id: newUser.value },
    headers: {
      Authorization: 'Bearer ' + (await user.value?.getIdToken(true)),
    },
  })

  await usersRefresh()
}

const removeUser = async (id: string) => {
  await $fetch('/api/user', {
    method: 'DELETE',
    params: { id },
    headers: {
      Authorization: 'Bearer ' + (await user.value?.getIdToken(true)),
    },
  })

  await usersRefresh()
}
</script>
