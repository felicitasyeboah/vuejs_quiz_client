import Vuex from 'vuex'

// Create a new store instance. Gets token from localstorage, gets current username from localstorage.
export default new Vuex.Store({
        state: {
            question: {
                category: null,
                text: null,
                answer1: null,
                answer2: null,
                answer3: null,
                answer4: null,
                correctanswer: null,
            },
            isConnected: false,
            currentUserImage: '',
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
                } else {
                    state.userName = ''
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

            setSocketIsConnected: (state, value) => {
                state.isConnected = value;

            },
            setTimer: (state, integer) => {
                state.timeLeft = integer;

            },
            setQuestionText: (state, value) => {
                state.question.text = value;
            },
            setCategory: (state, value) => {
                state.question.category = value;
            },
            setAnswer1: (state, value) => {
                state.question.answer1 = value;
            },
            setAnswer2: (state, value) => {
                state.question.answer2 = value;
            },
            setAnswer3: (state, value) => {
                state.question.answer3 = value;
            },
            setAnswer4: (state, value) => {
                state.question.answer4 = value;
            },
            setCorrectAnswer: (state, value) => {
                state.question.correctanswer = value;
            },
            setUserImage: (state, value) => {
                state.currentUserImage = value;
            },
        },
        actions: {
            // The current token in localstorage is deleted. Username in localstorage is deleted.
            logout() {
                localStorage.removeItem('token')
                localStorage.removeItem('userName')
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
            getUserImage: state => {
                return state.currentUserImage;
            },
            getSocketOnline: state => {
                return Number(state.socket.online);
            },
            getIsConnected: state => {
                return Boolean(state.isConnected);
            },
            getTimer: state => {
                return Number(state.timeLeft);
            },
            getQuestionText: state => {
                return String(state.question.text)
            },
            getCategory: state => {
                return String(state.question.category)
            },
            getAnswer1: state => {
                return String(state.question.answer1)
            },
            getAnswer2: state => {
                return String(state.question.answer2)
            },
            getAnswer3: state => {
                return String(state.question.answer3)
            },
            getAnswer4: state => {
                return String(state.question.answer4)
            },
            getCorrectAnswer: state => {
                return String(state.question.correctanswer)
            }
        }

    }
)
