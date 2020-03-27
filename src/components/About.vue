<template>
  <div class="about">
    <div class="about-inner">
      <img alt="saebak" src="../assets/saemi.jpg" >
      <h1>Daily Report</h1>
        <p>
          하루를 2시간 간격으로 나누어<br/>
          12개의 아이템으로 관리합니다.<br/>
          각 시간에 했던 일과<br/>
          몰입도를 점수로 표현합니다.
        </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  methods:{},
  computed:{},
  data(){
    return{}
  },
  props: {
      msg:String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
img {
    margin-bottom: 30px;
    width: 150px;
    height:150px;
    border-radius: 75px; /* 이미지 반크기만큼 반경을 잡기*/
} 
</style>
