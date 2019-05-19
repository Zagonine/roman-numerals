import { validationMixin } from 'vuelidate'
import { required, between } from 'vuelidate/lib/validators'
import { getRomanNumber, subscribeResponseRomanNumber } from '@/services/romanNumbers'

export default {
  name: 'RomanNumber',
  data: function () {
    return {
      form: {
        number: null
      },
      romanNumber: null,
      loading: false,
      error: false
    }
  },
  mixins: [validationMixin],
  validations: {
    form: {
      number: {
        required,
        between: between(1, 100)
      }
    }
  },
  methods: {
    submitGetRomanNumber () {
      this.loading = true
      this.error = false
      getRomanNumber(this.form.number).catch((err) => {
        this.error = err.response.data.msg || 'Error'
        this.loading = false
      })
    },
    reset () {
      this.romanNumber = null
      this.form.number = null
      this.$v.$reset()
    },
    onResponse (err, data) {
      if (err) {
        this.error = err.msg || 'Error'
        return
      }
      if (data.romanNumber) {
        this.romanNumber = data.romanNumber
        this.loading = false
      }
    }
  },
  mounted () {
    subscribeResponseRomanNumber(this.onResponse)
  }
}
