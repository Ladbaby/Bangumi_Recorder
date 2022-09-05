<script>
export default {
  // data() {
  //   return {
  //     statusShowItem: {},
  //   };
  // },
  props: {
    animeList: Array,
    statusShowItem: Object,
    localImageDict: Object,
    ifRemove: Boolean,
  },
  emits: ["show-detail"],
  // computed: {
  //   card_computed: function (id) {
  //     return {
  //       card: true,
  //       card_max: this.statusShowItem[id] == 2,
  //       card_min: this.statusShowItem[id] == 1,
  //     };
  //   },
  // },
  methods: {
    card_computed(id) {
      return {
        card: true,
        card_max: this.statusShowItem[id] == 2,
        card_min: this.statusShowItem[id] == 1,
      };
    },
    selectedList() {
      return this.animeList.filter((row) => this.statusShowItem[row.id] != 0);
    },
    getImageURL(id, originalURL) {
      var fileName = /[^/]*$/.exec(originalURL) + "";
      if (this.localImageDict[id]) {
        return require("./coverImages/" + fileName);
      } else {
        return originalURL;
      }
    },
    onImageLoadFailure(event) {
      event.target.src = require("./coverImages/98987296_p0.jpg");
    },
    getTitle(item) {
      if ("中文名: " in item) {
        return item["中文名: "];
      } else {
        return item["textJP"];
      }
    },
    selectedAttributes(item) {
      var newObj = {};
      for (const key of Object.keys(item)) {
        if (
          key != "id" &&
          key != "textJP" &&
          key != "coverImage" &&
          key != "undefined" &&
          key != "text" &&
          key != "中文名: " &&
          key != "episodeList"
        ) {
          newObj[key] = item[key];
        }
      }
      return newObj;
    },
    getEpisodeClass(classValue) {
      if (typeof classValue !== "undefined") {
        return classValue;
      } else {
        return "subtitle-span";
      }
    },
  },
};
</script>

<template>
  <TransitionGroup name="list" tag="ul">
    <li
      v-for="item in selectedList()"
      :key="item.id"
      v-show="statusShowItem[item.id]"
      :class="card_computed(item.id)"
    >
      <Transition name="bounce">
        <a href="#" v-show="ifRemove" @click="$emit('remove-item', item.id)"
          >x</a
        >
      </Transition>
      <div class="card-clickable" @click="$emit('show-detail', item.id, false)">
        <div class="cover-div">
          <img
            :src="getImageURL(item.id, item.coverImage)"
            @error="onImageLoadFailure($event)"
            class="cover-image"
          />
        </div>
        <div>
          <h2 class="header" v-show="this.statusShowItem[item.id] == 1">
            {{ getTitle(item) }}
          </h2>
        </div>
        <div class="cover-intro" v-show="this.statusShowItem[item.id] == 2">
          <h2 class="header">{{ getTitle(item) }}</h2>
          <h3 class="subHeader">{{ item.textJP }}</h3>
          <details id="detail-info">
            <summary>详情信息</summary>
            <ul id="detail-info-list">
              <li v-for="(value, name) in selectedAttributes(item)" :key="name">
                {{ name }}{{ value }}
              </li>
            </ul>
          </details>
          <div class="subject-prg">
            <span class="tip">章节列表</span>
            <ul id="prg-list">
              <li
                v-for="episode in item.episodeList"
                :key="episode.text"
                :class="getEpisodeClass(episode.class)"
              >
                {{ episode.text }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </li>
  </TransitionGroup>
</template>

<style scoped>
ul {
  padding-left: 12px;
  margin-top: 56px;
  width: 100%;
  height: calc(100% - 56px);
  list-style: none;
  /* display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap; */
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-active {
  position: absolute;
}
.card {
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
  overflow-y: hidden;
  text-rendering: optimizeLegibility;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-text-size-adjust: 100%;
  margin-top: 2vh;
  margin-right: 2vh;
  display: inline-block;

  transition: all 0.5s ease-in-out;
  display: inline-block;
  margin-right: 10px;
}

.card_min:hover {
  transform-origin: center center;
  animation: scale 0.2s ease-in-out forwards;
}

@keyframes scale {
  0% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
  100% {
    transform: scale(1.05);
    -webkit-transform: scale(1.05);
  }
}

.card_min {
  width: 185px;
  height: 280px;
  min-width: 150px;
  position: relative;
}

.card_max {
  width: calc(100% - 24px);
  height: calc(100% - 112px);
  position: fixed;
  left: 12px;
  top: 100px;
  overflow-y: auto;
  margin-top: 0;
}

.card-clickable {
  height: 100%;
}

.cover-div {
  width: 165px;
  height: 230px;
  overflow: hidden;
  margin: 10px;
  margin-bottom: 0;
  position: relative;
  border-radius: 10px;
  float: left;
  transition: all 0.5s ease-in-out;
}

.card_max > .card-clickable > .cover-div {
  width: 330px !important;
  height: 460px !important;
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

.cover-intro {
  width: calc(100% - 350px);
  /* padding-left: 20px; */
  vertical-align: top;
  margin: 0;
  padding: 0;
  /* font-weight: 400; */
  box-sizing: border-box;
  font-family: Microsoft YaHei, 微软雅黑, STHeiti, WenQuanYi Micro Hei, SimSun,
    sans-serif;
  font-size: 14px;
  color: #666;
  float: left;
  position: relative;
}

.header {
  font-size: 20px;
  /* margin-left: 5px; */
  text-align: center;
  line-height: 2;
}

.subHeader {
  font-size: 12px;
  /* color: #999 */
  text-align: center;
}
li a {
  position: absolute;
  top: 0px;
  left: 0px;
  background: red;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  z-index: 5;
  color: white;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
#detail-info-list {
  margin-top: 0;
  /* margin-top: 12px; */
  width: calc(100% - 12px);
  border-radius: 10px;
  background-color: hsla(0, 0%, 100%, 0.75) !important;
  box-shadow: 0 3px 5px -1px rgb(0 0 0 / 20%), 0 5px 8px 0 rgb(0 0 0 / 14%),
    0 1px 14px 0 rgb(0 0 0 / 12%) !important;
  list-style-type: none;
  display: block;
}
details[open] summary ~ * {
  animation: sweep 0.5s ease-in-out;
}
@keyframes sweep {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
ul#prg-list li {
  font-family: "Lucida Grande", "Lucida Sans", Helvetica, Arial, Verdana,
    sans-serif;
  display: inline;
  position: relative;
  width: auto;
  float: left;
  font-size: 12px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 10px;
  /* color: #06c;
  background-color: #daeaff; */
  line-height: 100%;
  border-radius: 10px;
  transition: all 0.5s ease;
}
ul#prg-list li.epBtnAir {
  color: #06c;
  background-color: #daeaff;
}
ul#prg-list li.epBtnNA {
  color: #909090;
  background-color: #e0e0e0;
}
ul#prg-list li.subtitle-span {
  color: #8eb021;
  border-left: 3px solid #8eb021;
  background: white;
}
ul#prg-list {
  margin-top: 0;
  transition: all 0.5s ease;
}
</style>