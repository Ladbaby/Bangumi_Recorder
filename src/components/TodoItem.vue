<script>
export default {
  props: {
    todo: Object
  }
}
</script>

<template>
  <span class="card">
    <a class="cover-div">
      <img src="./image/98987296_p0.jpg" class="cover-image">
    </a>
    <div class="cover-intro">
      <h2 class="header">{{ todo.text }}</h2>
    </div>
  </span>
</template>

<style scoped>
.card {
    border-radius: 10px;
    background-color: hsla(0,0%,100%,.75)!important;
    transition: box-shadow 225ms ease-out,-webkit-box-shadow 225ms ease-out;
    box-shadow: 0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12)!important;
    border-color: #fff;
    color: rgba(0,0,0,.87);
    outline: none;
    text-decoration: none;
    overflow-wrap: break-word;
    position: relative;
    white-space: normal;
    will-change: box-shadow;
    background-repeat: no-repeat;
    min-height: 20vh;
    width: 47%;
    /* max-width: 200%; */
    font-family: Roboto,sans-serif;
    font-size: 16px;
    overflow-x: hidden;
    text-rendering: optimizeLegibility;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-text-size-adjust: 100%;
    margin-top: 2vh;
    margin-right: 2vh;
    display: inline-block;
}

.cover-div {
    /* display: inline-block; */
    width: 130px;
    height: 230px;
    overflow: hidden;
    margin: 10px;
    position: relative;
    border-radius: 10px;
    float:left;
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
    height:100%;
    width:auto;
}

.cover-intro {
    width: 100%;
    padding-left: 20px;
    vertical-align: top;
    margin: 0;
    padding: 0;
    font-weight: 400;
    box-sizing: border-box;
    font-family: Microsoft YaHei,微软雅黑,STHeiti,WenQuanYi Micro Hei,SimSun,sans-serif;
    font-size: 14px;
    color: #666;
    position: relative;
}

.header {
    font-size: 20px;
    /* float:right; */
}

</style>