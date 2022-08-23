<script>
import TodoItem from "./components/TodoItem.vue";
const axios = require("axios");
const cheerio = require("cheerio");
global.Buffer = global.Buffer || require("buffer").Buffer;

export default {
  components: {
    TodoItem,
  },
  data() {
    return {
      statusShowItem: {},
      animeList: [],
      inputText: "Search",
      ifMaxed: false,
    };
  },
  created() {
    this.loadDatabase();
    this.$watch('animeList', () => window.electronAPI.updateDateBase(JSON.stringify({"data": this.animeList})), {deep: true});
  },
  // watch: {
  //   animeList: {
  //     handler() {
  //       window.electronAPI.updateDateBase(this.animeList);
  //     },
  //     deep: true
  //   },
  // },
  methods: {
    async loadDatabase() {
      var jsonObject = await window.electronAPI.showData();
      const jsonData = JSON.parse(jsonObject);
      for (var i = 0; i < jsonData.data.length; ++i) {
        try {
          this.animeList.push(jsonData.data[i]);
        } catch (err) {
          console.log("Error while appending list:", err);
        }
      }
      this.initStatus();
      // this.fetchFromWeb("https://bangumi.tv/subject/27364");
    },
    // updateDateBase(){
    //   window.electronAPI.updateDateBase(this.animeList);
    // },
    toMin() {
      window.electronAPI.minApp();
    },
    toClose() {
      window.electronAPI.closeApp();
    },
    toMax() {
      this.ifMaxed = !this.ifMaxed;
      window.electronAPI.maxApp();
    },
    toRestore() {
      this.ifMaxed = !this.ifMaxed;
      window.electronAPI.restoreApp();
    },
    initStatus() {
      for (var i = 0; i < this.animeList.length; ++i) {
        this.statusShowItem[this.animeList[i].id] = 1;
      }
    },
    showDetail(id) {
      if (this.statusShowItem[id] == 1) {
        this.statusShowItem[id] = 2;
      } else {
        this.statusShowItem[id] = 1;
      }
      for (const [key, value] of Object.entries(this.statusShowItem)) {
        if (key != id) {
          if (value == 0) {
            this.statusShowItem[key] = 1;
          } else {
            this.statusShowItem[key] = 0;
          }
        }
      }
    },
    async fetchFromWeb(url) {
      var listLength = this.animeList.length;
      var newObj = await axios
        .get(url)
        .then(function (response) {
          const $ = cheerio.load(response.data);
          var objTemp = {};
          objTemp["id"] = listLength;
          objTemp["text"] = "冰菓";
          objTemp["coverImage"] =
            "https:" +
            $("img.cover")
              .map((i, x) => $(x).attr("src"))
              .toArray()[0];
          objTemp["coverImage"] = objTemp["coverImage"].replace("/c/", "/l/");
          return objTemp;
        })
        .catch(function (error) {
          console.log(error);
          return;
        });
      const fileName = /[^/]*$/.exec(newObj["coverImage"]);
      await window.electronAPI.writeCoverImage(
        "./src/components/coverImages/" + fileName,
        newObj["coverImage"]
      );
      newObj["coverImage"] = '' + fileName;
      this.animeList.push(newObj);
      this.statusShowItem[newObj["id"]] = 1;
      console.log(this.animeList);
    },
  },
};
</script>

