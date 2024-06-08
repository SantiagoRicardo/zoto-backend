export const entityFormatted = ({ entity, output = 'singular', token, isEnableable = true }) => {
  let response = null

  if (output === 'singular' && entity.length) {
    response = entity[0]

    response.user_password && delete response.user_password
    if (isEnableable) response.enabled = response.enabled ? true : false
    if (token) response.token = token
  } else if (output === 'plural' && entity.length) {
    response = entity.map((element) => {
      element.user_password && delete element.user_password
      if (isEnableable) element.enabled = element.enabled ? true : false
      return element
    })
  }

  return response
}
