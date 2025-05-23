import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/provider'

export const metadata = {
    title: "Prompty",
    description: 'Discover & Share AI Prompts'
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body suppressHydrationWarning={true}>
            <Provider>
                <div className='main'>
                    <div className='gradient'>
                    </div>
                </div>
                <main className='app'>
                    <Nav/>
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout