import Vuex from 'vuex'

// Create a new store instance. Gets token from localstorage, gets current username from localstorage.
export default new Vuex.Store({
        state: {
            status: '',
            token: localStorage.getItem('token') || '',
            isLoggedIn: false,
            user: window.localStorage.getItem('userName'),
        },
        mutations: {
            changeStatus(state, isLoggedIn) {
                state.isLoggedIn = isLoggedIn
            }
        },
        actions: {
            // The current token in localstorage is deleted. Username in localstorage is deleted.
            logout() {
                localStorage.removeItem('token')
                localStorage.removeItem('userName')
                this.isLoggedIn = false;
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
                    return state.isLoggedIn
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
