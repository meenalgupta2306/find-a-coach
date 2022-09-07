export default{
    registerCoach(state,paylaod){
        state.coaches.push(paylaod)
    },
    setCoaches(state,payload){
        state.coaches = payload
    },
    setFetchTimestamp(state){
        state.lastFetch= new Date().getTime();
    }
};