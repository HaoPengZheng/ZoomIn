<template>
  <div class="warp">
    <div class="empty-box">
      <svg class="icon empty-task" aria-hidden="true">
        <use xlink:href="#icon-icon-test"></use>
      </svg>

      <div class="empty-text">
        <slot name="404Message">
          <p>您的历史任务列表空空如也。</p>
          <p>快去新建一个吧！</p>
        </slot>
      </div>

    </div>

  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.empty-task {
  color: #ccc;
  width: 300px;
  height: 225px;
}
.empty-text {
  margin-left: 5em;
  font-size: 18px;
  font-weight: 600;
  color: #333333c9;
}
.empty-box {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 50px;
}
.warp {
  max-width: 100%;
}
</style>
