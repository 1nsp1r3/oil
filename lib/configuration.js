/**
 * Generic lib to save/load a list of configuration options (only strings)
 */
import AsyncStorage from "@react-native-async-storage/async-storage"

/**
 * Default: List of configuration options to be loaded
 * E.g. {"optionA": "A", "optionB": "B"}
 */
const load = async (Default)=>{
  //await AsyncStorage.clear()

  const ret = {...Default} //copy

  for(const key in ret){
    ret[key] = await AsyncStorage.getItem(key)
    if (ret[key] == null) ret[key] = Default[key] //If the key has never be saved, use the default value
  }

  return ret
}

/**
 * Default: List of configuration options to be saved
 * E.g. {"optionA": "A", "optionB": "B"}
 */
const save = async (Options)=>{
  try{
    for(const key in Options){
      await AsyncStorage.setItem(key, Options[key].toString())
    }
  }catch(e){
    console.err("lib/configuration.save()", e)
  }
}

export default {
  load,
  save,
}
