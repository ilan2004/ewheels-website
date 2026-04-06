import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  // Set CORS headers so local testing also works if needed
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { paths } = req.body

  if (!paths || !Array.isArray(paths)) {
    return res.status(400).json({ error: 'Paths array is required' })
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ 
      error: 'CRITICAL: Server configuration missing variables', 
      debug: { 
        hasUrl: !!supabaseUrl, 
        hasKey: !!supabaseServiceKey,
        methods: req.method
      } 
    })
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

  try {
    const { data, error } = await supabaseAdmin.storage
      .from('media-photos')
      .createSignedUrls(paths, 3600)

    if (error) {
      return res.status(500).json({ error: 'Supabase API Error', message: error.message })
    }

    return res.status(200).json({ signedUrls: data })
  } catch (error) {
    return res.status(500).json({ error: 'Catch Block Error', message: error.toString() })
  }
}
