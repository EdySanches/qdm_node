export function removeSubstring(str: string, sub: string): string {

    const subs = str.split(' ')
  
    const idx = subs.indexOf(sub)
  
    if (idx !== -1) {
      subs.splice(idx, 1)
  
      return subs.join(' ')
    }
  
    return str 
} 
  
/**
 * Shared between services to check response on controllers
 */
export interface serviceResponse {
  sucess: boolean
  message?: string
  data?: any
}