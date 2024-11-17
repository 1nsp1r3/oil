import {PermissionsAndroid} from "react-native"


/**
 * Return true if all require permissions are granted
 */
const isAllGranted=(Permissions, RequestMultipleResult)=>{
  return Permissions.every((permission)=>{
    return RequestMultipleResult[permission] === PermissionsAndroid.RESULTS.GRANTED
  })
}

/**
 *
 */
const request = async (Permissions)=>{
  try{
    const requestMultipleResult = await PermissionsAndroid.requestMultiple(Permissions)
    return isAllGranted(Permissions, requestMultipleResult)
  }catch(e){
    console.warn(e)
  }

  return false
}

export default {
  request,
}
