<script lang="ts" setup>
const appStore = useAppStore();
</script>

<template>
  <v-container>
    <h1>Shared:</h1>
    <div class="d-flex flex-column ga-5">
      <v-card v-for="item in appStore.shared" variant="outlined">
        <v-card-item>
          <div class="text-overline mb-1"></div>
          <pre class="text-h6 mb-1">{{ item.translation }}</pre>
          <div class="text-caption">
            <div>From: {{ item.segment }}</div>
            <div>
              Usage:
              <v-icon
                v-for="stars in item['usage-count']"
                icon="mdi-star"
              ></v-icon>
            </div>
          </div>
        </v-card-item>
      </v-card>
    </div>
  </v-container>
</template>
