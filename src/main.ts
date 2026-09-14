import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* imports fontawesome */
/* imports fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

/* imports components UI */
import Logo from './components/UI/Logo/Logo.vue'

import Notify from './components/UI/Notify/Notify.vue'

import IconButton from './components/UI/Button/IconButton.vue'
import Btn from './components/UI/Button/Btn.vue'

import Input from './components/UI/Form/Input.vue'
import Textarea from './components/UI/Form/Textarea.vue'

/* add icon to the library */
library.add(fas, fab, far)

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Registro GLOBAL do componente do Font Awesome
app.component('font-awesome-icon', FontAwesomeIcon)

// Registro GLOBAL dos componentes UI
app.component('Logo', Logo)

app.component('Notify', Notify)

app.component('QBtnIcon', IconButton)
app.component('QBtn', Btn)

app.component('QInput', Input)
app.component('QTextarea', Textarea)

app.mount('#app')
