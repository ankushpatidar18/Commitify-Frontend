import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const ChallengesList = () => {
  const [challenges, setChallenges] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const token = localStorage.getItem("authToken")
        const response = await axios.get("http://localhost:3000/challenges", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setChallenges(response.data)
      } catch (error) {
        console.error("Error fetching challenges:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load challenges. Please try again.",
        })
      }
    }
    fetchChallenges()
  }, [toast])

  const joinChallenge = async (challengeId) => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await axios.post(
        "http://localhost:3000/challenges/join",
        { challenge_id: challengeId },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      console.log("Joined successfully:", response.data)
      toast({
        title: "Success",
        description: "You have successfully joined the challenge!",
      })
    } catch (error) {
      console.error("Error joining challenge:", error)
      if (error.response && error.response.status === 400 && error.response.data.message === "Already joined") {
        toast({
          // variant: "warning",
          title: "Already Joined",
          description: "You have already joined this challenge.",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to join the challenge. Please try again.",
        })
      }
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] w-full rounded-md border p-4">
              {challenges.length === 0 ? (
                <p className="text-center text-gray-500">No challenges available</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {challenges.map((challenge) => (
                    <Card
                      key={challenge._id}
                      className="bg-gradient-to-br from-purple-100 to-purple-200 overflow-hidden"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-semibold text-[#8046F3]">
                          {challenge.title.toUpperCase()}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <UserIcon className="w-4 h-4 mr-2" />
                          <span>Created by: {challenge.creator_id.name}</span>
                        </div>
                        <p className="text-gray-700 mb-4">{challenge.description}</p>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <ClockIcon className="w-4 h-4 mr-2" />
                          <span>Duration: {challenge.duration} days</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          <span>Start Date: {new Date(challenge.start_date).toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          onClick={() => joinChallenge(challenge._id)}
                          className="w-full bg-[#8046F3] hover:bg-[#6A35D9] text-white"
                        >
                          Join Challenge
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default ChallengesList

