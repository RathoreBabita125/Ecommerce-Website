import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApolloProvider } from '@apollo/client/react'
import { client } from './client/client.js'
import { AuthContextProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ApolloProvider>
  </StrictMode>,

)
