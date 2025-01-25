import React, { useEffect, useState } from "react"
import axios from "axios"
import useUserStore from "../stores/useUserStore"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trophy, Medal, Award } from "lucide-react"

const Leaderboard = () => {
  const { user, setRank } = useUserStore()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem("authToken")
        const response = await axios.get("http://localhost:3000/leaderboard", {
          headers: { Authorization: `Bearer ${token}` },
        })

        setUsers(response.data)

        const loggedInUser = response.data.find((u) => u._id === user?._id)
        if (loggedInUser) {
          const rank = response.data.indexOf(loggedInUser) + 1
          setRank(rank)
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error)
      }
    }

    fetchLeaderboard()
  }, [user, setRank])

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />
    return <Award className="w-6 h-6 text-purple-400" />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-center mb-2 font-poppin">Leaderboard</h1>
          <p className="text-center font-semibold text-gray-600 mb-6 font-inter">Climb the ranks and boost your productivity!</p>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            {users.map((user, index) => (
              <div
                key={user._id}
                className={`flex items-center justify-between p-4 rounded-lg mb-4 ${
                  index % 2 === 0 ? "bg-purple-50" : "bg-white"
                } ${user._id === useUserStore.getState().user?._id ? "border-2 border-[#8046F3]" : ""}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8046F3] text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">{user.name}</span>
                    <span className="text-sm text-gray-500 font-inter">Rank #{index + 1}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-2xl text-[#8046F3]">{user.credits}</span>
                  <span className="text-sm text-gray-500">credits</span>
                  {getRankIcon(index + 1)}
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="mt-6 text-center">
            <p className="text-base font-inter text-gray-600">
              Keep pushing your limits! More credits mean higher productivity and a better rank.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Leaderboard

