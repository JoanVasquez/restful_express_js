module.exports = class Response {

  static onSuccess(result, token) {
    if (token) return {
      success: true,
      result,
      token
    }
    return {
      success: true,
      result
    }
  }

  static onFail(error) {
    return {
      success: false,
      error: error
    }
  }

}
