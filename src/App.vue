<script>
import TodoItem from "./components/TodoItem.vue";

export default {
  components: {
    TodoItem,
  },
  data() {
    return {
      animeList: [
        { id: 0, text: "Vegetables" },
        { id: 1, text: "Cheese" },
        { id: 2, text: "Whatever else humans are supposed to eat" },
        { id: 3, text: "冰菓" },
      ],
      inputText: "Search",
    };
  },
  created() {
    // this.loadDatabase();
  },
  watch: {
    // animeList: "loadDatabase",
  },
  methods: {
    // async loadDatabase() {
    //   const fs = require("fs");
    //   fs.readFile("./database.json", "utf8", (err, jsonObject) => {
    //     if (err) {
    //       console.log("Error callback:", err);
    //       return;
    //     }
    //     try {
    //       console.log(jsonObject); // string object
    //       const jsonData = JSON.parse(jsonObject);
    //       console.log(jsonData); //object type
    //       for (var i = 0; i < jsonData.data.length; ++i) {
    //         this.animeList.addChild(jsonData.data[i]);
    //       }
    //     } catch (err) {
    //       console.log("Error while parsing JSON string data:", err);
    //     }
    //   });
    // },
  },
};
</script>

<template>
  <header id="navigator">
    <!-- <i class="material-icons"> search </i> -->
    <input
      autocomplete="off"
      tabindex="1"
      placeholder="Search..."
      type="text"
      class="search-box-input"
    />
  </header>
  <ol class="card-list">
    <!--
      我们给每个 todo 项提供它所表示的 todo 对象，
      以便能够动态展示内容。
      同时还需要给每个组件提供一个“key”，
      这在指南的 v-for 部分有详细解释。
    -->
    <TodoItem v-for="item in animeList" :todo="item" :key="item.id"></TodoItem>
  </ol>
</template>

<style>
#app {
  background-image: url("./components/image/background.jpg");
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
}
#navigator {
  height: 3em;
  margin-top: 0px;
  transform: translateY(0px);
  left: 0px;
  right: 0px;
  position: fixed;
  top: 0;
  z-index: 5;
  padding-left: calc(max(env(safe-area-inset-left), 16px)) !important;
  padding-right: calc(max(env(safe-area-inset-right), 16px)) !important;
  min-height: calc(56px + env(safe-area-inset-top)) !important;
  padding-top: env(safe-area-inset-top) !important;
  transition: all 0.225s cubic-bezier(0.165, 0.84, 0.44, 1);
  contain: layout;
  display: block;
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  max-width: 100%;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  overflow-x: hidden;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
  background-color: hsla(0, 0%, 100%, 0.5) !important;
  backdrop-filter: blur(5px);
  color: #000 !important;
}
/* div.search-box-div {
  border-radius: 10px;
  background-color: hsla(0, 0%, 100%, 0.75) !important;
  transition: box-shadow 225ms ease-out, -webkit-box-shadow 225ms ease-out;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px 0 rgba(0, 0, 0, 0.14),
    0 1px 14px 0 rgba(0, 0, 0, 0.12) !important;
  border-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  outline: none;
  text-decoration: none;
  overflow-wrap: break-word;
  white-space: normal;
  will-change: box-shadow;
  background-repeat: no-repeat;
  min-height: 3vh;
  width: 95%;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  overflow-x: hidden;
  text-rendering: optimizeLegibility;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-text-size-adjust: 100%;
  float: top;
  display: block;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
} */
i.material-icons {
  vertical-align: middle;
  left: 0.2em;
  display: inline-block;
  margin-right: 0.2em;
  top: 0.5em;
}
input.search-box-input {
  border-radius: 10px;
  background-color: hsla(0, 0%, 100%, 0.75) !important;
  transition: box-shadow 225ms ease-out, -webkit-box-shadow 225ms ease-out;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px 0 rgba(0, 0, 0, 0.14),
    0 1px 14px 0 rgba(0, 0, 0, 0.12) !important;
  border: 0;
  outline: 0;
  color: rgba(0, 0, 0, 0.87);
  /* background-color: hsla(0, 0%, 100%, 0) !important; */
  min-height: 1em;
  height: 2.2em;
  width: 20%;
  /* vertical-align: bottom; */
  left: 0.2em;
  will-change: box-shadow;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  overflow-x: hidden;
  position: relative;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
  display: inline-block;
  /* align-items: center; */
  top: 0.5em;
}
input.search-box-input:focus {
  outline: none !important;
  width: 50%;
}
ol.card-list {
  padding-left: 0;
  margin-top: 25px;
  width: 100%;
}
</style>