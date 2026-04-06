import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.production' })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testURLs() {
  const { data: attachments, error } = await supabase
    .from('ticket_attachments')
    .select('*')
    .eq('attachment_type', 'photo')
    .limit(5)
  
  if (error) {
    console.error("DB Error:", error)
    return
  }
  
  for (const attachment of attachments) {
    console.log(`Original DB path: ${attachment.storage_path}`)
    
    // test 1: Raw
    const { data: d1 } = supabase.storage.from('media-photos').getPublicUrl(attachment.storage_path)
    console.log(`Raw Public: ${d1.publicUrl}`)
    
    // test 2: Strip media-photos/
    const cleanPath = attachment.storage_path.replace(/^media-photos\//, '')
    const { data: d2 } = supabase.storage.from('media-photos').getPublicUrl(cleanPath)
    console.log(`Clean Public: ${d2.publicUrl}`)

    // Try a HEAD Request manually to see what works
    try {
      const r1 = await fetch(d1.publicUrl, { method: 'HEAD' })
      console.log(`Raw fetch status: ${r1.status}`)
    } catch(e) { console.log(`Raw fetch err: ${e.message}`) }
    
    try {
      const r2 = await fetch(d2.publicUrl, { method: 'HEAD' })
      console.log(`Clean fetch status: ${r2.status}`)
    } catch(e) { console.log(`Clean fetch err: ${e.message}`) }
    console.log("-------------------")
  }
}

testURLs()
