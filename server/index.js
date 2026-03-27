import http from 'node:http'

const PORT = Number(process.env.PORT || 8787)
const HOST = process.env.HOST || '0.0.0.0'
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini'
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean)

function getAllowedOrigin(requestOrigin) {
  if (!requestOrigin) {
    return ''
  }

  if (ALLOWED_ORIGINS.length === 0) {
    return requestOrigin
  }

  return ALLOWED_ORIGINS.includes(requestOrigin) ? requestOrigin : ''
}

function json(req, res, statusCode, body) {
  const origin = getAllowedOrigin(req.headers.origin)
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    ...(origin ? { 'Access-Control-Allow-Origin': origin } : {}),
    ...(origin ? { Vary: 'Origin' } : {}),
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(JSON.stringify(body))
}

function buildInput(question, history = [], context = {}) {
  const conversation = history
    .slice(-8)
    .map((item) => `${item.role === 'assistant' ? 'Assistant' : 'User'}: ${item.content}`)
    .join('\n')

  return [
    {
      role: 'system',
      content: [
        {
          type: 'input_text',
          text:
            'You are the portfolio assistant for Goteh Mbaza Patrick. Answer only from the provided portfolio context. Be concise, professional, and specific. If the portfolio context does not support a claim, say so plainly.',
        },
      ],
    },
    {
      role: 'user',
      content: [
        {
          type: 'input_text',
          text: `Portfolio context:\n${JSON.stringify(context, null, 2)}\n\nConversation so far:\n${conversation}\n\nCurrent question:\n${question}`,
        },
      ],
    },
  ]
}

async function handleChat(req, res) {
  if (!OPENAI_API_KEY) {
    json(req, res, 500, {
      error: 'Missing OPENAI_API_KEY in the backend environment.',
    })
    return
  }

  let payload

  try {
    payload = await new Promise((resolve, reject) => {
      let body = ''

      req.on('data', (chunk) => {
        body += chunk
      })

      req.on('end', () => {
        try {
          resolve(JSON.parse(body || '{}'))
        } catch (error) {
          reject(error)
        }
      })

      req.on('error', reject)
    })
  } catch {
    json(req, res, 400, { error: 'Invalid JSON body.' })
    return
  }

  const question = payload.question?.trim()
  if (!question) {
    json(req, res, 400, { error: 'The "question" field is required.' })
    return
  }

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      input: buildInput(question, payload.history, payload.context),
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    json(req, res, response.status, {
      error: data.error?.message || 'OpenAI request failed.',
    })
    return
  }

  const answer =
    data.output_text ||
    data.output?.flatMap((item) => item.content || []).find((item) => item.type === 'output_text')
      ?.text ||
    'No answer returned from OpenAI.'

  json(req, res, 200, { answer })
}

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    json(req, res, 404, { error: 'Not found.' })
    return
  }

  if (req.method === 'OPTIONS') {
    const origin = getAllowedOrigin(req.headers.origin)
    res.writeHead(204, {
      ...(origin ? { 'Access-Control-Allow-Origin': origin } : {}),
      ...(origin ? { Vary: 'Origin' } : {}),
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    res.end()
    return
  }

  if (req.url === '/health' && req.method === 'GET') {
    json(req, res, 200, {
      ok: true,
      model: OPENAI_MODEL,
      live: Boolean(OPENAI_API_KEY),
    })
    return
  }

  if (req.url === '/api/chat' && req.method === 'POST') {
    try {
      await handleChat(req, res)
    } catch (error) {
      json(req, res, 500, {
        error: error instanceof Error ? error.message : 'Unexpected server error.',
      })
    }
    return
  }

  json(req, res, 404, { error: 'Not found.' })
})

server.listen(PORT, HOST, () => {
  console.log(`AI backend listening on http://${HOST}:${PORT}`)
})
