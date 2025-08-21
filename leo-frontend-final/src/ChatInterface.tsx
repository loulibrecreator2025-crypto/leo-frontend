import { useState } from 'react'

interface Message {
  from: 'user' | 'leo'
  text: string
}

function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const newMessage: Message = { from: 'user', text: input }
    setMessages([...messages, newMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/ai/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })
      const data = await res.json()
      const leoMessage: Message = { from: 'leo', text: data.response || 'Réponse vide.' }
      setMessages(m => [...m, leoMessage])
    } catch (err) {
      setMessages(m => [...m, { from: 'leo', text: 'Erreur de connexion à Léo.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Léo – médiateur IA 🤖</h1>
      <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 10, minHeight: 300 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            textAlign: msg.from === 'user' ? 'right' : 'left',
            margin: '8px 0'
          }}>
            <span style={{
              display: 'inline-block',
              backgroundColor: msg.from === 'user' ? '#DCF8C6' : '#EEE',
              padding: '8px 12px',
              borderRadius: 12,
              maxWidth: '80%'
            }}>{msg.text}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', marginTop: 10 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
          placeholder="Écris un message à Léo..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{ marginLeft: 8, padding: '8px 16px', borderRadius: 8 }}
        >
          Envoyer
        </button>
      </div>
    </div>
  )
}

export default ChatInterface
