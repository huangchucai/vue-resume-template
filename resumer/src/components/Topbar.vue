<template>
  <div id="topbar">
    <div class="wrapper">
      <span class="logo">Resumer-HCC</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  #topbar {
    background: #ffffff;
    box-shadow: 0 1px 3px 0px rgba(0,0,0,0.25);
  }
  #topbar .wrapper {
    max-width: 1440px;
    min-width: 1024px;
    margin: 0 auto;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
  }
  #topbar .logo{
    font-size: 24px;
    color: #000000;
  }

</style>
