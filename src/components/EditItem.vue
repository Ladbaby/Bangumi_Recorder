<script>
import _debounce from "lodash/debounce";
const axios = require("axios");
const cheerio = require("cheerio");
export default {
  data() {
    return {
      itemTemp: {
        // "id": 999999,
        // "text": "",
        // "coverImage": ""
      },
      bangumiName: "",
      touched: false,
      searchList: []
    };
  },
  props: {
    todoItem: Object,
    ifEditShow: Boolean,
    nextID: Number,
  },
  created() {
    this.$watch("ifEditShow", (newVal, oldVal) => {
      if (newVal == true && oldVal == false) {
        this.itemTemp = JSON.parse(JSON.stringify(this.todoItem));
      }
    });
    // this.$watch("bangumiName", (newVal) => {
    //   if (!this.touched) {
    //     this.itemTemp["text"] = newVal;
    //     console.log("wtf");
    //     this.searchByName(this.itemTemp["text"]);
    //   }
    // });
  },
  methods: {
    // updateName(event) {
    //   this.touched = true;
    //   this.syncName(event.target.value);
    // },
    // syncName: _debounce(function () {
    //   this.touched = false;
    // }, 600),
    updateName() {
      if (this.bangumiName.trim() != "") {
        this.debounceInput();
      }
    },
    debounceInput: _debounce(function () {
      this.itemTemp["text"] = this.bangumiName;
      this.searchByName(this.itemTemp["text"]);
    }, 600),
    async searchByName(name) {
      var searchURL =
        "https://bangumi.tv/subject_search/" +
        encodeURIComponent(name) +
        "?cat=2";
      // var idTemp = this.nextID;
      var searchResult = await axios
        .get(searchURL)
        .then(function (response) {
          const $ = cheerio.load(response.data);
          var nameList = $("a.l", "#browserItemList")
            .map((i, x) => $(x).text())
            .toArray();
          var hrefList = $("a.l", "#browserItemList")
            .map((i, x) => $(x).attr("href"))
            .toArray();
          var resultList = []
          for (var i = 0; i < nameList.length; ++i){
            var objTemp = {}
            objTemp["name"] = nameList[i];
            objTemp["link"] = hrefList[i];
            resultList.push(objTemp);
          }
          return resultList;
        })
        .catch(function (error) {
          console.log(error);
          return;
        });
      for (var i = 0; i < searchResult.length; ++i) {
        console.log(searchResult[i].name);
        console.log(searchResult[i].link);
      }
    },
    displayDetail(item){
      console.log(item);
      return;
    }
  },
};
</script>

<template>
  <Transition name="slide-fade">
    <span class="card_max" v-show="ifEditShow">
      <div class="cover-div">
        <img :src="itemTemp.coverImage" alt="cover image" class="cover-image" />
      </div>
      <div class="search-div">
        <input
          id="search-name"
          type="text"
          v-model="bangumiName"
          :input="updateName()"
          placeholder="Search..."
        />
        <TransitionGroup name="search-list" tag="ul">
          <li v-for="item in searchList" :key="item.url" class="search-list-li" @click="displayDetail(item)"/>
        </TransitionGroup>
      </div>
    </span>
  </Transition>
</template>

<style scoped>
.card_max {
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
  min-height: 20vh;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  overflow-x: hidden;
  overflow-y: auto;
  text-rendering: optimizeLegibility;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-text-size-adjust: 100%;
  margin-top: 2vh;

  transition: all 0.5s ease-in-out;
  /* display: inline-block; */
  margin-right: 15px;
  width: 98%;
  height: 100%;
  position: fixed;
  left: 5px;
  top: 15vh;
  z-index: 4;
  backdrop-filter: blur(2px);
}
.slide-fade-enter-active .slide-fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(1000px);
  opacity: 0;
}
.cover-div {
  width: 130px;
  height: 230px;
  overflow: hidden;
  margin: 10px;
  margin-bottom: 0;
  position: relative;
  border-radius: 10px;
  float: left;
}

.cover-image {
  position: absolute;
  left: -1000%;
  right: -1000%;
  top: -1000%;
  bottom: -1000%;
  margin: auto;
  min-height: 100%;
  min-width: 100%;
  height: 100%;
  width: auto;
}

.search-div {
  width: 100%;
  padding-left: 20px;
  vertical-align: top;
  margin: 0;
  padding: 0;
  font-weight: 400;
  box-sizing: border-box;
  font-family: Microsoft YaHei, 微软雅黑, STHeiti, WenQuanYi Micro Hei, SimSun,
    sans-serif;
  font-size: 14px;
  color: #666;
  position: relative;
  text-align: center;
}
#search-name {
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
  text-align: center;
}
/* #search-name:focus {
  outline: none !important;
  width: 50%;
} */
</style>