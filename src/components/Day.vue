<template>
  <div class="day">
    <h1 class="day-title">
      {{$route.params.date}}
    </h1>
    
    <ul class="day-list">
      <li v-for="item in items" :key="item.id" class="day-list-item" :class="{'open':item.open}">
        <div class="time">
          <h2>
              {{item.id}}
          </h2>
        </div>
        <div class="action">
          <p v-if="!item.open" @click="toggleOpen(item)">
            {{item.action}}
            <span v-if="item.action.length === 0">내용을 작성해주세요.</span>
          </p>
          <input v-if="item.open" type="text" v-model="item.action" @keyup.enter="updateItem(item)" placeholder="내용을 작성해주세요."/>
        </div>
        <day-score @onUpdateScore="onUpdateScore" :item="item"></day-score>
        <div class="note" v-if="item.open">
          <textarea v-model="item.note" placeholder="노트를 작성해주세요" style="resize:none"></textarea>
        </div>
        <div class="buttons" v-if="item.open">
          <button class="save" @click="updateItem(item)">저장</button>
          <button class="cancel" @click="toggleOpen(item)">취소</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import DayScore from './DayScore'
import axios from 'axios'
import moment from 'moment'

import { mapGetters } from 'vuex'

export default {
  name: 'Day',
  methods:{
    onUpdateScore(item, score){
      item.score = score;
      this.updateItem(item);
    },
    //오늘날짜의 데이터를 받는 역할
    getItems(){
      let url = `https://new-daily-report-1feec.firebaseio.com/items.json?orderBy="$key"&startAt="${this.$route.params.date}"&endAt="${this.$route.params.date}-22-24"`;
      axios.get(url).then((res)=>{
        this.items = this.displayItems(res.data);
      });
    },
    //받은 데이터를 배열로 포맷
    displayItems(result){
      console.log(result);

      let items = [];
      let startTime = this.savedSettings.starttime;

      for(let i = 0; i<12; i++){
        let dateTime = moment(this.$route.params.date + ' ' + startTime);
        let itemKey = `${this.$route.params.date}-${dateTime.add(i*2, 'hour').format('HH')}-${dateTime.add(2, 'hour').format('HH')}`;
        
        let item={
          id: itemKey,
          action: '',
          note: '',
          open: false,
          score: undefined
        }
        Object.keys(result).map((key) => {
          if(key === itemKey){
            item = result[key]
          }
         });

        items.push(item);
      }
      return items;
    },
    //내용을 입력했을때 내용을 서버로 전송
    updateItem(item){
      let url = `https://new-daily-report-1feec.firebaseio.com/items/${item.id}.json`;
      axios.put(url, item).then((res) =>{ // eslint-disable-line no-unused-vars
        this.getItems();
      });
      item.open = !item.open;
    },

    toggleOpen(item){
      item.open = !item.open;
    }
  },
  computed:{
    ...mapGetters(['savedSettings'])
  },
  components:{
    DayScore
  },
  data(){
    return{
      items:[]
    }
  },
  props: {},
  //라이프 사이클
  created(){
    this.getItems();
  },
  //라우트가 이동할때 감시
  // watch:{
  //   '$route'(to, from){ 
  //     this.getItems();
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
