<template>
  <v-card>
    <v-layout>
      <v-app-bar title="Translator"> </v-app-bar>
      <v-navigation-drawer expand-on-hover rail permanent>
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-translate"
            title="Translator"
            value="translator"
            @click="$router.push('/')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-star"
            title="Shared"
            value="Shared"
            @click="$router.push('/shared')"
          ></v-list-item>
        </v-list>
        <template v-slot:append>
          <div>
            <v-list-item
              prepend-icon="mdi-theme-light-dark"
              value="theme"
              title="Change theme"
              @click="toggleTheme"
            ></v-list-item>
          </div>
        </template>
      </v-navigation-drawer>

      <v-main> <NuxtPage></NuxtPage></v-main>
    </v-layout>
  </v-card>
</template>
<script setup lang="ts">
const appStore = useAppStore();
function toggleTheme() {
  appStore.changeTheme();
}
</script>
