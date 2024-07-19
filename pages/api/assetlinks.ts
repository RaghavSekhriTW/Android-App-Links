import type { NextApiRequest, NextApiResponse } from 'next'
import { readFile } from 'fs/promises'
import { join } from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = join(process.cwd(), 'public', 'assetlinks.json')
    const fileContent = await readFile(filePath, 'utf-8')
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(fileContent)
  } catch (error) {
    res.status(500).json({ error: 'Failed to read assetlinks.json' })
  }
}