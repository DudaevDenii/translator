import type { translated } from "./../types/translated";
import { useTheme } from "vuetify";
interface language {
  language: string;
}
export const useAppStore = defineStore("app", () => {
  //app import consts
  const theme = useTheme();
  //app consts
  const textValue = ref("");
  const result = ref();
  const fromInput = ref("en");
  const toInput = ref("ru");
  const languages = ref();
  const shared = ref<translated[]>([]);
  function updateLS() {
    if (process.client) {
      const sharedString = localStorage.getItem("shared") || "[]";
      try {
        shared.value = [...JSON.parse(sharedString)];
      } catch (error) {}
    }
  }
  onMounted(() => {
    updateLS();
  });
  updateLS();
  const url =
    "https://google-translate1.p.rapidapi.com/language/translate/v2/languages";
  const options = {
    method: "GET",
    headers: {
            "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "670066679amshad2e1f72e6ab618p15551fjsne8bca8659085",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
  };

  //app functions
  async function getLanguages() {
    try {
      const response = await fetch(url, options).then((res) => res.json());
      const res = response.data.languages;
      languages.value = res.map((el: language) => el.language);
      languages.value.splice(132);
    } catch (error) {
      console.error(error);
    }
  }
  getLanguages();
  function changeTheme() {
    theme.global.name.value = theme.global.current.value.dark
      ? "light"
      : "dark";
  }

  async function translate() {
    if (textValue.value.length) {
      try {
        const { data } = await useFetch(
          `https://api.mymemory.translated.net/get?q=${textValue.value}!&langpair=${fromInput.value}|${toInput.value}`
        );
        result.value = data.value;
      } catch (error) {
        console.error(error);
      }
    }
  }
  function addToLS(id: number) {
    const currentItem = result.value.matches.find((el: any) => el.id === id);
    if (process.client) {
      try {
        const sharedString = localStorage.getItem("shared") || "[]";

        localStorage.setItem(
          "shared",
          JSON.stringify([...JSON.parse(sharedString), currentItem])
        );
        updateLS();
      } catch (error) {}
    }
  }
  return {
    changeTheme,
    textValue,
    translate,
    result,
    fromInput,
    toInput,
    languages,
    shared,
    addToLS,
  };
});
