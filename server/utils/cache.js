export const cachedMapi = defineCachedFunction(async (event, key) => {
  return await $fetch(event.idatariverReq.url, event.idatariverReq.requestOptions).catch((error) => console.log(error.data))
}, {
  maxAge: 5,  // all mapi maxAge is 5s
  name: 'mapi',
  getKey: (event, key) => key
})
