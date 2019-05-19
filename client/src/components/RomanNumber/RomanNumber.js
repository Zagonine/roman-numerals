import { validationMixin } from 'vuelidate'
import { required, between } from 'vuelidate/lib/validators'
import { getRomanNumber } from '@/services/romanNumbers'

export default {
  name: 'RomanNumber',
  data: function () {
    return {
      form: {
        number: null
      },
      romanNumber: null,
      loading: false
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
      getRomanNumber(this.form.number).then((res) => {
        this.romanNumber = res.romanNumber
        this.loading = false
      }).catch((err) => {
        // @TODO: display error in html
        alert(err.response.data.msg)
        this.loading = false
      })
    },
    reset () {
      this.romanNumber = null
      this.form.number = null
      this.$v.$reset()
    }
  }
}
