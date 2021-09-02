<template>
  <div id="app" style="max-height:300px">
    <ChatComponent :chatbotConfig="chatbotConfig" name="OrderFlowers_dev" :completed="completed"/>
  </div>
</template>

<script>
import { Interactions } from "aws-amplify";
import ChatComponent from './components/ChatComponent.vue';

export default {
  components: { ChatComponent },
  name: "App",
  data: () => ({
    completed: null,
    chatbotConfig: {
      bot: "OrderFlowers_dev",
      clearComplete: false,
      chatBot: Interactions
    },
  
   
  }),
  mounted() {
    Interactions.onComplete("OrderFlowers_dev", this.handleComplete);
    console.log(Interactions)
  },
  methods: {
   
    getModuleName(){
      return 'Interactions';
    },
    
    handleComplete(err, confirmation) {
      if (err) {
        alert("bot conversation failed");
        return;
      }
      this.completed = confirmation
    },
  },
};
</script>

<style>
* { transition: all .5;}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
