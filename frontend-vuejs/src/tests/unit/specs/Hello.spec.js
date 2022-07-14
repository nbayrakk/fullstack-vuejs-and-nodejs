import Vue from 'vue'
import HomePage from '../../../views/HomePage'

decsribe('HomePage.vue', () =>{
    const container = document.createElement('div') 
    
    const HomePageComponent = Vue.extend(HomePage);
     const vm = new HomePageComponent({
        getTasks: [
            {task}
        ]
     });
     vm.$mount(container);
     expect(vm.getTasks.length).to.equal(2);
})