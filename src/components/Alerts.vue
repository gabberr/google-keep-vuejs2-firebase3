<template>
  <div class="alerts">
    <transition name="expand">
      <div v-for="alert in alerts" v-bind:class="alert.type">
        <p>
          {{alert.message}}
        </p>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    props: ['alerts']
  }
</script>
<style>
  .alerts{
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .alerts div{
    background: #bbb;
    overflow: hidden;
    color: #ffffff;
    }
  .alerts div.error{
    background: #e03c3c;
  }
  .alerts div.success{
    background: #41b883;
  }
  .alerts p{
    width: 480px;
    margin: 0 auto;
    padding: 4px;
    text-align: center;
  }
  .expand-transition{
    max-height: 200px; /* height 0 -> auto is not animatable, so use max-height 0 -> large height */
    transition: max-height 1s ease;
  }
  .expand-enter, .expand-leave{
    max-height: 0;
  }
</style>
