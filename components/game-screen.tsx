"use client"

import { useGame } from "./game-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { EyeIcon, UserIcon, UserX2Icon, RefreshCwIcon } from "lucide-react"
import { useState, useEffect } from "react"

export function GameScreen() {
  const {
    gameState,
    playerCount,
    currentPlayer,
    currentTopic,
    impostorIndex,
    isRevealed,
    setPlayerCount,
    startGame,
    nextPlayer,
    revealRole,
    finishRound,
    startNewRound,
  } = useGame()

  const [showContent, setShowContent] = useState(true)

  // Animation helper for transitions
  useEffect(() => {
    if (gameState === "reveal" && !isRevealed) {
      setShowContent(false)
      const timer = setTimeout(() => setShowContent(true), 500)
      return () => clearTimeout(timer)
    }
  }, [gameState, currentPlayer, isRevealed])

  if (gameState === "setup") {
    return (
      <Card className="bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-center">Configuración del Juego</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="playerCount" className="block text-sm font-medium">
              Número de jugadores:
            </label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPlayerCount(Math.max(3, playerCount - 1))}
                disabled={playerCount <= 3}
              >
                -
              </Button>
              <div className="flex-1 text-center text-xl font-bold">{playerCount}</div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPlayerCount(Math.min(10, playerCount + 1))}
                disabled={playerCount >= 10}
              >
                +
              </Button>
            </div>
          </div>
          <div className="pt-4">
            <p className="text-sm text-gray-400 mb-2">
              Se seleccionará un tema aleatorio y un jugador será el impostor.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={startGame}>
            Comenzar Juego
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (gameState === "reveal") {
    return (
      <Card className="bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-center">Jugador {currentPlayer}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[200px]">
          {!isRevealed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <p className="mb-4">Pulsa el botón para ver tu rol</p>
              <Button onClick={revealRole} className="flex items-center gap-2">
                <EyeIcon size={18} />
                Mostrar Rol
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {currentPlayer === impostorIndex ? (
                <div className="space-y-4">
                  <UserX2Icon size={48} className="mx-auto text-red-500" />
                  <h3 className="text-xl font-bold text-red-500">¡Eres el IMPOSTOR!</h3>
                  <p className="text-gray-400">
                    No sabes el tema. Intenta fingir que lo conoces para no ser descubierto.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <UserIcon size={48} className="mx-auto text-green-500" />
                  <h3 className="text-xl font-bold text-green-500">¡Eres JUGADOR!</h3>
                  <p className="text-gray-400">El tema es:</p>
                  <p className="text-xl font-bold">{currentTopic}</p>
                </div>
              )}
            </motion.div>
          )}
        </CardContent>
        <CardFooter>
          {isRevealed && (
            <Button className="w-full" onClick={nextPlayer}>
              {currentPlayer < playerCount ? "Siguiente Jugador" : "Comenzar Ronda"}
            </Button>
          )}
        </CardFooter>
      </Card>
    )
  }

  if (gameState === "playing") {
    return (
      <Card className="bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-center">¡A jugar!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="pt-4">
            <p className="text-sm text-gray-400">
              Cada jugador debe hablar sobre el tema. El impostor debe intentar pasar desapercibido. Después de que
              todos hayan hablado, voten quién creen que es el impostor.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={finishRound}>
            Finalizar Ronda
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (gameState === "finished") {
    return (
      <Card className="bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-center">Ronda Finalizada</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p>El impostor era el:</p>
          <p className="text-xl font-bold">Jugador {impostorIndex}</p>
          <div className="pt-4">
            <p className="text-sm text-gray-400">
              ¿Lograron descubrir quién era el impostor? ¿O el impostor logró engañar a todos?
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={startNewRound}>
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Nueva Ronda
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return null
}
