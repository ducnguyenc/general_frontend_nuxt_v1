<template>
    <div class="signup">
        <form class="needs-validation" novalidate>
            <span style="color: red;">{{ errors }}</span>
            <span style="color: green;">{{ success }}</span>
            <div class="mb-3 row">
                <label for="new-password" class="col-sm-3 col-form-label">New Password</label>
                <div class="col-sm-9">
                    <input type="new-password" class="form-control" id="new-password" v-model="newPassword">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="new-password-confirm" class="col-sm-3 col-form-label">New Password Confirm</label>
                <div class="col-sm-9">
                    <input type="new-password-confirm" class="form-control" id="new-password-confirm" v-model="newPasswordConfirm">
                </div>
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent="forgotPassword">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            newPassword: 'a23456789aA!',
            newPasswordConfirm: 'a23456789aA!',
            token: '',
            errors: '',
            success: ''
        }
    },

    methods: {
        forgotPassword() {
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/reset-password',
                data: {
                    email: this.$route.query.email,
                    password: this.newPassword,
                    password_confirmation: this.newPasswordConfirm,
                    token: this.$route.params.token
                }
            }).then(response => {
                this.errors = ''
                this.success = 'success'
                this.$router.push('/signin');
                this.$emit('signIn')
            }).catch(error => {
                this.success = '';
                if (error.response.status === 422) {
                    this.errors = error.response.data.data;
                } else {
                    this.errors = error.response.data.message
                }
            })
        }
    }
}
</script>