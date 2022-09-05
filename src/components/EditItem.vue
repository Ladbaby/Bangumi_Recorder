<script>
import _debounce from "lodash/debounce";
const axios = require("axios");
const cheerio = require("cheerio");
export default {
  data() {
    return {
      itemTemp: {},
      bangumiName: "",
      touched: false,
      searchList: [],
      ifLoading: false,
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
    updateName() {
      if (this.bangumiName.trim() != "") {
        this.debounceInput();
      }
    },
    debounceInput: _debounce(function () {
      this.searchByName(this.bangumiName);
    }, 600),
    async searchByName(name) {
      if (name.trim() == "") {
        return;
      }
      this.ifLoading = true;
      var searchURL =
        "https://bangumi.tv/subject_search/" +
        encodeURIComponent(name) +
        "?cat=2";
      this.searchList = await axios
        .get(searchURL)
        .then(function (response) {
          const $ = cheerio.load(response.data);
          var nameList = $("a.l", "#browserItemList")
            .map((i, x) => $(x).text())
            .toArray();
          var hrefList = $("a.l", "#browserItemList")
            .map((i, x) => $(x).attr("href"))
            .toArray();
          var resultList = [];
          for (var i = 0; i < nameList.length; ++i) {
            var objTemp = {};
            objTemp["name"] = nameList[i];
            objTemp["link"] = "https://bangumi.tv" + hrefList[i];
            resultList.push(objTemp);
          }
          return resultList;
        })
        .catch(function (error) {
          console.log(error);
          return;
        });
      this.ifLoading = false;
    },
    async fetchFromWeb(url) {
      this.ifLoading = true;
      var listLength = this.nextID;
      this.itemTemp = await axios
        .get(url)
        .then(function (response) {
          const $ = cheerio.load(response.data);
          var objTemp = {};
          objTemp["id"] = listLength;
          objTemp[
            $("span.tip", "ul#infobox")
              .map((i, x) => $(x).text())
              .toArray()[0]
          ] = $("li", "ul#infobox")
            .first()
            .contents()
            .filter(function () {
              return this.type === "text";
            })
            .text();
          objTemp["textJP"] = $("a", "h1.nameSingle")
            .map((i, x) => $(x).text())
            .toArray()[0];
          objTemp[
            $("span.tip", "ul#infobox")
              .map((i, x) => $(x).text())
              .toArray()[1]
          ] =
            $("li", "ul#infobox").slice(1, 2).children("a.l").text() == ""
              ? $("li", "ul#infobox")
                  .slice(1, 2)
                  .contents()
                  .filter(function () {
                    return this.type === "text";
                  })
                  .text()
              : $("li", "ul#infobox")
                  .slice(1, 2)
                  .children("a.l")
                  .map((i, x) => $(x).text())
                  .toArray();
          objTemp[
            $("span.tip", "ul#infobox")
              .map((i, x) => $(x).text())
              .toArray()[2]
          ] =
            $("li", "ul#infobox").slice(2, 3).children("a.l").text() == ""
              ? $("li", "ul#infobox")
                  .slice(2, 3)
                  .contents()
                  .filter(function () {
                    return this.type === "text";
                  })
                  .text()
              : $("li", "ul#infobox")
                  .slice(2, 3)
                  .children("a.l")
                  .map((i, x) => $(x).text())
                  .toArray();
          objTemp[
            $("span.tip", "ul#infobox")
              .map((i, x) => $(x).text())
              .toArray()[3]
          ] =
            $("li", "ul#infobox").slice(3, 4).children("a.l").text() == ""
              ? $("li", "ul#infobox")
                  .slice(3, 4)
                  .contents()
                  .filter(function () {
                    return this.type === "text";
                  })
                  .text()
              : $("li", "ul#infobox")
                  .slice(3, 4)
                  .children("a.l")
                  .map((i, x) => $(x).text())
                  .toArray();
          objTemp[
            $("span.tip", "ul#infobox")
              .map((i, x) => $(x).text())
              .toArray()[4]
          ] =
            $("li", "ul#infobox").slice(4, 5).children("a.l").text() == ""
              ? $("li", "ul#infobox")
                  .slice(4, 5)
                  .contents()
                  .filter(function () {
                    return this.type === "text";
                  })
                  .text()
              : $("li", "ul#infobox")
                  .slice(4, 5)
                  .children("a.l")
                  .map((i, x) => $(x).text())
                  .toArray();
          objTemp[
            $("span.tip", "ul#infobox")
              .map((i, x) => $(x).text())
              .toArray()[5]
          ] =
            $("li", "ul#infobox").slice(5, 6).children("a.l").text() == ""
              ? $("li", "ul#infobox")
                  .slice(5, 6)
                  .contents()
                  .filter(function () {
                    return this.type === "text";
                  })
                  .text()
              : $("li", "ul#infobox")
                  .slice(5, 6)
                  .children("a.l")
                  .map((i, x) => $(x).text())
                  .toArray();
          objTemp["coverImage"] =
            "https:" +
            $("img.cover")
              .map((i, x) => $(x).attr("src"))
              .toArray()[0];
          objTemp["coverImage"] = objTemp["coverImage"].replace("/c/", "/l/");
          // objTemp["episodeList"] = []
          // $("a.load-epinfo", "ul.prg_list")
          //     .each(function(index, element) {
          //       var obj = {};
          //       obj["text"] = $(element).text();
          //       obj["title"] = $(element).attr("title");
          //       objTemp["episodeList"].push(obj);
          //     });
          objTemp["episodeList"] = []
          $("li", "ul.prg_list")
              .each(function(index, element) {
                var obj = {};
                const $elements = $(element).children();
                obj["class"] = $elements.attr("class");
                obj["text"] = $elements.text();
                obj["title"] = $elements.attr("title");
                objTemp["episodeList"].push(obj);
              });
          return objTemp;
        })
        .catch(function (error) {
          console.log(error);
          return;
        });
      this.ifLoading = false;
      console.log(this.itemTemp);
    },
    displayDetail(item) {
      this.fetchFromWeb(item.link);
      return;
    },
    getNewItem() {
      return this.itemTemp;
    },
    search_box_computed() {
      return {
        search_box: true,
        search_box_loading: this.ifLoading,
      };
    },
  },
};
</script>

<template>
  <Transition name="slide-fade">
    <span class="card_max" v-show="ifEditShow">
      <div class="cover-div">
        <img :src="itemTemp.coverImage" alt="" class="cover-image" />
      </div>
      <div class="search-div">
        <input
          :class="search_box_computed()"
          type="text"
          v-model="bangumiName"
          @input="updateName"
          placeholder="Search..."
        />
        <TransitionGroup name="search-list" tag="ul">
          <li
            v-for="item in searchList"
            :key="item.link"
            class="search-list-li"
            @click="displayDetail(item)"
          >
            {{ item.name }}
          </li>
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
  margin-top: 0;

  transition: all 0.5s ease-in-out;
  margin-right: 10px;
  /* margin:auto; */
  width: calc(100% - 24px);
  height: calc(100% - 112px);
  position: fixed;
  left: 12px;
  top: 100px;
  z-index: 6;
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
  padding-left: 200px !important;
  vertical-align: top;
  margin: 0;
  padding: 0;
  /* font-weight: 400; */
  box-sizing: border-box;
  font-family: Microsoft YaHei, 微软雅黑, STHeiti, WenQuanYi Micro Hei, SimSun,
    sans-serif;
  font-size: 14px;
  color: #666;
  position: relative;
  text-align: center;
}
.search_box {
  border-radius: 10px;
  background-color: hsla(0, 0%, 100%, 0.75) !important;
  background-repeat: no-repeat;
  background-size: contain;
  transition: box-shadow 225ms ease-out, -webkit-box-shadow 225ms ease-out;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px 0 rgba(0, 0, 0, 0.14),
    0 1px 14px 0 rgba(0, 0, 0, 0.12) !important;
  border: 0;
  outline: 0;
  color: rgba(0, 0, 0, 0.87);
  min-height: 1em;
  height: 32px;
  width: 80%;
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
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px 0 rgba(0, 0, 0, 0.14),
    0 1px 14px 0 rgba(0, 0, 0, 0.12) !important;
  /* background-image: url("../icons/search.png");
  background-position: 10px 10px; 
  background-repeat: no-repeat; */
}
.search_box_loading {
  background-image: url("../icons/loading-circle.gif");
}
.search-list-move,
.search-list-enter-active,
.search-list-leave-active {
  transition: all 0.3s ease;
}
.search-list-enter-from,
.search-list-leave-to {
  opacity: 0;
}
.search-list-leave-active {
  position: absolute;
}
ul {
  margin: auto;
  margin-top: 12px;
  width: 80%;
  border-radius: 10px;
  background-color: hsla(0, 0%, 100%, 0.75) !important;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px 0 rgba(0, 0, 0, 0.14),
    0 1px 14px 0 rgba(0, 0, 0, 0.12) !important;
  list-style-type: none;
}
.search-list-li {
  border-radius: 10px;
  overflow: hidden;
  height: 30px;
  text-align: left;
  padding-left: 10px;
}
.search-list-li:hover {
  background-color: rgb(186, 186, 186);
}
.search-list-li:active {
  filter: invert(1);
}
.grey {
  font: 10px;
  color: #999;
}
</style>