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
    // todo: Object,
    // ifSeen: Number,
    // itemCSS: Object,
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
      return this.animeList.filter(row => this.statusShowItem[row.id] != 0);
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
      @click="$emit('show-detail', item.id)"
    >
      <div class="cover-div">
        <img src="./image/98987296_p0.jpg" class="cover-image" />
      </div>
      <div class="cover-intro">
        <h2 class="header">{{ item.text }}</h2>
      </div>
    </li>
  </TransitionGroup>
</template>

<style scoped>
ul {
  padding-left: 12px;
  margin-top: 64px;
  width: 100%;
  height: 90%;
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
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

.card_min {
  width: 150px;
  height: 280px;
  position: relative;
}

.card_max {
  width: 98%;
  height: 100%;
  position: fixed;
  left: 5px;
  top: 15vh;
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

.cover-intro {
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
}

.header {
  font-size: 20px;
  margin-left: 5px;
  text-align: center;
  line-height: 2;
}
</style>