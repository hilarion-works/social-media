import response from "../util/response"

export default (err, req, res, next) => {
	if (err) {
		switch (err.status) {
			case 400:
				return response.invalidInput(err.message, res)
				break
			case 404:
				return response.notFound(err.message, res)
				break
			case 500:
				response.error(err.message, res)
				break
			default:
				response.error(err.message, res)
		}
	}
}