<template>
  <div class="hello">
    <div class="messages clearfix">
    <div v-show="messages === []"> Please enter your message </div>

      <div v-for="(msg, _) in messages" :key="_">
        <div :class="{
          'message': true, 
          'sender': msg.sender === 'user', 
          'bot': msg.sender !== 'user' 
          }">
          
          <div v-if="msg.msg.slots">
            <span><strong> FlowerType: </strong> {{msg.msg.slots.FlowerType}}</span><br />
            <span><strong> PickupDate: </strong> {{msg.msg.slots.PickupDate}}</span><br />
            <span><strong> PickupTime: </strong> {{msg.msg.slots.PickupTime}}</span><br />
          </div>
          <div v-else> <strong style="padding-right: 10px">{{date}}:</strong> {{msg.msg}} </div>
        </div>
      </div>
      
    </div>

    <div class="input-container">
      <input type="text" @keypress.enter="sendMessage" v-model="message" />
      <button @click="sendMessage"> Send </button>
    </div>
    <div class="loading" v-show="loading"> loading... </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    chatbotConfig: Object,
    name: String,
    completed: Object
  },
  computed: {
    date(){
      const d = new Date()
      return `${d.getHours()}: ${d.getMinutes()}: ${d.getSeconds()}`
    }
  },
  data(){
    return {
      message: null,
      messages: [],
      loading: false
    }
  },
  methods: {
    async sendMessage() {
      this.loading = true
      const msg = this.message
      if (!this.message) return
      this.message = ''
      this.messages.push({sender: 'user', msg })
      const response = await this.chatbotConfig.chatBot.send(this.name, msg)
      this.loading = false
      console.log(this.completed)
      if (!response.message) return;
      if (!this.completed) this.messages.push({sender: this.name, msg: response.message })
      else this.messages.push({sender: this.name, msg: this.completed })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  margin: 20px 25%;
  padding: 16px;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(100,100,100, .5);
  position: relative;
}
.messages {
  background: whitesmoke;
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 70px;
  overflow-y: auto ;
  max-height: calc(70vh - 50px);
}
.messages .message {
  margin: 20px 10px;
  padding: 20px;
  border-radius: 8px;
}
input, button {
  height: 45px;
  display: inline-block;
}
input {
  height: 35px;
  width: 71%;
  border-radius: 7px 0px 0px 7px;
  padding: 4px 20px;
}
button {
  padding: 12px 20px;
  width: 18%;
  border-radius: 0px 7px 7px 0px;
  border: none;
  background: green;
  color: wheat;
}
.sender {
  background: #a5e6c9;
  width: 70%;
  float: right;
}
.bot {
  background: rgb(157, 157, 250);
  width: 70%;
  float: left;
}
.input-container {
  width: 100%;
  height: 70px;
}
.loading {
  text-align: center;
  color: red;
  text-transform: uppercase;
  position: fixed;
  bottom: 0%;
  left: 0%;
  width: 100%;
}
</style>
