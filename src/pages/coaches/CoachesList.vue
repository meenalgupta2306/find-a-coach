<template>
    <div>
        <base-dialog :show="!!error" title="An error occured" @close="handleError">
            <p>{{error}}</p>
        </base-dialog>
        <section>
            <coach-filter @change-filter="setFilter"></coach-filter>
        </section>
        <section>
            <base-card>
                <div class="controls">
                    <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
                    <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to register as an Instructor</base-button>
                    <base-button link to="/register" v-if="isLoggedIn && !iscoach && !isLoading">Register as Instructor</base-button>
                </div>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasCoaches">
                    <coach-item
                    v-for="coach in filteredCoaches"
                    :key="coach.id"
                    :id= "coach.id"
                    :rate="coach.hourlyRate"
                    :firstName="coach.firstName"
                    :lastName="coach.lastName"
                    :areas="coach.areas"
                    ></coach-item>
                </ul>
                <h3 v-else> No coaches found.</h3>
            </base-card>
        </section>
    </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue'
import CoachFilter from '../../components/coaches/CoachFilter.vue'

export default {
    data(){
        return{
            error:null,
            isLoading: false,
            activeFilters:{
                frontend: true,
                backend: true,
                career:true
            }
        }
    },
    components:{
        CoachItem,
        CoachFilter
    },
    computed:{
        filteredCoaches(){
            const coaches= this.$store.getters['coaches/getcoaches'];
            return coaches.filter((coach)=>{
                if(this.activeFilters.frontend && coach.areas.includes('frontend')){
                    return true;
                }
                if(this.activeFilters.backend && coach.areas.includes('backend')){
                    return true;
                }
                if(this.activeFilters.career && coach.areas.includes('career')){
                    return true;
                }
                return false;
            })
        },
        hasCoaches(){
            return this.$store.getters['coaches/hasCoaches'];
        },
        iscoach(){
            return !this.isLoading && this.$store.getters['coaches/isCoach']
        },
        isLoggedIn(){
            return this.$store.getters.isAuthenticated;
        }
    },
    created(){
        this.loadCoaches();
    },
    methods:{
        setFilter(updatedFilters){
            this.activeFilters=updatedFilters

        },
        async loadCoaches(refresh=false){
            this.isLoading=true
            try{
                await this.$store.dispatch('coaches/loadCoaches',{forceRefresh:refresh});
            }catch(error){
                this.error=error.message || 'Something went wrong';
            }
            this.isLoading=false

        },
        handleError(){
            this.error=null
        }
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>