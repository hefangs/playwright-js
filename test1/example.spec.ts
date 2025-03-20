import { test, expect } from '@playwright/test'

test('GET /images/search API returns 10 cat images', async ({ request }) => {
	// 发起 GET 请求
	const response = await request.get(
		'https://api.thecatapi.com/v1/images/search?limit=10',
	)

	// 验证响应状态码为 200
	expect(response.status()).toBe(200)

	// 解析 JSON 响应体
	const data = await response.json()

	// 验证返回的结果是一个数组，并且长度为 10
	expect(Array.isArray(data)).toBeTruthy()
	expect(data.length).toBe(10)

	// 验证每个元素包含一个有效的 image URL
	data.forEach((item: any) => {
		expect(item.url).toBeTruthy()
		expect(item.url).toMatch(/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/) // 验证 URL 是否以图片格式结尾
	})
})
