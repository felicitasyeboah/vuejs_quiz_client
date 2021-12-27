import Vuex from 'vuex'

// Create a new store instance. Gets token from localstorage, gets current username from localstorage.
export default new Vuex.Store({
        state: {
            status: '',
            token: localStorage.getItem('token'),
            user: localStorage.getItem('userName'),
            isAuthenticated: false,
        },
        mutations: {
            initializeStore(state) {
                if (localStorage.getItem('token')) {
                    state.token = localStorage.getItem('token')
                    state.isAuthenticated = true
                    state.userName = localStorage.getItem('userName')
                    state.image = localStorage.getItem('currentImage')
                } else {
                    state.userName = ''
                    state.image = ''
                    state.token = ''
                    state.isAuthenticated = false
                }
            },
            changeStatus(state, isLoggedIn) {
                state.isAuthenticated = isLoggedIn
            },
            setToken(state, token) {
                state.token = token
                state.isAuthenticated = true
            }
        },
        actions: {
            // The current token in localstorage is deleted. Username in localstorage is deleted.
            logout() {
                localStorage.removeItem('token')
                localStorage.removeItem('userName')
                localStorage.removeItem('currentImage')
                this.isLoggedIn = false;
                this.state.isAuthenticated = false;
                console.log("ausgeloggt")
            },
        },
        computed: {
            getName() {
                return this.$store.getters.getName()
            },
//     printToken() {
//     console.log(localStorage.getItem('token'))
// },
            getters: {
                getStatus: state => {
                    return state.isAuthenticated
                },
                getName: getters => {
                    return getters.getName()
                },
                //     getToken: state => {
                //         return localStorage.getItem('token')
                // }

            }
        }
    }
)
