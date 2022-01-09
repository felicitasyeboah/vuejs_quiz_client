import {mapGetters} from 'vuex'

export const authComputed = {
    ...mapGetters(['getStatus']),
}
export const getConnected = {
    ...mapGetters(['getIsConnected']),
}