<template>
  <header id="titlebar">
    <div id="drag-region">
      <div id="window-controls">
        <div class="button" id="min-button" @click="toMin()">
          <img
            class="icon"
            srcset="
              ./icons/min-w-10.png 1x,
              ./icons/min-w-12.png 1.25x,
              ./icons/min-w-15.png 1.5x,
              ./icons/min-w-15.png 1.75x,
              ./icons/min-w-20.png 2x,
              ./icons/min-w-20.png 2.25x,
              ./icons/min-w-24.png 2.5x,
              ./icons/min-w-30.png 3x,
              ./icons/min-w-30.png 3.5x
            "
            draggable="false"
          />
        </div>

        <div class="button" id="max-button" @click="toMax()" v-if="!ifMaxed">
          <img
            class="icon"
            srcset="
              ./icons/max-w-10.png 1x,
              ./icons/max-w-12.png 1.25x,
              ./icons/max-w-15.png 1.5x,
              ./icons/max-w-15.png 1.75x,
              ./icons/max-w-20.png 2x,
              ./icons/max-w-20.png 2.25x,
              ./icons/max-w-24.png 2.5x,
              ./icons/max-w-30.png 3x,
              ./icons/max-w-30.png 3.5x
            "
            draggable="false"
          />
        </div>

        <div
          class="button"
          id="restore-button"
          @click="toRestore()"
          v-if="ifMaxed"
        >
          <img
            class="icon"
            srcset="
              ./icons/restore-w-10.png 1x,
              ./icons/restore-w-12.png 1.25x,
              ./icons/restore-w-15.png 1.5x,
              ./icons/restore-w-15.png 1.75x,
              ./icons/restore-w-20.png 2x,
              ./icons/restore-w-20.png 2.25x,
              ./icons/restore-w-24.png 2.5x,
              ./icons/restore-w-30.png 3x,
              ./icons/restore-w-30.png 3.5x
            "
            draggable="false"
          />
        </div>

        <div class="button" id="close-button" @click="toClose()">
          <img
            class="icon"
            srcset="
              ./icons/close-w-10.png 1x,
              ./icons/close-w-12.png 1.25x,
              ./icons/close-w-15.png 1.5x,
              ./icons/close-w-15.png 1.75x,
              ./icons/close-w-20.png 2x,
              ./icons/close-w-20.png 2.25x,
              ./icons/close-w-24.png 2.5x,
              ./icons/close-w-30.png 3x,
              ./icons/close-w-30.png 3.5x
            "
            draggable="false"
          />
        </div>
      </div>
    </div>
  </header>
  <div id="main">
    <div id="navigator">
      <input
        autocomplete="off"
        tabindex="1"
        placeholder=" Search..."
        type="text"
        class="search-box-input"
      />
    </div>
    <TodoItem
      :animeList="animeList"
      :statusShowItem="statusShowItem"
      @show-detail="showDetail"
    ></TodoItem>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
}
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
html,
body {
  height: 100%;
  margin: 0;
  background-color: hsla(0, 0%, 100%, 0.5) !important;
}
body {
  overflow-y: hidden;
}
#titlebar {
  display: block;
  position: fixed;
  height: 32px;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 5;
  background-color: hsla(0, 0%, 100%, 0.5) !important;
  backdrop-filter: blur(5px);
}
#titlebar #drag-region {
  width: 100%;
  height: 100%;
  -webkit-app-region: drag;
}
#main {
  background-image: url("./components/image/background.jpg");
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  height: calc(100vh - 32px);
  width: 100%;
  margin-top: 32px;
  overflow-y: auto !important;
  left: 0px;
  right: 0px;
  padding-bottom: 32px;
}
#main::-webkit-scrollbar {
  display: block;
  width: 12px;
}
#main::-webkit-scrollbar-track {
  background: transparent;
}

#main::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.804);
  border-right: none;
  border-left: none;
}

#main::-webkit-scrollbar-track-piece:end {
  background: transparent;
  margin-bottom: 10px;
}

#main::-webkit-scrollbar-track-piece:start {
  background: transparent;
  margin-top: 64px;
}
#titlebar {
  color: #fff;
}

#window-controls {
  display: grid;
  grid-template-columns: repeat(3, 46px);
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
}

#window-controls .button {
  grid-row: 1 / span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
#min-button {
  grid-column: 1;
}
#max-button,
#restore-button {
  grid-column: 2;
}
#close-button {
  grid-column: 3;
}
@media (-webkit-device-pixel-ratio: 1.5),
  (device-pixel-ratio: 1.5),
  (-webkit-device-pixel-ratio: 2),
  (device-pixel-ratio: 2),
  (-webkit-device-pixel-ratio: 3),
  (device-pixel-ratio: 3) {
  #window-controls .icon {
    width: 10px;
    height: 10px;
  }
}
#window-controls {
  -webkit-app-region: no-drag;
}

#window-controls .button {
  user-select: none;
}
#window-controls .button:hover {
  background: rgba(255, 255, 255, 0.1);
}
#window-controls .button:active {
  background: rgba(255, 255, 255, 0.2);
}

#close-button:hover {
  background: #e81123 !important;
}
#close-button:active {
  background: #f1707a !important;
}
#close-button:active .icon {
  filter: invert(1);
}
.maximized #titlebar {
  width: 100%;
  padding: 0;
}

.maximized #window-title {
  margin-left: 12px;
}

#app {
  padding-right: 0 !important;
  padding-top: 0 !important;
  padding-left: 0 !important;
}
#navigator {
  height: 32px;
  margin-top: 0px;
  transform: translateY(0px);
  left: 0px;
  right: 0px;
  position: fixed;
  top: 32px;
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
  min-height: 1em;
  height: 32px;
  width: 20%;
  left: 0.2em;
  will-change: box-shadow;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  overflow-x: hidden;
  position: relative;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
  display: inline-block;
  top: 0.5em;
}
input.search-box-input:focus {
  outline: none !important;
  width: 50%;
}
</style>