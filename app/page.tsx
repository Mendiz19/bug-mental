import { GameProvider } from "@/components/game-provider"
import { GameScreen } from "@/components/game-screen"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-white mb-8">Juego del Impostor</h1>
        <GameProvider>
          <GameScreen />
        </GameProvider>
      </div>
    </main>
  )
}
