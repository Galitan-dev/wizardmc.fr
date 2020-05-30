import axios from 'axios'
import { slugify } from './helpers/functions.js'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'WizardMC',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'WizardMC est serveur factions minecraft sous launcher.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/transition.css',
    '@/assets/css/utils.css',
    '@/assets/css/pages/homepage.css',
    '@/assets/css/components/button.css',
    '@/assets/css/components/footer.css',
    '@/assets/css/components/form.css',
    '@/assets/css/components/navbar.css',
    '@/assets/css/components/scrollbar.css',
    '@/assets/css/components/tooltip.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/recaptcha', ssr: false },
    '~/plugins/axios.js',
    '~/plugins/v-tooltip.js',
    '~/plugins/nuxt-init.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-webfontloader'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3333/' : 'https://api.wizardmc.fr/',
    credentials: true
  },

  webfontloader: {
    google: {
      families: ['Inter:400,500,600,700,800,900', 'Asul:400,700']
    }
  },

  env: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    API_URL: process.env.API_URL,
    ADMIN_URL: process.env.ADMIN_URL,
    CLOUD_URL: process.env.CLOUD_URL,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    RECAPTCHA_PUBLIC_KEY: process.env.RECAPTCHA_PUBLIC_KEY
  },
  /*
  ** Build configuration
  */
  build: {
    html: {
      minify: {
        collapseWhitespace: true, // as @dario30186 mentioned
        removeComments: true // 👈 add this line
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  generate: {
    routes () {
      axios.defaults.baseURL = 'https://api.wizardmc.fr/'
      return axios.get('c/posts/all')
        .then((res) => {
          const routes = res.data.map((post) => {
            return {
              route: '/news/' + slugify(`${post.id}-${post.title}`),
              payload: post
            }
          })

          routes.push(
            '/credits/success/paypal',
            '/credits/success/paysafecard',
            '/credits/success/stripe',
            '/credits/failure/paypal',
            '/credits/failure/paysafecard',
            '/credits/failure/stripe'
          )

          return routes
        })
    }
  }
}
