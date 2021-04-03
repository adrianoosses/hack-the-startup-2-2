const handlers = require('./service');

describe('user', () => {
	describe('signUp', () => {
		it('Sign up 200', async () => {
			/*
			const axios = {
				signUp: jest.fn().mockResolvedValue({ data: 1 }),
			}*/
			const res = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn() // espiarlo
			}
			const req = {
				body: 'no json'
			}
			await handlers().signUp(req, res);
			expect(res.status.mock.calls).toEqual([
				[400]
			])
			/*
			expect(res.send.mock.calls).toEqual([
				[1]
			])
			
			expect(axios.post.mock.calls).toEqual([
				['http://localhost:3001/user', 'request body']
			])*/
		})
	})
})