import type { Ref } from 'vue'
import { FetchError } from 'ofetch'

export const useFetchErrorHandle = (...errors:Ref<FetchError<any> | null>[])=>{
  errors.forEach((error) => {
    if(error.value) {
      throw createError({
        fatal:true,
        statusCode: error.value?.statusCode,
        message: error.value?.message
      })
    }
  })
}