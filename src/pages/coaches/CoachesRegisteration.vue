<template>
    <div>
        <section>
            <base-card>
                <h1>Register</h1>
                <coach-form @save-data="SaveData"></coach-form>
            </base-card>
        </section>
    </div>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue'

export default {
    components:{
        CoachForm
    },
    methods:{
        SaveData(data){
            this.$store.dispatch('coaches/registerCoach',data)
            // this.$router.push('/coaches');
            this.$router.replace('/coaches');
        }
    }
    
}
</script>