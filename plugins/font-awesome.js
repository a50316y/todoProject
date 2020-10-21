import Vue from 'vue'

import { library, config } from '@fortawesome/fontawesome-svg-core'
import { fal } from '@fortawesome/pro-light-svg-icons'
import { far } from '@fortawesome/pro-regular-svg-icons'
// import { fas } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/pro-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// library.add(fas)

library.add(fal, far, fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)










