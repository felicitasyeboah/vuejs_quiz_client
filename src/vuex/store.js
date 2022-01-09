import Vuex from 'vuex'

// Create a new store instance. Gets token from localstorage, gets current username from localstorage.
export default new Vuex.Store({
        state: {
            isConnected: false,
            status: '',
            token: localStorage.getItem('token'),
            user: localStorage.getItem('userName'),
            isAuthenticated: false,
            timeLeft: 0
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
            },
            setSocketClient: (state, value) => {
                state.socket.socketClient = value
            },
            setStompClient: (state, value) => {
                state.socket.stompClient = value;
            },
            setStompHeaders: (state, value) => {
                state.socket.stompHeaders = value;
            },
            setSocketOnline: (state, value) => {
                state.socket.online = value;
            },
            setSocketIsConnected: (state, value) => {
                state.isConnected = value;

            },
            setTimer: (state, integer) => {
                state.timeLeft = integer;

            },
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
            getSocket: state => {
                return state.socket;
            },
            getSocketClient: state => {
                return state.socket.socketClient;
            },
            getStompClient: state => {
                return state.socket.stompClient;
            },
            getStompHeaders: state => {
                return state.socket.stompHeaders;
            },
            getSocketOnline: state => {
                return Number(state.socket.online);
            },
            getIsConnected: state => {
                return Boolean(state.isConnected);
            },
            getSocketUserName: state => {
                return String(state.socket.userName);
            },
            getTimer: state => {
                return Number(state.timeLeft);
            },
        }


    }
)
