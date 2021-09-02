import Vue from 'vue'
import App from './App.vue'

// Import Amplify Modules, Plugins, and aws exports file
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

// Configure Amplify in project
Amplify.configure(awsconfig);

// Configure vue to use plugins and modules
// Vue.use(AmplifyPlugin, AmplifyModules);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

