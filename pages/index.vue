<script lang="ts" setup>
useHead({
  title: "Translator",
});
const appStore = useAppStore();
</script>

<template>
  <v-container fluid class="d-flex flex-column">
    <v-textarea
      clearable
      clear-icon="mdi-close-circle"
      label="Text"
      v-model="appStore.textValue"
    ></v-textarea>
    <div v-if="appStore.languages !== undefined">
      <v-select
        label="From"
        :items="[...appStore.languages]"
        v-model="appStore.fromInput"
      ></v-select>
      <v-select
        label="To"
        :items="[...appStore.languages]"
        v-model="appStore.toInput"
      ></v-select>
    </div>
    <v-btn size="x-large" @click="appStore.translate">Translate</v-btn>

    <div v-if="appStore.result !== undefined" class="d-flex flex-column ga-5">
      <v-card
        class="mx-auto"
        variant="outlined"
        min-width="100%"
        v-for="item in appStore.result.matches"
        :key="item.id"
      >
        <v-card-item>
          <div>
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
          </div>
        </v-card-item>
        <v-card-actions>
          <v-btn @click="appStore.addToLS(item.id)"> Share </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>
