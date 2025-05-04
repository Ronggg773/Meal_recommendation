// /pages/api/recommend.ts
import type { NextApiRequest, NextApiResponse } from 'next'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY as string

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { time, type, requirement, method } = req.body

  const userPrompt = `
我想請你當我的三餐推薦小幫手，根據以下條件推薦一家我可以吃的店家或料理：
- 時段：${time}
- 類型：${type || '不限'}
- 特殊需求：${requirement || '無'}
- 點餐方式：${method || '不限'}

請用一段自然語言描述推薦原因，並附上店名或菜名建議。
`

  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'perplexity/mistral-7b-instruct',
          messages: [
            { role: 'system', content: '你是一位美食推薦助理' },
            { role: 'user', content: userPrompt },
          ],
        }),
      }
    )

    const data = await response.json()

    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error('GPT 回覆異常')
    }

    const recommendation = data.choices[0].message.content
    res.status(200).json({ recommendation })
  } catch (err: any) {
    console.error('GPT API 錯誤', err)
    res.status(500).json({ message: '伺服器錯誤', error: err.message })
  }
}
